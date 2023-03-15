import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true, columnName : 'id' })
  public id: number

  @column({ columnName : 'question' })
  public question: string

  @column({ columnName : 'state' })
  public state: boolean

  @hasMany(() => Answer, {
    localKey: 'id',
    foreignKey: 'question_id'
  })
  public answers: HasMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
