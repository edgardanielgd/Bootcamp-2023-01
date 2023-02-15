import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil'
import Publicacion from './Publicacion'
import Grupo from './Grupo'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true, columnName : 'usrID' }) usrID : Number
  @column({ columnName : 'usrNombre' }) usrNombre : String
  @column({ columnName : 'usrPassword' }) usrPassword : String
  @column({ columnName : 'usrEmail' }) usrEmail : String
  @column({ columnName : 'usrTelefono' }) usrTelefono : String

  @hasOne( () => Perfil, {
    foreignKey: 'usrID',
    localKey : 'usrID'
  })
  public perfil : HasOne< typeof Perfil >

  @hasMany( () => Publicacion , {
    localKey : 'usrID',
    foreignKey : 'usrID',
  })
  public publicacions : HasMany< typeof Publicacion > 

  @manyToMany( () => Grupo, {
    localKey : 'usrID',
    pivotForeignKey : 'usrID',
    relatedKey : 'gruID',
    pivotRelatedForeignKey : 'usrID',
    pivotTable : 'usuario_grupos'
  })
  public usuario_grupos : ManyToMany<typeof Grupo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
