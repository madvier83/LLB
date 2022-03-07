// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BaseController from './BaseController'
import Customers from 'App/Models/Customer'
import Application from '@ioc:Adonis/Core/Application'
import ImportService from 'App/Services/ImportService'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CustomersController extends BaseController {
  public model = Customers

  public async store({ request }) {
    return super.store({
      kode_customer: request.all().kodecustomer,
      golongan_customer: request.all().golongancustomer,
      nama: request.all().name,
      alamat_customer: request.all().alamatcustomer,
      kodepos_customer: request.all().kodepposcustomer,
      kelurahan_customer: request.all().kelurahancustomer,
      pic_customer: request.all().piccustomer,
      phone: request.all().phone,
      mobile_phone: request.all().mobile_phone,
      fax: request.all().fax,
      alamat_kirim: request.all().alamatkirim,
      kodepos_kirim: request.all().kodeposkirim,
      kelurahan_kirim: request.all().kelurahankirim,
      pic_kirim: request.all().pickirim,
      customer: request.all().customer,
      telp_kirim: request.all().telp_kirim,
    })
  }

  public async update({ params, request }) {
    return super.update(params.id, {
      kode_customer: request.all().kodecustomer,
      golongan_customer: request.all().golongancustomer,
      nama: request.all().name,
      alamat_customer: request.all().alamatcustomer,
      kodepos_customer: request.all().kodepposcustomer,
      kelurahan_customer: request.all().kelurahancustomer,
      pic_customer: request.all().piccustomer,
      phone: request.all().phone,
      mobile_phone: request.all().mobile_phone,
      fax: request.all().fax,
      alamat_kirim: request.all().alamatkirim,
      kodepos_kirim: request.all().kodeposkirim,
      kelurahan_kirim: request.all().kelurahankirim,
      pic_kirim: request.all().pickirim,
      customer: request.all().customer,
      telp_kirim: request.all().telp_kirim,
    })
  }

  public async multiAddress({ params, request }) {
    if (request.all().address !== undefined) {
      return super.update(params.id, {
        shipping_address: request.all().address,
      })
    }
  }

  public async import({ request, response }) {
    return await Customers.createMany(
      request.all().upload.map((item) => {
        return {
          kode_customer: item.Kode_Customer,
          golongan_customer: item.Golongan_Customer,
          nama: item.Nama_Customer,
          alamat_customer: item.Alamat_customer,
          kodepos_customer: item.Kodepos,
          kelurahan_customer: item.kelurahan,
          pic_customer: item.Pic_Customer,
          phone:item.TeLepon_customer,
          mobile_phone: item.HP_customer,
          fax: item.Fax_Customer,
          alamat_kirim: item.Alamat_Kirim,
          kodepos_kirim: item.kodepos_Kirim,
          kelurahan_kirim: item.kelurahan_kirim,
          pic_kirim: item.Pic_Kirim,
          customer: item.Customer,
          telp_kirim: item.Telp_Kirim,
        }
      })
    )
  }

  public async getKelurahan({ params }) {
    return await Database.from('tbl_kodepos').select('kelurahan').where('kodepos', params.kodepos)
  }

  public async getAddressFromPostId({ params }) {
    return await Database.from('tbl_kodepos').select('*').where({
      kodepos: params.kodepos,
      kelurahan: decodeURI(params.kelurahan),
    })
  }

  public async getSpecificAddress({ params }) {
    return await Database.from('tbl_kodepos').select('*').where({
      kodepos: params.kodepos
    })
  }

  public async getAddress() {
    return await Database.from('tbl_kodepos')
  }

  public async getAddresFromStatus({ params, request }) {
    if (request.all().status === 'alamat_customer') {
      return await Database.from('customers')
        .select(
          'customers.kode_customer, customers.nama, customers.alamat_customer, customers.kodepos_customer,customers.kelurahan_customer, customers.alamat_customer, customers.pic_cutomer'
        )
        .where('id', params.id)
    } else if (request.all().status === 'alamat_kirim') {
      return await Database.from('customers')
        .select(
          'customers.kode_customer, customers.nama, customers.alamat_customer, customers.kodepos_customer,customers.kelurahan_customer, customers.alamat_customer, customers.pic_cutomer'
        )
        .where('id', params.id)
    }
  }
}
