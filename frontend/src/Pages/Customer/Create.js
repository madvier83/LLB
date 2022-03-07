import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdSaveAlt } from 'react-icons/md'
import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Customer Created Successfully", {
    duration: 6000,
    icon: '🎉',
    style: {
        backgroundColor: '#40916c',
        color: '#fff',
    }
});



function CreateCustomer() {

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
        const fetchAddress2 = async () => {
            await axios.get('/api/getAddress')
                .then(data => {
                    const dt = data.data
                    dt.filter(kodepost => kodepost.kodepos === kodeposkirim).map(value => setKodeposkirim2(value))
                })
        }
        fetchAddress2()
    }, [kodeposkirim])


    useEffect(() => {
        const getKelurahan = async () => {
            try {
                await axios.get(`/api/getKelurahan/${kodeposcustomer}`)
                    .then(data => setKelurahan(data.data))
            } catch (error) {
                console.log('Masukan kodepos')
            }
        }
        getKelurahan()

    }, [kodeposcustomer])

    useEffect(() => {
        const getKelurahanKirim = async () => {
            try {
                await axios.get(`/api/getKelurahan/${kodeposkirim}`)
                    .then(data => setKelurahanKirim(data.data))
            } catch (error) {
                console.log(error)
            }
        }
        getKelurahanKirim()
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('/api/customers', {
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
                setTimeout(() => {
                    navigate('/customer')
                }, 7000)
            })
    }

    return (
        <>
            <Header />
            <div className="wrapper d-print-none">
                <Sidebar />
                <main>
                    <Form className="mb-5" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Kode Customer</Form.Label>
                            <Form.Control type="text" value={kode_customer} onChange={(e) => setKode_customer(e.target.value)} placeholder="Masukan Kode Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Golongan Customer</Form.Label>
                            <Form.Control type="text" value={golongan_customer} onChange={(e) => setGolonganCustomer(e.target.value)} placeholder="Masukan Golongan Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Nama Customer</Form.Group>
                            <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukan Nama Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Alamat Customer</Form.Group>
                            <Form.Control as="textarea" rows={3} value={alamat_customer} onChange={(e) => setAlamatCustomer(e.target.value)} placeholder="Masukan Alamat Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Kode Pos Customer</Form.Group>
                            <Form.Control type="number" maxLength={10} value={kodeposcustomer} onChange={(e) => setkodeposcustomer(e.target.value)} placeholder="Masukan Kode POS" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Provinsi Customer</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposcustomer2.provinsi} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kota Customer</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposcustomer2.kabupaten} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kecamatan Customer</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposcustomer2.kecamatan} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kelurahan Customer</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setHandleChange(e.target.value)}>
                                <option>Open this select menu</option>
                                {
                                    kelurahan.map((value, index) => {
                                        return <option key={index} value={value.kelurahan}>{value.kelurahan}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Pic Customer</Form.Group>
                            <Form.Control type="text" value={piccustomer} onChange={(e) => setpiccustomer(e.target.value)} placeholder="Masukan PIC Customer" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Phone Customer</Form.Group>
                            <Form.Control type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Masukan Nomer Telephone" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Mobile Phone Customer</Form.Group>
                            <Form.Control type="number" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} placeholder="Masukan Mobile Phone" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Fax Customer</Form.Group>
                            <Form.Control type="number" value={fax} onChange={(e) => setFax(e.target.value)} placeholder="Masukan Fax" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Alamat Kirim</Form.Group>
                            <Form.Control as="textarea" rows={3} value={alamat_kirim} onChange={(e) => setAlamatkirim(e.target.value)} placeholder="Masukan Alamat Kirim" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group>Kode Pos Kirim</Form.Group>
                            <Form.Control type="number" value={kodeposkirim} maxLength={10} onChange={(e) => setkodeposkirim(e.target.value)} placeholder="Masukan Kode POS" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Provinsi Kirim</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposkirim2.provinsi} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kota Kirim</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposkirim2.kabupaten} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kecamatan Kirim</Form.Label>
                            <Form.Control type="text" readOnly value={kodeposkirim2.kecamatan} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kelurahan Kirim</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setHandleChange2(e.target.value)}>
                                <option>Open this select menu</option>
                                {
                                    kelurahankirim.map((value, index) => {
                                        return <option key={index} value={value.kelurahan}>{value.kelurahan}</option>
                                    })
                                }
                            </Form.Select>
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
                            <Form.Group>Phone Kirim</Form.Group>
                            <Form.Control type="text" value={telpkirim} onChange={(e) => settelpkirim(e.target.value)} placeholder="Masukan PIC Kirim" />
                        </Form.Group>

                        <Button onClick={notify} variant="primary" type="submit"><MdSaveAlt className="me-2 fs-5 " />Save</Button>
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


export default CreateCustomer;

