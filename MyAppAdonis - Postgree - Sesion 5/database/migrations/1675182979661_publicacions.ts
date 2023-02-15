import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Publicacions extends BaseSchema {
  protected tableName = 'publicacions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('pubID').primary().unsigned()
      table.string('pubTitulo', 100).notNullable()
      table.string('pubCuerpo', 200).notNullable()
      table.integer('usrID').unsigned()
      table.foreign('usrID').references('usuarios.usrID').onDelete('cascade')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
