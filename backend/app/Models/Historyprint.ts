import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Historyprint extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_customer: string

  @column()
  public total_print: string

  @column.dateTime({ autoCreate: true })
  public tanggal_print: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
