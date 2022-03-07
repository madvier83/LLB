import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class HistoryPrints extends BaseSchema {
  protected tableName = 'historyprints'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_customer')
      table.integer('total_print')
      table.datetime('tanggal_print')

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
