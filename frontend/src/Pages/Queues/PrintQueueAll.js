import { useState, useEffect } from 'react'
import axios from 'axios'
import { AiFillPhone, AiTwotoneMail } from 'react-icons/ai'
import { FaFax, FaMapMarkerAlt } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'
import Logo from '../../Assets/Logo/label.png'
import '../Print/Print.css'
export default function PrintQueueAll () {
    const [data, setData] = useState([])
    const [email, setEmail] = useState('')
    const [fax, setFax] = useState('')
    const [phone, setPhone] = useState('')
    const [wa, setWa] = useState('')
    const [address, setAddress] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [prov, setProv] = useState('')
    const [kec, setKec] = useState('')
    const [kelurahan, setKelurahan] = useState('')
    const fetchData = async () => {
        const result = await axios.get(`/api/queues`)
        setData(result.data[0])
    }

    useEffect(() => {
        const hp = async () => {
            data.map((item)=>{
                if(item.kelurahan == 'CIBEUREUM' ){setProv('Cimahi Selatan')}
                else{setProv('Margahayu Raya')}
            })
        }
        hp()
    })
    useEffect(() => {
        fetchData()
        // return () => {
        //     setData([])
        // }
    }, [])


    useEffect(() => {
        const result = () => {
            data.map((val) => {
                if (val.kelurahan === null || val.kodepos === null) {
                    alert("kodepos atau kelurahan " + val.nama + " belum diset");
                    return (window.location.href = "http://localhost:3000/customer");
                } else {
                    axios
                        .get(`/api/getAddress/${val.kodepos}/${val.kelurahan}`)
                        .then((res) => {
                            setProvinsi(res.data[0].provinsi)
                            setKecamatan(res.data[0].kecamatan)
                            setKelurahan(res.data[0].kelurahan)
                        });
                }
            });

        }
        result()
    }, [data])



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

    //   make a useEffect and then settimeout 4s and if user click yes call api print




    return (
        <>
            <div className="d-print-none m-5">
                <button onClick={() => window.print()} className="btn btn-primary btn-sm w-25">Print</button>
            </div>
            {console.log(data)}
            {data.map((val, index) => {
                const arr = []
                for (let i = val.total_print; i > 0; i--) {
                    arr.push(val)
                }
                return (
                    <>
                        {/* destruc object from setInfoCust */}
                        {arr.map(val => {
                            const { kodepos, nama, alamat, pic, kode_customer, kelurahan, phone } = val
                            return (
                                <div className="wrapper__xyz mb-5" >
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
                                                        <th rowSpan={10} style={{ width: '20%' }} ><span className='table__kodecustomer' > {kode_customer ? kode_customer.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "-") : ''}  </span></th>
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
                                        <div className='content'>
                                            <div className="truecontent">
                                                <pre>
                                                    <p>Kepada YTH  : {nama ? nama : ''}</p>
                                                    <div style={{ display: 'flex' }}>
                                                        <p>Alamat      : </p> <p id='alamat' >{alamat ? alamat : ''} </p>
                                                    </div>

                                                    <p>Provinsi    : {provinsi ? provinsi : ''}</p>
                                                    <p>Kecamatan   : {kecamatan ? kecamatan : ''}</p>
                                                    <p>Kelurahan   : {kelurahan ? kelurahan : ''} - {kodepos ? kodepos : ''}</p>
                                                    <p>UP          : {pic ? pic : ''}</p>
                                                    <p>No. Telepon : {phone ? phone : ' - '}, {val.mobile_phone ? val.mobile_phone : '-'}</p>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            )
                        })}
                    </>
                )
            })}

        </>
    )
}