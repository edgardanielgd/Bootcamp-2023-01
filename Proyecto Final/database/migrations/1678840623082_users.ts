import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('surname', 255).notNullable()
      table.string('second_sur_name', 255).notNullable()
      table.integer('document_type').notNullable()
      table.string('document_number', 255).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.integer('rol_id').notNullable()
      table.string('phone', 255).notNullable()
      table.boolean('state').notNullable()
      table.timestamps(true)

      table.foreign('rol_id').references('id').inTable('roles').onDelete('CASCADE')
      table.foreign('document_type').references('id').inTable('document_types').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
