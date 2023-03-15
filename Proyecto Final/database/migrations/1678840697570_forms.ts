import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forms extends BaseSchema {
  protected tableName = 'forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.boolean('state').notNullable()
      table.timestamps(true)

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('answer_id').unsigned().references('id').inTable('answers').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
