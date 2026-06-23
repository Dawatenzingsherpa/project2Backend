import { Response } from "express";
import { AuthRequest } from "../Middleware/authMiddleware";
import { OrderData, TransactionStatus, TransactionVerifyResponse } from "../types/OrderTypes";
import Order from "../Database/models/orderModel";
import Payment from "../Database/models/paymentModel";
import { PaymentMethod,KhaltiResponse } from "../types/OrderTypes";
import OrderDetail from "../Database/models/orderDetails";
import axios from "axios";

import Product from "../Database/models/productModel";
import { where } from "sequelize";

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

  async fetchOrder(req:AuthRequest,res:Response):Promise<void>{
    const userId  = req.user?.id
    const {orderId}= req.params
    
    const order = await Order.findAll({
      where : {
        id  : orderId
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

    if(order.length> 0){
      res.status(200).json({
        message : "Order Fetched successfully",
        data : order
      })
    }else {
      res.status(400).json({
        message : "No order with that id",
        data : []
      })
    }
  }
}

export default new OrderController()