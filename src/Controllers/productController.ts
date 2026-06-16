import { Request,Response } from "express";
import Product from "../Database/models/productModel";
import { describe } from "node:test";
import { AuthRequest } from "../Middleware/authMiddleware";




class ProductController{
  public static async addProduct(req:AuthRequest,res: Response):Promise<void>{
    const userId = req.user?.id;
    let filename; 
    const {productName,productPrice,description,productTotalStockQty} = req.body;
    if(req.file){
      filename = req.file.filename;
    }else{
      res.status(400).json({
        message : "file is missing"
      })
    }
    if(!description || !productName || !productPrice || !productTotalStockQty){
      res.status(400).json({
        message : "please provide productName,productPrice,productDescription,productTotalStockQty "
      })
      return;
    }

    await Product.create({
      productName,
      productPrice,
      description,
      productTotalStockQty,
      imageUrl : filename,
      userId : userId
    })

    res.status(201).json({
      message : "Product created successfully"
    })

  }
}

export default ProductController