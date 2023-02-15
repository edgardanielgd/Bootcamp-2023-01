import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Publicacion extends BaseModel {
  @column({ isPrimary: true, columnName : 'pubID' }) public pubID: number
  @column({ columnName : 'pubTitulo' }) public pubTitulo: string
  @column({ columnName : 'pubCuerpo' }) public pubCuerpo: string
  @column({ columnName : 'usrID' }) public usrID: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
