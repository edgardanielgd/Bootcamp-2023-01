import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('book_id')
      table.string('book_title',200).notNullable()
      table.string('book_editorial',200).notNullable()
      table.string('book_formato',200).notNullable()
      table.integer('book_paginas').notNullable()
      table.integer('usr_id').unsigned().notNullable()
      table.foreign('usr_id').references('usr_id').inTable('users').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
