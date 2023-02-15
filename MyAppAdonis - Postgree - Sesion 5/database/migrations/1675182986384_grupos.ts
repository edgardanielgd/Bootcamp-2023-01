import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Grupos extends BaseSchema {
  protected tableName = 'grupos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('gruID').primary().unsigned()
      table.string('gruNombre', 100).notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
