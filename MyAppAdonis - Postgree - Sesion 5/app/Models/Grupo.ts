import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Grupo extends BaseModel {
  @column({ isPrimary: true, columnName : 'gruID' })
  public gruID: number

  @column({ columnName : 'gruNombre' }) public gruNombre : string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
