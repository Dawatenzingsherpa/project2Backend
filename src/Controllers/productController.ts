import { Request,Response } from "express";
import Product from "../Database/models/productModel";
import { describe } from "node:test";




class ProductController{
  public static async addProduct(req:Request,res: Response):Promise<void>{
    
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
      imageUrl : filename
    })

    res.status(201).json({
      message : "Product created successfully"
    })

  }
}

export default ProductController