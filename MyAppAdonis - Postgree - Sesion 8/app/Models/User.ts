import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne, HasOne, hasMany, HasMany
} from '@ioc:Adonis/Lucid/Orm'

import Perfil from './Perfil'
import Book from './Book'

export default class User extends BaseModel {
  @column({ isPrimary: true, columnName: 'usr_id' })
  public usr_id: number

  @column({columnName: 'usr_nombres'})
  public usr_nombres: string

  @column({columnName: 'usr_apellidos'})
  public usr_apellidos : string

  @column({columnName: 'usr_email'})
  public usr_email: string

  @column({ serializeAs: null, columnName: 'password' })
  public password: string

  @column({columnName: 'usr_rememberMeToken'})
  public usr_rememberMeToken?: string

  @column({columnName: 'usr_telefono'})
  public usr_telefono: string

  @column({columnName: 'usr_doc_tipo'})
  public usr_doc_tipo: string

  @column({columnName: 'usr_documento'})
  public usr_documento: string

  @column({columnName: 'usr_direccion'})
  public usr_direccion: string

  @column({columnName: 'usr_barrio'})
  public usr_barrio: string

  @column({columnName: 'usr_ciudad'})
  public usr_ciudad: string

  @column({columnName: 'usr_departamento'})
  public usr_departamento: string

  @column({columnName: 'per_id'})
  public per_id: number

  @hasOne( () => Perfil, {
    localKey: 'per_id',
    foreignKey: 'per_id'
  })
  public perfil: HasOne<typeof Perfil>

  @hasMany( () => Book, {
    localKey: 'usr_id',
    foreignKey: 'usr_id'
  })
  public books: HasMany<typeof Book>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }
}
