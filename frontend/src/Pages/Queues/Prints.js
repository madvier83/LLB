import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AiFillPhone, AiTwotoneMail } from 'react-icons/ai'
import { FaFax, FaMapMarkerAlt } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'
import Logo from '../../Assets/Logo/label.png'
import '../Print/Print.css'
const Prints = () => {
    const { id_customers } = useParams()
    const [fax, setFax] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [wa, setWa] = useState('')
    const [address, setAddress] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            const url = await axios.get(`/api/preview/${id_customers}`)
            const data = await url.data[0]
            // console.log(data)
            // const getAddress = await axios.get(`/api/getAddress/${data.kodepos}/${data.kelurahan}`)
            // const result = await getAddress.data
            // console.log(result)
            setData(data)
        }
        getData()
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
    return (
        <>
            <div>Prints</div>
            <div className="d-print-none m-5">
                <button onClick={() => window.print()} className="btn btn-primary btn-sm w-25">Print</button>
            </div>
            {data.map((val) => {
                const arr = []
                for (let i = val.total_print; i > 0; i--) {
                    arr.push(val)
                }
                return (
                    <>
                        {arr.map((item) => {
                            return (
                                <div className='wrapper__xyz mb-5'>
                                    <div className="wrapper_">
                                        <header>
                                            <div className="image">
                                                <img src={Logo} alt="" />
                                            </div>
                                            <div className="table_mm">
                                                <table>
                                                    <tr>
                                                        <th style={{ width: '30%' }}><AiFillPhone className="me-1" />{phone ? phone : ''} </th>
                                                        <th style={{ width: '50%' }}><FaFax className="me-1" /> {fax ? fax : ''}</th>
                                                        <th rowSpan={10} style={{ width: '20%' }} ><span className='table__kodecustomer' > {item.kode_customer ? item.kode_customer.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "-") : ''}  </span></th>
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
                                                    <p>Kepada YTH   : {item.nama}</p>
                                                    <div style={{ display: 'flex' }}>
                                                        <p>Alamat      : </p> <p id='alamat' >{item.alamat ? item.alamat : ''} </p>
                                                    </div>
                                                    <p>Provinsi    : {item.provinsi ? item.provinsi : ''}</p>
                                                    <p>Kecamatan   : {item.kecamatan ? item.kecamatan : ''}</p>
                                                    <p>Kelurahan   : {item.kelurahan ? item.kelurahan : ''} - {item.kodepos ? item.kodepos : ''}</p>
                                                    <p>UP          : {item.pic ? item.pic : ''}</p>
                                                    <p>No. Telepon : {item.phone ? item.phone : ' - '}, {item.mobile_phone ? item.mobile_phone : '-'}</p>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                )
            })}
        </>
    )
}

export default Prints