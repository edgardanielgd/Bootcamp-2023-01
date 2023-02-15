import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsuarioGrupos extends BaseSchema {
  protected tableName = 'usuario_grupos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('usrID').unsigned()
      table.integer('gruID').unsigned()
      table.date('u_gInicio').notNullable()
      table.foreign('usrID').references('usuarios.usrID').onDelete('cascade')
      table.foreign('gruID').references('grupos.gruID').onDelete('cascade')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
