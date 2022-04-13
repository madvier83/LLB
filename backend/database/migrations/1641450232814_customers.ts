import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Customers extends BaseSchema {
  protected tableName = 'customers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('kode_customer')
      table.string('golongan_customer')
      table.string('nama')
      table.string('alamat_customer')
      table.string('kodepos_customer')
      table.string('kelurahan_customer')
      table.string('pic_customer')
      table.string('phone')
      table.string('mobile_phone')
      table.string('fax')
      table.string('alamat_kirim')
      table.string('kodepos_kirim')
      table.string('kelurahan_kirim')
      table.string('kecamatan_kirim')
      table.string('kecamatan_customer')
      table.string('provinsi_kirim')
      table.string('provinsi_customer')
      table.string('pic_kirim')
      table.string('customer')
      table.string('telp_kirim')

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
