import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'

export default class Answer extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'question_id' })
  public question_id: number

  @column({ columnName: 'answer' })
  public answer: string

  @column({ columnName: 'state' })
  public state: boolean

  @column({ columnName: 'is_correct' })
  public is_correct: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Form, {
    localKey: 'id',
    foreignKey: 'answer_id'
  })
  public forms: HasMany<typeof Form>

}
