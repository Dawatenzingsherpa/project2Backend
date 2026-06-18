import Category from "../Database/models/categoryModel"
import { Request,Response } from "express";
class CategoryController{
  categoryData = [
    {
      categoryName : 'Electronics'
    },
    {
      categoryName : "Groceries"
    },
    {
      categoryName : "Food/Beverages"
    }
  ]

  async seedCategory():Promise<void>{
    const datas = await Category.findAll();
    if(datas.length === 0){
      const data = await Category.bulkCreate(this.categoryData);
      console.log("categories seeded successfully")
    }else {
      console.log("categories already seeded")
    }
  }

  async addCategory(req:Request,res:Response):Promise<void>{
    const {categoryName} = req.body

    if(!categoryName){
      res.status(404).json({
        message : "please provide categoryName"
      })
      return
    }
    
    await Category.create({
      categoryName
    })
    res.status(201).json({
      message : "category created successfully"
    })
  }

  async getCategory(req:Request,res:Response):Promise<void>{
    const data = await Category.findAll()
    if(data== undefined || data == null ){
      res.status(404).json({
        message : "category not found"

      })
      
    }
    res.status(200).json({
      message : 'data fetched successfully',
      data 
    })
    return

    
  }

  async getSingleCategory(req:Request,res:Response):Promise<void>{
    const {id} = req.params
    const data = await Category.findAll({
      where : {
        id : id
      }
    })

    if(data.length ==0 ){
      res.status(404).json({
        message : "no category with that id"
      })
      return
    }else{
      res.status(200).json({
        message : "data fetched successfully",
        data
      })
    }
  }

  async deleteCategory(req:Request,res:Response):Promise<void>{
    const {id} = req.params;
    const data = await Category.findAll({
      where : {
        id : id
      }
    })

    if(data.length ==0 ){
      res.status(404).json({
        message : "no category with that id"
      })
      return
    }else{

      await Category.destroy({
        where :{
          id : id
        }
      })
      res.status(200).json({
        message : "data deleted successfully",
        
      })
    }
  }

  async updateCategory(req:Request,res:Response):Promise<void>{
    const {id} = req.params;
    const {categoryName} = req.body;
    console.log(categoryName);
    const data = await Category.findAll({
      where : {
        id : id
      }
    })

    if(data.length ==0 ){
      res.status(404).json({
        message : "no category with that id"
      })
      return
    }else{

      await Category.update(
        {
        categoryName 
        },{
        where :{
          id : id
        }
      })
      res.status(200).json({
        message : "data updated successfully",
        
      })
    }
  
  }
}

export default new CategoryController