import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Form extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'student_id' })
  public student_id: number

  @column({ columnName: 'answer_id' })
  public answer_id: number

  @column({ columnName: 'state' })
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
