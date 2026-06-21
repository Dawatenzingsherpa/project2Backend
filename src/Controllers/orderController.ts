import { Response } from "express";
import { AuthRequest } from "../Middleware/authMiddleware";
import { OrderData } from "../types/OrderTypes";
import Order from "../Database/models/orderModel";
import Payment from "../Database/models/paymentModel";
import { PaymentMethod,KhaltiResponse } from "../types/OrderTypes";
import OrderDetail from "../Database/models/orderDetails";
import axios from "axios";

import Product from "../Database/models/productModel";

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
}

export default new OrderController()