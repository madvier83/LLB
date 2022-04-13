import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Customers extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public kode_customer: string

  @column()
  public golongan_customer: string

  @column()
  public nama: string

  @column()
  public alamat_customer: string

  @column()
  public kodepos_customer: string

  @column()
  public kelurahan_customer: string

  @column()
  public pic_customer: string

  @column()
  public phone: string

  @column()
  public mobile_phone: string

  @column()
  public fax: string

  @column()
  public alamat_kirim: string

  @column()
  public kodepos_kirim: string

  @column()
  public kecamatan_kirim:string

  @column()
  public kecamatan_customer:string

  @column()
  public provinsi_kirim:string

  @column()
  public provinsi_customer:string
  @column()
  public kelurahan_kirim: string

  @column()
  public pic_kirim: string

  @column()
  public customer: string

  @column()
  public telp_kirim: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
