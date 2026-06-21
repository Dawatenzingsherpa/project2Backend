import { Request,Response } from "express";
import { AuthRequest } from "../Middleware/authMiddleware";
import Cart from "../Database/models/cartModel";
import Product from "../Database/models/productModel";
import User from "../Database/models/userModel";
import Category from "../Database/models/categoryModel";
class CartController{
  async addToCart(req:AuthRequest,res:Response):Promise<void>{
    const userId = req.user?.id;
    const {productId,quantity} = req.body;
    if(!productId || !quantity){
      res.status(404).json({
        message : "please provide productId and quantity"
      })
      return
    }
    let cartItem = await Cart.findOne({
      where : {
        productId,
        userId
      }
    })

    if(cartItem){
      cartItem.quantity +=quantity
      await cartItem.save()
    
    }else{
      cartItem = await Cart.create({
        productId,
        userId,
        quantity
      }) 
    }

     res.status(201).json({
        message : "product added to cart successfully",
        data : cartItem
      })

  }


  async getMyCart(req:AuthRequest,res:Response):Promise<void>{
    const userId = req.user?.id;
    
    const cartItems = await Cart.findAll({
      where : {
        userId
      },
      include:[
        {
          model : Product,
          attributes : ['id','productName','productPrice','categoryId'],
          include : [
            {
              model : Category,
              attributes : ['id','categoryName']
            }
          ]
        },
        {
          model : User,
          attributes : ['id','email','username']
        }
      
      ],
      attributes : ['id','productId','userId']
    })

    if(cartItems.length == 0){
      res.status(404).json({
        message : "No item in the cart"
      })
      return 
    }

    res.status(200).json({
      message : "cart fetched successfully",
      data :cartItems
    })
  }


  async deleteMyCartItem(req:AuthRequest,res:Response):Promise<void>{
    const userId = req.user?.id;
    const {productId} = req.params

    const data = await Cart.findAll({
      where : {
        userId,
        productId
      }
    })

    if(data.length === 0){
      res.status(404).json({
        message : "No CartItem with that productId"
      })
      return 
    }

    await Cart.destroy({
      where : {
        productId,
        userId
      }
    })

    res.status(200).json({
      message : "CartItem deleted successfully"
      
    })
  }

  async updateMyCartItem(req:AuthRequest,res:Response):Promise<void>{
    const userId = req.user?.id;
    const {productId} = req.params
    const {quantity} = req.body

    if(!quantity){
      res.status(404).json({
        message : "please provide quantity"
      })
      return
    }

    const cartData = await Cart.findOne({
      where : {
        userId,
        productId
      }
    })
    if(!cartData){
      res.status(404).json({
        message : "no cartItem with that productId"
      })
      return
    }


    cartData.quantity = quantity
    cartData.save();

    res.status(200).json({
      message : "CartItem updated successfully",
      data : cartData
    })
  }
}


export default new CartController()