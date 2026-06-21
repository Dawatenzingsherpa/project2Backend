import { Response } from "express";
import { AuthRequest } from "../Middleware/authMiddleware";
import { OrderData } from "../types/OrderTypes";
import Order from "../Database/models/orderModel";
import Payment from "../Database/models/paymentModel";
import OrderDetail from "../Database/models/orderDetails";
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

    const orderData = await Order.create({
      phoneNumber,
      shippingAddress,
      totalAmount,
      userId
    })

    await Payment.create({
      paymentMethod : paymentDetails.paymentMethod
    })

    for(let i = 0;i<items.length;i++){
      await OrderDetail.create({
        quantity : items[i]?.quantity,
        productId : items[i]?.productId,
        orderId : orderData.id
      })
    }
  }
}