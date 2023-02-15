import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Animal extends BaseModel {
  @column({ isPrimary: true, columnName : 'aniID' })
  public aniID: number

  @column({ columnName : 'aniName' })
  public aniName: string

  @column({ columnName : 'aniSpecie' })
  public aniSpecie: number

  @column({ columnName : 'aniRace' })
  public aniRace: number

  @column({ columnName : 'aniGender' })
  public aniGender: number

  @column({ columnName : 'aniAge' })
  public aniAge: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
