// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import BaseController from './BaseController'
import Historyprint from 'App/Models/Historyprint'
import Customers from 'App/Models/Customer'
import Printqueues from 'App/Models/PrintQueue'

export default class PrintQueuesController extends BaseController {

  public async printall(){
    return await Database.rawQuery(
      `SELECT printQueues.id as id_print ,printQueues.id_customers, printQueues.status , printQueues.total_print, customers.mobile_phone ,customers.kode_customer, customers.nama, customers.mobile_phone, customers.telp_kirim,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.alamat_customer
        ELSE customers.alamat_kirim
      END AS alamat,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.provinsi_customer
        ELSE customers.provinsi_kirim
      END AS provinsi,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.kecamatan_customer
        ELSE customers.kecamatan_kirim
      END AS kecamatan,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.phone
        ELSE customers.telp_kirim
      END AS phone,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.kodepos_customer
        ELSE customers.kodepos_kirim
      END AS kodepos,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.kelurahan_customer
        ELSE customers.kelurahan_kirim
      END AS kelurahan,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.pic_customer
        ELSE customers.pic_kirim
      END AS pic
      FROM printQueues INNER JOIN customers ON printQueues.id_customers = customers.id WHERE DATE_FORMAT(printQueues.created_at,'%Y-%m-%d') = CURDATE()`
    )
  }

  public async index() {
    return await Database.rawQuery(
      `SELECT printQueues.id as id_print ,printQueues.id_customers,printQueues.status,printQueues.total_print, customers.kode_customer, customers.nama, customers.mobile_phone,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.alamat_customer
        ELSE customers.alamat_kirim
      END AS alamat,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.kodepos_customer
        ELSE customers.kodepos_kirim
      END AS kodepos,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.kelurahan_customer
        ELSE customers.kelurahan_kirim
      END AS kelurahan,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.pic_customer
        ELSE customers.pic_kirim
      END AS pic
      FROM printQueues INNER JOIN customers ON printQueues.id_customers = customers.id WHERE DATE_FORMAT(printQueues.created_at,'%Y-%m-%d') = CURDATE()`
    )
  }

  public async getSpecificPrint({ params }) {
    return await Database.rawQuery(
      `SELECT printQueues.id as id_print ,printQueues.id_customers,printQueues.status,printQueues.total_print, customers.telp_kirim, customers.kode_customer, customers.nama, customers.phone, customers.mobile_phone,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.alamat_customer
        ELSE customers.alamat_kirim
      END AS alamat,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.kodepos_customer
        ELSE customers.kodepos_kirim
      END AS kodepos,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.kelurahan_customer
        ELSE customers.kelurahan_kirim
      END AS kelurahan,
      CASE
        WHEN printQueues.status ='alamat_customer' THEN customers.pic_customer
        ELSE customers.pic_kirim
      END AS pic
      FROM printQueues INNER JOIN customers ON printQueues.id_customers = customers.id
      where printQueues.id = ${params.id}`
    )
  }

  public async store({ request }) {
    try {
      if (request.all().pic_kirim !== null) {
        const data = await Customers.findOrFail(request.all().id)
        await data
          .merge({
            pic_kirim: request.all().pic_kirim,
          })
          .save()
      }

      if (request.all().alamat_kirim !== null) {
        const data = await Customers.findOrFail(request.all().id)
        await data
          .merge({
            alamat_kirim: request.all().alamat_kirim,
            kodepos_kirim: request.all().kodepos_kirim,
            kelurahan_kirim: request.all().kelurahan_kirim,
            telp_kirim: request.all().telp_kirim
          })
          .save()
      }
      
      await Printqueues.create({
        id_customers: request.all().id_customers,
        total_print: request.all().total_print,
        status: request.all().status,
      })

      await Historyprint.create({
        id_customer: request.all().id_customers,
        total_print: request.all().total_print,
      })

      return { message: 'success' }
    } catch (error) {
      return error.message
    }
  }

  public async edit({ params }) {
    try {
      return await Database.from('printQueues').where('id', params.id)
    } catch (error) {
      return { message: 'empty' }
    }
  }

  public async update({ params, request }) {
    try {
      await Database.from('printQueues').where('id', params.id).update({
        id_customers: request.all().id_customers,
        total_print: request.all().total_print,
        status: request.all().status,
        seed: request.all().seed,
      });
      (await Historyprint.findOrFail(params.id))
        .merge({
          id_customer: request.all().id_customers,
          total_print: request.all().total_print,
        })
        .save()    

      return { message: 'success' }
    } catch (error) {
      return error.message
    }
  }

  public async delete({ params }) {
    try {
      await Database.from('printQueues').where('id', params.id).delete()
      ;(await Historyprint.findOrFail(params.id)).delete()

      return { message: 'success' }
    } catch (error) {
      return { message: 'failed' }
    }
  }

  public async print() {
    try {
      await Database.from('printQueues').delete()

      return { message: 'success' }
    } catch (error) {
      return { message: 'failed' }
    }
  }

  public async history() {
    return await Database.from('historyprints')
      .join('customers', 'customers.id', '=', 'historyprints.id_customer')
      .select('historyprints.*')
      .select('customers.*')
  }
}
