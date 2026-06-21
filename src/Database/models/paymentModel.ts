import {
  Table,
  Column,
  Model,
  DataType,
  
} from 'sequelize-typescript'
import Order from './orderModel'

@Table({
  tableName : "payments",
  modelName : "Payment",
  timestamps : true
})

class Payment extends Model{
  @Column({
    type  : DataType.UUID,
    defaultValue : DataType.UUIDV4,
    primaryKey : true
  })

  declare id : string

  @Column({
    type : DataType.ENUM('COD','Khalti','Esewa'),
    defaultValue : 'COD'
  })
  declare paymentMethod : string

  @Column({
    type : DataType.ENUM('unpaid','paid'),
    defaultValue : 'unpaid'
  })
  declare paymentStatus: string

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare pidx: string
}


export default Payment