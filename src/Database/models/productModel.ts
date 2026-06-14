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
  tableName : 'products',
  modelName : "Product",
  timestamps: true
})

class Product extends Model{
  @Column({
    primaryKey: true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string
  
  @Column({
    type: DataType.STRING,
    allowNull : false

  })
  declare productName : string

  @Column({
    type: DataType.TEXT,
    allowNull : false
  })
  declare description : string

  @Column({
    type : DataType.INTEGER,
    allowNull : false
  })
  declare productPrice : number

  @Column({
    type : DataType.INTEGER,
    allowNull : false
  })
  declare productTotalStockQty : number

  @Column({
    type: DataType.STRING,
  })
  declare imageUrl: string
}

export default Product