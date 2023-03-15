import { DateTime } from 'luxon'
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'

export default class User extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'first_name' })
  public first_name: string

  @column({ columnName: 'last_name' })
  public last_name: string

  @column({ columnName: 'surname' })
  public surname: string

  @column({ columnName: 'second_sur_name' })
  public second_sur_name: string

  @column({ columnName: 'document_type' })
  public document_type: number

  @column({ columnName: 'document_number' })
  public document_number: string

  @column({ columnName: 'email' })
  public email: string

  @column({ columnName: 'password' })
  public password: string

  @column({ columnName: 'rol_id'})
  public rol_id: number

  @column({ columnName: 'phone' })
  public phone: string

  @column({ columnName: 'state' })
  public state: boolean

  @hasMany(() => Form, {
    localKey: 'id',
    foreignKey: 'student_id'
  })
  public forms : HasMany<typeof Form>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
