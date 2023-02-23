import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Perfil extends BaseModel {
  @column({ isPrimary: true, columnName: 'per_id' })
  public per_id: number

  @column({columnName: 'per_nombre'})
  public per_nombre: string

  @column({columnName: 'per_descripcion'})
  public per_descripcion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
