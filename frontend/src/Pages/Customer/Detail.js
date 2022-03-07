import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { BiArrowBack } from 'react-icons/bi'
import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";

function Detail() {
    const [data, setData] = useState({})
    const [infoCust, setInfoCust] = useState([])
    const [infoKirim, setInfoKirim] = useState([])


    const { id } = useParams()
    const getCustomer = async () => {
        const response = await axios.get(`/api/customers/${id}`)
        const data = await response.data
        const getAddress = await axios.get(`/api/getAddress/${data.kodepos_customer}/${data.kelurahan_customer}`)
        const result = await getAddress.data
        console.log(result)
        const getAddressKirim = await axios.get(`/api/getAddress/${data.kodepos_kirim}/${data.kelurahan_kirim}`)
        const resultkirim = await getAddressKirim.data
        setData(data)
        if (result.length > 0 || resultkirim.length > 0) {
            setInfoKirim(resultkirim[0])
            setInfoCust(result[0])
        } else {
            setInfoCust([])
            setInfoKirim([])
        }


    }

    useEffect(() => {
        getCustomer()
    }, [])
    return (
        <>
            <Header />
            <div className="wrapper d-print-none">
                <Sidebar />
                <main>
                    <div className="container mb-5">
                        <Link to="/customer" className="text-white btn btn-secondary btn-sm "> < BiArrowBack className="me-2" />Back</Link>
                        <div className="card p-5 mt-3 ">
                            <h3 className="text-center">Detail untuk kode {data.kode_customer ? data.kode_customer : '-'}</h3>
                            <div className="card-body">
                                <div className="row mt-5">
                                    <div className="col-lg-6">
                                        <pre>
                                            <h5>Kode Customer       : {data.kode_customer ? data.kode_customer : '-'}</h5>
                                            <h5>Golongan Customer   : {data.golongan_customer ? data.golongan_customer : '-'}</h5>
                                            <h5>Nama Customer       : {data.nama ? data.nama : '-'}</h5>
                                            <h5>Phone Customer      : {data.phone ? data.phone : '-'}</h5>
                                            <h5>Alamat Customer     : {data.alamat_customer ? data.alamat_customer : '-'}</h5>
                                            <h5>Provinsi Customer   : {infoCust.provinsi ? infoCust.provinsi : '-'}</h5>
                                            <h5>Kota Customer       : {infoCust.kabupaten ? infoCust.kabupaten : '-'}</h5>
                                            <h5>Kecamatan Customer  : {infoCust.kecamatan ? infoCust.kecamatan : '-'} </h5>
                                            <h5>Kelurahan Customer  : {infoCust.kelurahan ? infoCust.kelurahan : '-'}</h5>
                                            <h5>Kodepos Customer    : {data.kodepos_customer ? data.kodepos_customer : '-'}</h5>
                                            <h5>Pic Customer        : {data.pic_customer ? data.pic_customer : '-'}</h5>

                                        </pre>
                                    </div>
                                    <div className="col-lg-6">
                                        <pre>
                                            <h5> </h5>
                                            <h5> </h5>
                                            <h5> </h5>
                                            <h5>Phone Kirim         : {data.telp_kirim ? data.telp_kirim : '-'}</h5>
                                            <h5>Alamat Kirim        : {data.alamat_kirim ? data.alamat_kirim : '-'}</h5>
                                            <h5>Provinsi Kirim      : {infoKirim.provinsi ? infoKirim.provinsi : '-'}</h5>
                                            <h5>Kota Kirim          : {infoKirim.kabupaten ? infoKirim.kabupaten : '-'}</h5>
                                            <h5>Kecamatan Kirim     : {infoKirim.kecamatan ? infoKirim.kecamatan : '-'} </h5>
                                            <h5>Kelurahan Kirim     : {infoKirim.kelurahan ? infoKirim.kelurahan : '-'}</h5>
                                            <h5>Kodepos Kirim       : {data.kodepos_kirim ? data.kodepos_kirim : '-'}</h5>
                                            <h5>Pic Kirim           : {data.pic_kirim ? data.pic_kirim : '-'}</h5>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </main>
            </div>


        </>
    )
}


export default Detail