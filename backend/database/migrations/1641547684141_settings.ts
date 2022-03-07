import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Settings extends BaseSchema {
  protected tableName = 'settings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('key')
      table.string('value')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at')
      table.datetime('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
