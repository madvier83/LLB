import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Printqueues extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_customers: number

  @column()
  public status: string

  @column()
  public total_print: number

  @column()
  public seed: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
