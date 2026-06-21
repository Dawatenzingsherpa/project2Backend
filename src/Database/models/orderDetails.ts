import {
  Table,
  Column,
  Model,
  DataType,
  
} from 'sequelize-typescript'
import Order from './orderModel'

@Table({
  tableName : "orderDetails",
  modelName : "OrderDetail",
  timestamps : true
})

class OrderDetail extends Model{
  @Column({
    type  : DataType.UUID,
    defaultValue : DataType.UUIDV4,
    primaryKey : true
  })

  declare id : string

  @Column({
    type : DataType.INTEGER,
    allowNull : false
  })
  declare quantity : number
}


export default OrderDetail