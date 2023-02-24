import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true, columnName: 'book_id' })
  public book_id: number

  @column({columnName: 'book_title'})
  public book_title: string

  @column({columnName: 'book_editorial'})
  public book_editorial: string

  @column({columnName: 'book_formato'})
  public book_formato: string

  @column({columnName: 'book_paginas'})
  public book_paginas: number

  @column({columnName: 'usr_id'})
  public usr_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
