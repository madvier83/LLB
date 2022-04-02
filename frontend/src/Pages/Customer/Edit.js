import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";

import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Customer updated successfully", {
    duration: 6000,
    icon: '🎉',
    style: {
        backgroundColor: '#40916c',
        color: '#fff',
    }
})

export default function Edit() {
    const [kode_customer, setKode_customer] = useState('')
    const [golongan_customer, setGolonganCustomer] = useState('')
    const [nama, setNama] = useState('')
    const [alamat_customer, setAlamatCustomer] = useState('')
    const [kodeposcustomer, setkodeposcustomer] = useState('')
    const [kodeposcustomer2, setKodeposcustomer2] = useState([])
    const [handleChange, setHandleChange] = useState('')
    const [kelurahan, setKelurahan] = useState([])
    const [piccustomer, setpiccustomer] = useState('')
    const [phone, setPhone] = useState('')
    const [mobilePhone, setMobilePhone] = useState('')
    const [fax, setFax] = useState('')
    const [alamat_kirim, setAlamatkirim] = useState('')
    const [kodeposkirim, setkodeposkirim] = useState('')
    const [kodeposkirim2, setKodeposkirim2] = useState([])
    const [kelurahankirim, setKelurahanKirim] = useState([])
    const [handleChange2, setHandleChange2] = useState('')
    const [customer, setCustomer] = useState('')
    const [pickirim, setpickirim] = useState('')
    const [telpkirim, settelpkirim] = useState('')
    const [matchkel, setMatchkel] = useState('')
    const [matchkel2, setMatchkel2] = useState('')


    const { id } = useParams()
    const navigate = useNavigate()

    const getCustId = async () => {
        const response = await axios.get(`/api/customers/${id}`)
        const data = await response.data

        setKode_customer(data.kode_customer)
        setGolonganCustomer(data.golongan_customer)
        setNama(data.nama)
        setAlamatCustomer(data.alamat_customer)
        setkodeposcustomer(data.kodepos_customer)
        setpiccustomer(data.pic_customer)
        setPhone(data.phone)
        setMobilePhone(data.mobile_phone)
        setFax(data.fax)
        setAlamatkirim(data.alamat_kirim)
        setCustomer(data.customer)
        setpickirim(data.pic_kirim)
        settelpkirim(data.telp_kirim)
        setkodeposkirim(data.kodepos_kirim)
        setMatchkel(data.kelurahan_customer)
        setMatchkel2(data.kelurahan_kirim)
    }

    function Select(props) {
        if (matchkel === "") {
            return (
                <Form.Select aria-label="Default select example">
                    <option selected disabled >choose kelurahan</option>
                    {
                        props.kelurahan.map((value, index) => {
                            return <option key={index} value={value.kelurahan} >{value.kelurahan}</option>
                        })
                    }
                </Form.Select>
            )
        } else {
            return (
                <Form.Select aria-label="Default select example">
                    <option disabled >choose kelurahan</option>
                    <option selected value={props.matchkel} >{props.matchkel}</option>
                    {
                        props.kelurahan.filter(function(array_el){
                               return props.matchkel != array_el.kelurahan;
                         }).map((value, index) => {
                            return <option key={index} value={value.kelurahan} >{value.kelurahan}</option>
                        })
                    }
                </Form.Select>
            )
        }
    }

    const change = async (kodepos) => {
        if (kodepos === '') {
            return setKodeposcustomer2([])
        } else {
            await axios.get('/api/getAddress/' + kodepos)
                .then(data => {
                    const dt = data.data
                    if (dt.length === 0) {
                        return setKodeposcustomer2([])
                    } else {
                        return dt.filter(kodepost => kodepost.kodepos === kodepos).map(value => setKodeposcustomer2(value))
                    }
                })
        }
    }
    
    const changeKirim = async (kodepos) => {
        if (kodepos === '') {
            return setKodeposkirim2([])
        } else {
            await axios.get(`/api/getAddress/${kodepos}`)
                .then(data => {
                    const dt = data.data
                    if (dt.length === 0) {
                        return setKodeposkirim2([])
                    } else {
                        return dt.filter(kodepost => kodepost.kodepos === kodepos).map(value => setKodeposkirim2(value))
                    }
                })
        }
    }


    useEffect(() => {
        const getKelurahan = async () => {
            try {
                await axios.get(`/api/getKelurahan/${kodeposcustomer}`)
                    .then(data => {
                        setKelurahan(data.data)
                    })
            } catch (error) {
                console.log('Masukan kodepos')
            }
        }
        getKelurahan()

    }, [kodeposcustomer])

    useEffect(() => {
        const getkelurahan = async () => {
            try {
                await axios.get(`/api/getKelurahan/${kodeposkirim}`)
                    .then(data => {
                        setKelurahanKirim(data.data)
                    })
            } catch (error) {

            }
        }

        getkelurahan()
    }, [kodeposkirim])

    useEffect(() => {
        getCustId()
    }, [])

    useEffect(() => {
        const fetchAddress = async () => {
            await axios.get('/api/getAddress')
                .then(data => {
                    const dt = data.data
                    dt.filter(kodepost => kodepost.kodepos === kodeposcustomer).map(value => setKodeposcustomer2(value))
                })
        }
        fetchAddress()
    }, [kodeposcustomer])

    useEffect(() => {
        const fetchAddress = async () => {
            await axios.get('/api/getAddress')
                .then(data => {
                    const dt = data.data
                    dt.filter(kodepost => kodepost.kodepos === kodeposkirim).map(value => setKodeposkirim2(value))
                })
        }
        fetchAddress()
    }, [kodeposkirim])


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/customers/${id}`, {
            kodecustomer: kode_customer,
            golongancustomer: golongan_customer,
            name: nama,
            alamatcustomer: alamat_customer,
            kodepposcustomer: kodeposcustomer,
            piccustomer: piccustomer,
            phone: phone,
            kelurahancustomer: handleChange,
            mobile_phone: mobilePhone,
            fax: fax,
            alamatkirim: alamat_kirim,
            kodeposkirim: kodeposkirim,
            kelurahankirim: handleChange2,
            pickirim: pickirim,
            customer: customer,
            telp_kirim: telpkirim,
        })
            .then(() => {
                navigate('/customer')
            })
    }
    return (
        <>
            <Header />
            <div className="wrapper d-print-none">
                <Sidebar />
                <main>
                    <Form className="mb-5" onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Kode Customer</Form.Label>
                            <Form.Control type="text" value={kode_customer} onChange={(e) => setKode_customer(e.target.value)} placeholder="Masukan Kode Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Golongan Customer</Form.Label>
                            <Form.Control type="text" value={golongan_customer} onChange={(e) => setGolonganCustomer(e.target.value)} placeholder="Masukan Golongan Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Nama</Form.Group>
                            <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukan Nama Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Alamat</Form.Group>
                            <Form.Control as="textarea" rows={3} value={alamat_customer} onChange={(e) => setAlamatCustomer(e.target.value)} placeholder="Masukan Alamat Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Kode Pos</Form.Group>
                            <Form.Control type="number" value={kodeposcustomer} onChange={(e) => { change(e.target.value); setkodeposcustomer(e.target.value); setMatchkel("") }
                            } placeholder="Masukan Kode POS" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposcustomer2.provinsi ? kodeposcustomer2.provinsi : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposcustomer2.kabupaten ? kodeposcustomer2.kabupaten : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposcustomer2.kecamatan ? kodeposcustomer2.kecamatan : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kelurahan</Form.Label>
                            <Select kelurahan={kelurahan} onChange={(e) => setHandleChange(e.target.value)} matchkel={matchkel}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Pic Customer</Form.Group>
                            <Form.Control type="text" value={piccustomer} onChange={(e) => setpiccustomer(e.target.value)} placeholder="Masukan PIC Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Phone</Form.Group>
                            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Masukan Nomer Telephone" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Mobile Phone</Form.Group>
                            <Form.Control type="text" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} placeholder="Masukan Mobile Phone" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Fax</Form.Group>
                            <Form.Control type="number" value={fax} onChange={(e) => setFax(e.target.value)} placeholder="Masukan Fax" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Alamat Kirim</Form.Group>
                            <Form.Control as="textarea" rows={3} value={alamat_kirim} onChange={(e) => setAlamatkirim(e.target.value)} placeholder="Masukan Alamat Kirim" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Kode Pos Kirim</Form.Group>
                            <Form.Control type="number" value={kodeposkirim} onChange={(e) => { changeKirim(e.target.value); setkodeposkirim(e.target.value) }} placeholder="Masukan Kode POS" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposkirim2.provinsi ? kodeposkirim2.provinsi : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposkirim2.kabupaten ? kodeposkirim2.kabupaten : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposkirim2.kecamatan ? kodeposkirim2.kecamatan : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kelurahan</Form.Label>
                            <Select kelurahan={kelurahankirim} onChange={(e) => setHandleChange2(e.target.value)} matchkel={matchkel2}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Pic kirim</Form.Group>
                            <Form.Control type="text" value={pickirim} onChange={(e) => setpickirim(e.target.value)} placeholder="Masukan PIC Kirim" />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Group>Customer</Form.Group>
                            <Form.Control type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Masukan PIC Kirim" />
                        </Form.Group> */}
                        <Form.Group className="mb-3">
                            <Form.Group>Telp Kirim</Form.Group>
                            <Form.Control type="text" value={telpkirim} onChange={(e) => settelpkirim(e.target.value)} placeholder="Masukan PIC Kirim" />
                        </Form.Group>

                        <Button onClick={notify} variant="primary" type="submit">Submit</Button>
                    </Form>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                </main>
            </div>

        </>
    )
}