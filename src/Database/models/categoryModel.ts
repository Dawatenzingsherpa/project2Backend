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
  tableName : 'category',
  modelName : "Category",
  timestamps: true
})

class Category extends Model{
  @Column({
    primaryKey: true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string
  
  @Column({
    type : DataType.STRING,

  })
  declare categoryName : string
}

export default Category