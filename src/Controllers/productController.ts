import { Request,Response } from "express";
import Product from "../Database/models/productModel";
import User from "../Database/models/userModel";
import Category from "../Database/models/categoryModel";
import { describe } from "node:test";
import { AuthRequest } from "../Middleware/authMiddleware";




class ProductController{
  public static async addProduct(req:AuthRequest,res: Response):Promise<void>{
    const userId = req.user?.id;
    let filename; 
    const {productName,productPrice,description,productTotalStockQty,categoryId} = req.body;
    if(req.file){
      filename = req.file.filename;
    }else{
      res.status(400).json({
        message : "file is missing"
      })
    }
    if(!description || !productName || !productPrice || !productTotalStockQty||!categoryId){
      res.status(400).json({
        message : "please provide productName,productPrice,productDescription,productTotalStockQty,categoryId "
      })
      return;
    }

    await Product.create({
      productName,
      productPrice,
      description,
      productTotalStockQty,
      imageUrl : filename,
      userId : userId,
      categoryId: categoryId
    })

    res.status(201).json({
      message : "Product created successfully"
    })

  }

  public static async getProduct(req:Request,res:Response):Promise<void>{
    const data = await Product.findAll({
      include : [
        {
          model : User,
          attributes : ['id','email','username']
        },
        {
          model : Category,
          attributes : ['id','categoryName']
        }
      ]
    });
    res.status(200).json({
      message : "data fetched successfully",
      data
    })
    
  }


  public static async getSingleProduct(req: Request, res:Response):Promise<void>{
    const id = req.params.id;
    const data = await Product.findAll({
      where : {
        id : id 
      },include : [
        {
          model : User,
          attributes : ['id','email','username']
        },
        {
          model : Category,
          attributes: ['id','categoryName']
        }
      ]
    })
    if(data.length ==0 ){
      res.status(404).json({
        message : "No Product with that id "
      })
      return 
    }else{
      res.status(200).json({
        message  : "Data retrieved successfully",
        data
      })
    
    }
  }

  public static async deleteProduct(req:Request,res: Response):Promise<void>{
    const {id} = req.params;
    const data = await Product.findAll({
      where : {
        id : id
      }
    })

    if(data.length > 0){
      await Product.destroy({
        where : {
          id : id 
        }
      })
      res.status(200).json({
        message : "product deleted successfully"
      })
      return
    }else {
      res.status(404).json({
        message : "No Product with that id"
      })
    }
  }

  public static async updateProduct(req:AuthRequest,res: Response):Promise<void>{
    const userId = req.user?.id;
    const {id} = req.params;
    const [data] = await Product.findAll({
      where :{
        id : id
      }
    })

    if(data){
      let filename; 
      const {productName,productPrice,description,productTotalStockQty,categoryId} = req.body;
      if(req.file){
        filename = req.file.filename;
      }
      
      
      await Product.update({
        productName,
        productPrice,
        description,
        productTotalStockQty,
        imageUrl : filename,
        userId : userId,
        categoryId: categoryId
      },{
        where : {
          id : id
        }
      })

      res.status(201).json({
        message : "Product update successfully",
        
      })
    }else {
      res.status(404).json({
        message : "No Product with that id"
      })
    }
    
  }
}

export default ProductController