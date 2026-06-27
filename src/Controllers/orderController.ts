import { Response } from "express";
import { AuthRequest } from "../Middleware/authMiddleware";
import { OrderData, OrderStatus, PaymentStatus, TransactionStatus, TransactionVerifyResponse } from "../types/OrderTypes";
import Order from "../Database/models/orderModel";
import Payment from "../Database/models/paymentModel";
import { PaymentMethod,KhaltiResponse } from "../types/OrderTypes";
import OrderDetail from "../Database/models/orderDetails";
import axios from "axios";

import Product from "../Database/models/productModel";
import { where } from "sequelize";

class ExtendedOrder extends Order{
  declare paymentId : string | null
}

class OrderController{
  async createOrder(req:AuthRequest,res:Response):Promise<void>{
    const userId = req.user?.id;
    const {phoneNumber,shippingAddress,totalAmount,paymentDetails,items}:OrderData = req.body

    if(!phoneNumber || !shippingAddress || !totalAmount || !paymentDetails || items.length === 0 ){
      res.status(404).json({
        message : "please provide phoneNumber,shippingAddress,totalAmount,paymentDetails,items"
      })
      return
    }
    const paymentData = await Payment.create({
      paymentMethod : paymentDetails.paymentMethod
    })

    const orderData = await Order.create({
      phoneNumber,
      shippingAddress,
      totalAmount,
      userId,
      paymentId : paymentData.id
    })

    

    for(let i = 0;i<items.length;i++){
      await OrderDetail.create({
        quantity : items[i]?.quantity,
        productId : items[i]?.productId,
        orderId : orderData.id
      })
    }

    if(paymentDetails.paymentMethod === PaymentMethod.Khalti){
      //khalti integration
      const data = {
        return_url :  "http://localhost:3000/success",
        purchase_order_id : orderData.id,
        amount : totalAmount * 100,
        website_url : "http://localhost:3000",
        purchase_order_name : "orderName_" + orderData.id
      }

    const response =  await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
        headers : {
          'Authorization' : 'key 04413cfb082949fe94671d07a74a0668'
        }
      })

      const khaltiResponse:KhaltiResponse = response.data;
      paymentData.pidx = khaltiResponse.pidx;
      paymentData.save();

      res.status(200).json({
        message : "order placed successfully",
        url : khaltiResponse.payment_url
      })

      

    }else{
      res.status(201).json({
        message : "order placed successfully"
      })
    }
  }

  async verifyTransaction(req:AuthRequest,res:Response):Promise<void>{
    const {pidx} = req.body
    if(!pidx){
      res.status(400).json({
        message : "please provide pidx"
      })
      return
    }

    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{pidx},{
      headers: {
        'Authorization' : "key 04413cfb082949fe94671d07a74a0668"
      }
    })
    

    const data:TransactionVerifyResponse = response.data;

    if(data.status===TransactionStatus.Completed){
      await Payment.update({
        paymentStatus : "paid"
      },{
        where :  {
          pidx 
        }
      })

      res.status(200).json({
        message : "Payment verified successfully"
      })
      
    }else {
      res.status(200).json({
        message : "Payment not verified"
      })
    }
  }

  //customer side starts

  async fetchMyOrder(req:AuthRequest,res:Response):Promise<void>{
    const userId  = req.user?.id
    
    const orders = await Order.findAll({
      where : {
        userId
      },include: [
        {
          model : Payment,
          attributes : ['paymentMethod',"paymentStatus"]
        },
        {
          model : OrderDetail,
          attributes : ['quantity','productId']
        }
      ]
    })

    if(orders.length> 0){
      res.status(200).json({
        message : "Order Fetched successfully",
        data : orders
      })
    }else {
      res.status(400).json({
        message : "you dont have any orders",
        data : []
      })
    }
  }

  async fetchOrderDetail(req:AuthRequest,res:Response):Promise<void>{
    const {orderId}= req.params
    
    const orderDetails = await OrderDetail.findAll({
      where : {
        orderId
      }
    })

    if(orderDetails.length> 0){
      res.status(200).json({
        message : "OrderDetails Fetched successfully",
        data : orderDetails
      })
    }else {
      res.status(400).json({
        message : "No orderDetails with that id",
        data : []
      })
    }
  }

  async cancelMyOrder(req:AuthRequest,res : Response):Promise<void>{
    const userId = req.user?.id;
    const {orderId} = req.params

    const [order] = await Order.findAll({
      where : {
        userId,
        id : orderId
      }
    })
    
    if(order){
      if(order?.orderStatus === (OrderStatus.OntheWay || OrderStatus.Preparing)){
        res.status(200).json({
          message : "Order cannot be cancelled.Order is on the way or preparing"
        })
        return
      }
      order.orderStatus = OrderStatus.Cancelled;
      order.save();

      res.status(200).json({
        message : "Order cancelled successfully",
        data : order
      })
    }else {
      res.status(400).json({
        message : "No order of that id",
        data : []
      })
    }
    

    
  }
  //customer side ends here


  async changeOrderStatus(req:AuthRequest,res:Response):Promise<void>{
    const userId = req.user?.id;
    const {orderId} = req.params;
    const orderStatus:OrderStatus = req.body.orderStatus;
    

    if(!orderStatus){
      res.status(400).json({
        message : "please provide orderStatus"
      })
      return
    }

    if(Object.values(OrderStatus).includes(orderStatus)){
      await Order.update({
          orderStatus : orderStatus
        },{
          where : {
            userId,
            id : orderId
        }
      })

      res.status(200).json({
        message : "orderStatus changed Succesfully"
      })
    }else{
      res.status(400).json({
        message : "please provide appropriate orderStatus"
      })
    }
    
  }

  async changePaymentStatus(req:AuthRequest,res:Response):Promise<void>{
    const orderId = req.params.orderId;
    const paymentStatus:PaymentStatus = req.body.paymentStatus;
    const [order] = await Order.findAll({
      where : {
        id : orderId
      }
    })
    if(!paymentStatus){
      res.status(400).json({
        message : "please provide paymentStatus"
      })
      return
    }

    if(!order){
      res.status(400).json({
        message : "no order of that id "
      })
      return
    }

    const extendedOrder: ExtendedOrder = order as ExtendedOrder;

    if(Object.values(PaymentStatus).includes(paymentStatus)){
      await Payment.update({
        paymentStatus : paymentStatus
      },{
        where : {
          id : extendedOrder.paymentId
        }
      })

      res.status(200).json({
        message : "paymentStatus updated Successfully"
    })
    }else {
      res.status(200).json({
        message : "please provide unpaid or paid only paymentStatus"
      })
    }
    
  }

  async deleteOrder(req:AuthRequest,res:Response):Promise<void>{
    const {orderId} = req.params;
    const [order] = await Order.findAll({
      where : {
        id : orderId
      }
    })

    if(!order){
      res.status(400).json({
        message : "no order of that id "
      })
      return
    }

    const extendedOrder :ExtendedOrder = order as ExtendedOrder;

    await Payment.destroy({
      where : {
        id : extendedOrder.paymentId
      }
    })

    await OrderDetail.destroy({
      where : {
        orderId
      }
    })

    await Order.destroy({
      where : {
        id : orderId
      }
    })

    res.status(200).json({
      message : "Order deleted successfully"
    })
  }

  async fetchOrder(req:AuthRequest,res:Response):Promise<void>{
    const orders = await Order.findAll({
      include : [
        {
          model : Payment,
          
        }
      ]
    });
    if(orders.length===0){
      res.status(404).json({
        message : " no Order in the database"
      })
      return
    }

    res.status(200).json({
      message : "Orders Fetched successfully",
      data : orders
    })

    
  }


}

export default new OrderController()