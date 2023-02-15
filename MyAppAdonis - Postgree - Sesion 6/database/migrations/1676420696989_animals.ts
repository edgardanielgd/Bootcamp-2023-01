import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Animals extends BaseSchema {
  protected tableName = 'animals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('aniID')
      table.string('aniName', 255).notNullable()
      table.integer('aniSpecie').notNullable()
      table.integer('aniRace').notNullable()
      table.integer('aniGender').notNullable()
      table.integer('aniAge').notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
