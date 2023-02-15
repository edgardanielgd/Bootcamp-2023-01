import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('usrID').primary().unsigned()
      table.string('usrNombre',100).notNullable()
      table.string('usrPassword', 100).notNullable()
      table.string('usrEmail', 100).notNullable()
      table.string('usrTelefono',15).notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
