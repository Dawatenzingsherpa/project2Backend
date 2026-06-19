import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  PrimaryKey,
  AllowNull
} from 'sequelize-typescript'
import { Col } from 'sequelize/lib/utils'

@Table({
  tableName : 'carts',
  modelName : "Cart",
  timestamps: true
})

class Cart extends Model{
  @Column({
    primaryKey: true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string
  
  @Column({
    type : DataType.INTEGER,

  })
  declare quantity : string
}

export default Cart