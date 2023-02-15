import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UsuarioGrupo extends BaseModel {

  @column({ columnName : 'usrID' }) public usrID : Number
  @column({ columnName : 'gruID' }) public gruID : Number
  @column({ columnName : 'u_gInicio' }) public u_gInicio : DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
