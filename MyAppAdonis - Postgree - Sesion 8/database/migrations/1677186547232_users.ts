import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('usr_id').primary()
      table.string('usr_nombres', 255).notNullable()
      table.string('usr_apellidos', 255).notNullable()
      table.string('usr_telefono', 255).notNullable()
      table.enum("usr_doc_tipo",['CC','TI','PAS','TE','NIT','OTRO']).notNullable()
      table.string('usr_documento', 255).notNullable().unique()
      table.string('usr_direccion', 255).notNullable()
      table.string('usr_barrio', 50).notNullable()
      table.string('usr_ciudad', 100).notNullable()
      table.string('usr_departamento', 100).notNullable()
      table.string('usr_email', 100).notNullable()
      table.string('password', 180).notNullable()
      table.string('usr_remember_me_token').nullable()

      table.integer('per_id').unsigned().notNullable()
      table.foreign('per_id').references('per_id').inTable('perfils').onDelete('CASCADE')
      
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
