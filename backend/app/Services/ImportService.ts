import Excel from 'exceljs'
import Customers from 'App/Models/Customer'

export default class ImportService {
  public static async ImportClassification(filelocation) {
    let workbook = new Excel.Workbook()

    workbook = await workbook.xlsx.readFile(filelocation)

    let explanation = workbook.getWorksheet('Sheet1') // get sheet name

    let colComment = explanation.getColumn('C') //column name

    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber > 1) {
        let kodecustomer = '' + explanation.getCell('A' + rowNumber).value
        let golongancustomer = '' + explanation.getCell('B' + rowNumber).value
        let name = '' + explanation.getCell('C' + rowNumber).value
        let alamatcustomer = '' + explanation.getCell('D' + rowNumber).value
        let kodepposcustomer = '' + explanation.getCell('E' + rowNumber).value
        let piccustomer = '' + explanation.getCell('F' + rowNumber).value
        let phone = '' + explanation.getCell('G' + rowNumber).value
        let mobilePhone = '' + explanation.getCell('H' + rowNumber).value
        let fax = '' + explanation.getCell('I' + rowNumber).value
        let alamatkirim = '' + explanation.getCell('J' + rowNumber).value
        let kodeposkirim = '' + explanation.getCell('K' + rowNumber).value
        let pickirim = '' + explanation.getCell('L' + rowNumber).value

        //custom field name in database to variable

        return await Customers.create({
          kode_customer: kodecustomer,
          golongan_customer: golongancustomer,
          nama: name,
          alamat_customer: alamatcustomer,
          kodepos_customer: kodepposcustomer,
          pic_customer: piccustomer,
          phone: phone,
          mobile_phone: mobilePhone,
          fax: fax,
          alamat_kirim: alamatkirim,
          kodepos_kirim: kodeposkirim,
          pic_kirim: pickirim,
        })
      }
    })
  }
}
