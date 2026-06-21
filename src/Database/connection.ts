import { Sequelize } from "sequelize-typescript";
import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import Cart from "./models/cartModel";
import Order from "./models/orderModel";
import OrderDetail from "./models/orderDetails";
import Payment from "./models/paymentModel";
const sequelize = new Sequelize({
  database : process.env.DB_NAME!,
  dialect : "mysql",
  username : process.env.DB_USERNAME!,
  password : process.env.DB_PASSWORD!,
  host : process.env.DB_HOST!,
  port : Number(process.env.DB_PORT),
  models : [__dirname + "/models"]

})


sequelize.authenticate()
.then(()=>{
  console.log("connected")
})
.catch((err)=>{
  console.log(err)
})

sequelize.sync({alter : false}).then(()=>{
  console.log("synced");

})


//Relationships
User.hasMany(Product,{foreignKey:'userId'});
Product.belongsTo(User,{foreignKey:'userId'})


Product.belongsTo(Category,{foreignKey : 'categoryId'});
Category.hasOne(Product,{foreignKey : 'categoryId'});

//cart and product relationship 
Product.hasMany(Cart,{foreignKey: 'productId'});
Cart.belongsTo(Product,{foreignKey: "productId"});

//cart and user relationship 
User.hasMany(Cart,{foreignKey: "userId"});
Cart.belongsTo(User,{foreignKey : "userId"});

//order and orderDetails relationship
Order.hasMany(OrderDetail,{foreignKey : 'orderId'})
OrderDetail.belongsTo(Order,{foreignKey: 'orderId'})

//orderDetails and product relationship
Product.hasMany(OrderDetail,{foreignKey : 'productId'})
OrderDetail.belongsTo(Product,{foreignKey: 'productId'})


//order and payment relationship
Payment.hasOne(Order,{foreignKey : 'paymentId'})
Order.belongsTo(Payment,{foreignKey: 'paymentId'})


//order and user relationship
User.hasMany(Order,{foreignKey : "userId"})
Order.belongsTo(User,{foreignKey : "userId"})



export default sequelize