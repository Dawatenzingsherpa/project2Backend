import {
  Table,
  Column,
  Model,
  CreatedAt,
  DataType,
  AllowNull


}from 'sequelize-typescript'


@Table({

  tableName : "orders",
  modelName : "Order",
  timestamps: true
})

class Order extends Model{
  @Column({
    primaryKey: true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string
  
  @Column({
    type : DataType.STRING,
    allowNull : false,
    validate: {
      len : {
        args : [10,10],
        msg : "phone number should be 10 digits"
      }
    }
  })
  declare phoneNumber : string

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare shippingAddress : string

  @Column({
    type : DataType.FLOAT,
    allowNull : false
  })
  declare totalAmount : Float16Array

  @Column({
    type : DataType.ENUM('pending','delivered','ontheWay','cancelled','preparing'),
    defaultValue : 'pending'
  })
  declare orderStatus: string
}

export default Order