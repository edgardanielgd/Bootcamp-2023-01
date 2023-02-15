import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Perfils extends BaseSchema {
  protected tableName = 'perfils'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('perID').primary().unsigned()
      table.string('perNombre', 100).notNullable()
      table.date('perFechaCreacion').notNullable()
      table.integer('usrID').unsigned().unique()
      table.foreign('usrID').references('usuarios.usrID').onDelete('cascade')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
