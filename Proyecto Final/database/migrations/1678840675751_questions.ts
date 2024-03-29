import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('question', 255).notNullable()
      table.string('answer', 255).notNullable()
      table.boolean('state').notNullable()
      
      table.timestamps(true)

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
