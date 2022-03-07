import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PrintQueues extends BaseSchema {
  protected tableName = 'printQueues'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_customers')
      table.string('status')
      table.integer('total_print')

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
