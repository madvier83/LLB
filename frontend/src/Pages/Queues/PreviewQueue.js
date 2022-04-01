import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Logo from '../../Assets/Logo/label.png'
import '../Print/Print.css'
// import axios
import axios from "axios";

import { AiFillPhone, AiTwotoneMail } from 'react-icons/ai'
import { FaFax, FaMapMarkerAlt } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'

export default function PreviewQueue() {

    const [previewSettings, setPreviewSettings] = useState([])
    const [infoCust, setInfoCust] = useState([])
    const { id_customers } = useParams()
    const [email, setEmail] = useState('')
    const [fax, setFax] = useState('')
    const [phone, setPhone] = useState('')
    const [wa, setWa] = useState('')
    const [address, setAddress] = useState('')
    console.log(id_customers)

    const previewSetting = async () => {
        const url = await axios.get(`/api/preview/${id_customers}`)
        const data = await url.data[0][0]
        console.log(data);
        const getAddress = await axios.get(`/api/getAddress/${data.kodepos}/${data.kelurahan}`)
        const result = await getAddress.data

        if (result.length > 0) {
            setInfoCust(result[0])
        } else {
            setInfoCust('')
        }
        setPreviewSettings(data)
    }

    useEffect(() => {
        previewSetting()
    }, [])
    const Settings = async () => {
        await axios.get('/api/settings')
            .then(res => {

                // take value from setting where key is fax
                const fax = res.data.filter(val => val.key === 'fax')
                setFax(fax[0].value)
                // take value from setting where key is email
                const email = res.data.filter(val => val.key === 'email')
                // take value from setting where key is phone
                setEmail(email[0].value)
                // take value from setting where key is phone
                const phone = res.data.filter(val => val.key === 'nomer_handphone')
                setPhone(phone[0].value)

                // take value from where key is whatsapp number
                const whatsapp = res.data.filter(val => val.key === 'whatsapp_number')
                setWa(whatsapp[0].value)

                // take value from where key is alamat
                const address = res.data.filter(val => val.key === 'alamat')
                setAddress(address[0].value)
            }
            )
    }

    useEffect(() => {
        Settings()
    }, [])

    // take value from setting where key is fax




    return (
        <>
            <div className="wrapper__xyz">
                <div className="wrapper_last">
                    <header>
                        <div className="image">
                            <img src={Logo} alt="" />
                        </div>
                        <div className="table_mm">
                            <table>
                                {/* take a value from settings where key phone */}
                                <tr>
                                    <th style={{ width: '30%' }}><AiFillPhone className="me-1" />{phone ? phone : ''} </th>
                                    <th style={{ width: '50%' }}><FaFax className="me-1" /> {fax ? fax : ''}</th>
                                    <th rowSpan={10} style={{ width: '20%' }} ><span className='table__kodecustomer' > {previewSettings.kode_customer ? previewSettings.kode_customer.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "-") : ''}  </span></th>
                                </tr>
                                <tr>
                                    <th ><RiWhatsappFill className="me-1" /> {wa ? wa : ''}</th>
                                    <th><AiTwotoneMail className="me-1" /> <span> {email ? email : ''}</span></th>
                                </tr>
                                <tr>
                                    <th colSpan={2} className="pt-1"><FaMapMarkerAlt className="me-1" />{address ? address : ''}</th>
                                </tr>
                            </table>
                        </div>
                    </header>
                    <div className="content">
                        <div className="truecontent">
                            <pre>
                                {/* <p>Kode Customer    : {previewSettings.kode_customer ? previewSettings.kode_customer : ''}</p> */}
                                <p>Kepada YTH       : {previewSettings.nama ? previewSettings.nama : ''}</p>
                                <div style={{ display: 'flex' }}>
                                    <p>Alamat       : </p><p id="alamat">{previewSettings.alamat ? previewSettings.alamat : ''} </p>
                                </div>
                                <p>Provinsi         : {infoCust.provinsi ? infoCust.provinsi : ''}</p>
                                <p>Kecamatan        : {infoCust.kecamatan ? infoCust.kecamatan : ''}</p>
                                <p>Kelurahan        : {infoCust.kelurahan ? infoCust.kelurahan : ''} - {previewSettings.kodepos ? previewSettings.kodepos : ''}</p>
                                <p>UP               : {previewSettings.pic ? previewSettings.pic : ''}</p>
                                <p>No. Telepon      : {previewSettings.phone ? previewSettings.phone : ''} , {previewSettings.mobile_phone ? previewSettings.mobile_phone : ''}</p>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-print-none m-5">
                <button onClick={() => window.print()} className="btn btn-primary btn-sm w-25">Print</button>
            </div>
        </>

        // </div>
    )
}