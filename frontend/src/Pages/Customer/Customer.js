import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Customer/index.css"
import ReactPaginate from "react-paginate"
import { Button, Modal, Form } from "react-bootstrap";
import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Customer created successfully to Print Queue", {
    duration: 6000,
    icon: '🎉',
    style: {
        backgroundColor: '#40916c',
        color: '#fff',
    }
})
export default function Customer() {

    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    const [search, setSearch] = useState('')
    const [show, setShow] = useState(false)
    const [val, setVal] = useState({})
    const [handleChange, setHandleChange] = useState('')
    const userPerPage = 10
    const pagesVisited = pageNumber * userPerPage


    const [kodeposcustomer, setkodeposcustomer] = useState('')
    const [kodeposcustomer2, setKodeposcustomer2] = useState([])


    const [kodeposkirim, setKodeposKirim] = useState('')
    const [kodeposkirim2, setKodeposKirim2] = useState([])

    const [alamatKirim, setAlamatKirim] = useState('')

    const [qty, setQty] = useState('')


    const [picKirim, setPicKirim] = useState('')

    const [handleKelurahan, setHandleKelurahan] = useState('')
    const [kelurahan, setKelurahan] = useState([])
    const deleteCustomer = async (id) => {
        if (window.confirm("Apakah anda yakin ?")) {
            await axios.delete(`api/customers/${id}`)
        }
        getCustomers()
    }

    const getCustomers = async () => {
        await axios.get("api/customers")
            .then(res => setData(res.data))
    }
    useEffect(() => {
        getCustomers()
    }, [])

    const pageCount = Math.ceil(data.length / userPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const openQueue = async (id) => {
        console.log(id)
        const url = await axios.get(`/api/customers/${id}`)
        const data = await url.data
        if (handleChange === "alamat_customer") {
            console.log("Ini Customer")
        } else {
            console.log("ini Kirim")
        }
        console.log(data.telp_kirim)
        setVal(data)
        setAlamatKirim(data.alamat_kirim)
        setPicKirim(data.pic_kirim)
        setShow(true)
        setkodeposcustomer(data.kodepos_customer)
        setKodeposKirim(data.kodepos_kirim)
    }

    const handleClose = () => setShow(false);
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
                    dt.filter(kodepost => kodepost.kodepos === kodeposkirim).map(value => setKodeposKirim2(value))
                })
        }
        fetchAddress()
    }, [kodeposkirim])
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
    const kirim = async (kodepos) => {
        if (kodepos === '') {
            return setKodeposKirim2([])
        } else {
            await axios.get('/api/getAddress/' + kodepos)
                .then(data => {
                    const dt = data.data
                    if (dt.length === 0) {
                        return setKodeposKirim2([])
                    } else {
                        return dt.filter(kodepost => kodepost.kodepos === kodepos).map(value => setKodeposKirim2(value))
                    }
                })
        }
    }

    useEffect(() => {
        const getKelurahan = async () => {
            try {
                await axios.get(`/api/getKelurahan/${kodeposkirim}`)
                    .then(data => setKelurahan(data.data))
            } catch (error) {
                console.log('Masukan kodepos')
            }
        }
        getKelurahan()
    }, [kodeposkirim])

    const handleSubmit = async (e) => {
        console.log(val.id)
        e.preventDefault()
        await axios.post('/api/queue', {
            id: val.id,
            id_customers: val.id,
            total_print: qty,
            status: handleChange,
            alamat_kirim: alamatKirim,
            pic_kirim: picKirim,
            kodepos_kirim: kodeposkirim,
        })
            .then(() => {
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            })
            .catch(error => console.log(error.message))
    }
    return (
        <>
            <Header />
            <div className="wrapper d-print-none">
                <Sidebar />
                <main>
                    <div className="container mb-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <input type="text" className="form-control w-100 " placeholder="Enter search words, ex : kodepos" onChange={(event) => {
                                    setSearch(event.target.value)
                                }} />
                            </div>
                            <div className="col">
                                <Link to="/customers/create" className="d-inline p-2 btn btn-primary text-white float-end mx-2">Create</Link>
                            </div>
                        </div>

                        <table className="table table-striped mt-5 mb-5 w-100">
                            <thead>
                                <tr>
                                    <th scope="col">Kode Customer</th>
                                    <th scope="col">Golongan Customer</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Telp</th>
                                    <th scope="col" className="w-25">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.filter((val) => {
                                        if (search === "") {
                                            return val
                                        } else if (val.kode_customer.toLowerCase().includes(search.toLowerCase()) || val.golongan_customer.toLowerCase().includes(search.toLowerCase()) || val.nama.toLowerCase().includes(search.toLowerCase())) {
                                            return val
                                        }
                                    }).slice(pagesVisited, pagesVisited + userPerPage).map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{value.kode_customer}</th>
                                                <td>{value.golongan_customer}</td>
                                                <td className="custom">{value.nama}</td>
                                                <td className="custom">{value.phone+' - '+value.telp_kirim}</td>
                                                <td>
                                                    <Button as={Link} to={`/customer/edit/${value.id}`} className="btn btn-info btn-sm me-2">Edit</Button>
                                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteCustomer(value.id)}>Delete</button>
                                                    <Button as={Link} to={`/customer/detail/${value.id}`} variant="success" size="sm" className="me-2">Detail</Button>
                                                    <Button variant="secondary" size="sm" className="me-2" onClick={() => openQueue(value.id)}>Print Queue</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <ReactPaginate previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />

                        <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Add to Print Queue</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div>
                                            <p>Kode Customer : {val.kode_customer}</p>
                                        </div>
                                        <div>
                                            <p>Nama Customer : {val.nama}</p>
                                            {/* {
                                    val.pic_kirim ? <p>{val.pic_kirim}</p> : <input type="text" className="form-control" placeholder="Masukan PIC" />
                                } */}
                                        </div>
                                        <div className="mt-3">
                                            <Form.Select onChange={(e) => setHandleChange(e.target.value)}>
                                                <option selected disabled>Choose Address</option>
                                                <option value="alamat_customer">Alamat Customer</option>
                                                <option value="alamat_kirim">Alamat Kirim</option>
                                            </Form.Select>
                                        </div>
                                        <div className="mt-3">
                                            {handleChange === "alamat_customer" ?
                                                <>
                                                    <Form onSubmit={handleSubmit}>
                                                        <div>
                                                            <Form.Label>Alamat Customer</Form.Label>
                                                            <Form.Control readOnly as="textarea" rows={3} value={val.alamat_customer} />
                                                        </div>
                                                        <div className="mt-3">
                                                            <Form.Label>KodePos Customer</Form.Label>
                                                            <input type="text" readOnly className="form-control" disabled value={kodeposcustomer} onChange={(e) => { change(e.target.value); setkodeposcustomer(e.target.value) }} />
                                                        </div>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Provinsi Customer</Form.Label>
                                                            <Form.Control type="text" readOnly value={kodeposcustomer2.provinsi ? kodeposcustomer2.provinsi : ''} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Kota Customer</Form.Label>
                                                            <Form.Control type="text" readOnly value={kodeposcustomer2.kabupaten ? kodeposcustomer2.kabupaten : ''} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Kecamatan Customer</Form.Label>
                                                            <Form.Control type="text" readOnly value={kodeposcustomer2.kecamatan ? kodeposcustomer2.kecamatan : ''} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Kelurahan Customer</Form.Label>
                                                            <Form.Control type="text" readOnly value={kodeposcustomer2.kelurahan ? kodeposcustomer2.kelurahan : ''} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>PIC Customer</Form.Label>
                                                            <Form.Control type="text" readOnly value={val.pic_customer ? val.pic_customer : ''} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Total Print</Form.Label>
                                                            <Form.Control required type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
                                                        </Form.Group>
                                                        <button type="submit" onClick={notify} className="btn btn-primary">Save</button>
                                                    </Form>
                                                </>
                                                : handleChange === "alamat_kirim" ?
                                                    <>
                                                        <Form onSubmit={handleSubmit}>
                                                            <div>
                                                                <Form.Label>Alamat Kirim</Form.Label>
                                                                <Form.Control as="textarea" rows={3} onChange={(e) => setAlamatKirim(e.target.value)} placeholder={val.alamat_kirim ? val.alamat_kirim : null}/>
                                                            </div>
                                                            <div className="mt-3">
                                                                <Form.Label>KodePos Kirim</Form.Label>
                                                                <input type="text" className="form-control" value={kodeposkirim} onChange={(e) => { kirim(e.target.value); setKodeposKirim(e.target.value) }} />
                                                            </div>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Provinsi Kirim</Form.Label>
                                                                <Form.Control type="text" readOnly value={kodeposkirim2.provinsi ? kodeposkirim2.provinsi : ''} />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Kota Kirim</Form.Label>
                                                                <Form.Control type="text" readOnly value={kodeposkirim2.kabupaten ? kodeposkirim2.kabupaten : ''} />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Kecamatan Kirim</Form.Label>
                                                                <Form.Control type="text" readOnly value={kodeposkirim2.kecamatan ? kodeposkirim2.kecamatan : ''} />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Kecamatan Kirim</Form.Label>
                                                                <Form.Control type="text" readOnly value={kodeposkirim2.kelurahan ? kodeposkirim2.kelurahan : ''} />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>PIC Kirim</Form.Label>
                                                                <Form.Control type="text" placeholder={val.pic_kirim ? val.pic_kirim : null} onChange={(e) => setPicKirim(e.target.value)} />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Total Print</Form.Label>
                                                                <Form.Control required type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
                                                            </Form.Group>
                                                            <button type="submit" onClick={notify} className="btn btn-primary">Save</button>
                                                        </Form>
                                                    </> : ''}
                                        </div>
                                    </div>
                                </div>
                                <Toaster
                                    position="top-right"
                                    reverseOrder={false}
                                />
                            </Modal.Body>
                        </Modal>
                    </div>

                </main>
            </div>

        </>
    )
}