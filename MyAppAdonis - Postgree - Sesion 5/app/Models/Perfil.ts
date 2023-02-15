import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Perfil extends BaseModel {
  @column({ isPrimary: true, columnName : 'perID' }) public perID: number
  @column({ columnName : 'perNombre' }) public perNombre: string
  @column({ columnName : 'perFechaCreacion' }) public perFechaCreacion: DateTime
  @column({ columnName : 'usrID' }) public usrID: number
   
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
