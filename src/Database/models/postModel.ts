import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  PrimaryKey
} from 'sequelize-typescript'
import { Col } from 'sequelize/lib/utils'

@Table({
  tableName : 'posts',
  modelName : "Post",
  timestamps: true
})

class Post extends Model{
  @Column({
    primaryKey: true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string
  
  @Column({
    type: DataType.STRING,

  })
  declare title : string

  @Column({
    type: DataType.STRING
  })
  declare description : string

  @Column({
    type: DataType.STRING
  })
  declare imageUrl: string
}

export default Post