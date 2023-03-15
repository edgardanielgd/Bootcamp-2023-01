import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class TipoDocumento extends BaseModel {
  @column({ isPrimary: true, columnName : "id" }) public id: number
  @column({ columnName : "name" }) public name: string
  @column({ columnName : "state" }) public state: boolean

  @hasMany(() => User, {
    localKey: 'id',
    foreignKey: 'document_type'
  })
  public users: HasMany<typeof User>
  
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
}
