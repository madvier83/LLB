import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Customer/index.css"
import Logo from '../../Assets/Logo/label.png'
import ReactPaginate from "react-paginate"
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";
export default function Print() {

    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [search, setSearch] = useState('')
    const userPerPage = 10
    const pagesVisited = pageNumber * userPerPage
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [setting, setSetting] = useState([])
    const [previewSetting, setPreviewSetting] = useState()
    const [infoCust, setInfoCust] = useState([])



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

    const handleModal = async (id) => {


        const url = await axios.get(`/api/customers/${id}`)
        const data = await url.data


        const getAddress = await axios.get(`/api/getAddress/${data.kodepos_customer}/${data.kelurahan_customer}`)
        const result = await getAddress.data
        console.log(result)
        const getAddressKirim = await axios.get(`/api/getAddress/${data.kodepos_kirim}/${data.kelurahan_kirim}`)
        const resultkirim = await getAddressKirim.data
        // setData(data)
        console.log(resultkirim)
        if (result.length > 0 || resultkirim.length > 0) {

            setInfoCust(result[0])
        } else {
            setInfoCust('')

        }


        setPreviewSetting(data)
        setModalIsOpen(true)

    }

    const Settings = async () => {
        await axios.get('/api/settings')
            .then(res => setSetting(res.data))
    }

    useEffect(() => {

        Settings()
    }, [])

    return (
        <>
            <Header />
            <div className="wrapper d-print-none">
                <Sidebar />
                <main>
                    <div className="container mb-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <input type="text" className="form-control w-100 " placeholder="Masukan kata pencarian" onChange={(event) => {
                                    setSearch(event.target.value)
                                }} />
                            </div>

                        </div>
                        <table className="table table-striped mt-5 mb-5 d-print-none">
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
                                                <td className="custom">{value.phone}</td>
                                                <td>
                                                    <Link to={`/preview/${value.id}`} className="btn btn-warning btn-sm" target="_blank">Preview</Link>
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
                        {
                            modalIsOpen && <Modal show={modalIsOpen} size="xl" className="border-0" onHide={() => {
                                setModalIsOpen(false)
                            }}>
                                <Modal.Header closeButton>
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="d-print-block border-0" id="print__preview">
                                    <div className="card " >
                                        <div className="card-body" >
                                            <div >
                                                <div className="print__header">
                                                    <div className="print__logo">
                                                        <img src={Logo} className="border-0 image-logo" alt="Logo" />
                                                    </div>
                                                    <div className="print__address">
                                                        {
                                                            setting.filter(value => value.key === "alamat").map((value, index) => {
                                                                return <p className=" text-center mt-2 " key={index}>{value.value}</p>
                                                            })
                                                        }
                                                    </div>
                                                    <div className="print__seting">
                                                        {
                                                            setting.filter(value => value.key !== "alamat").map((value, index) => {
                                                                return (
                                                                    <div className="mx-4">
                                                                        <p key={index} className=" text-center" >{value.value}</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>

                                                <div className="print__content" >
                                                    <pre className="">
                                                        <p className="mt-2">{previewSetting.kode_customer}</p>
                                                        <p>KEPADA YTH : </p>
                                                        <p className="fw-bold">{previewSetting.nama} </p>
                                                        <p id="da">D/A       :  {previewSetting.alamat_customer} </p>
                                                        <p>Provinsi  :  {infoCust.provinsi ? infoCust.provinsi : ''},</p>
                                                        <p>Kecamatan :  {infoCust.kecamatan ? infoCust.kecamatan : ''},</p>
                                                        <p>Kelurahan :  {infoCust.kelurahan ? infoCust.kelurahan : ''} - {previewSetting.kodepos_customer ? previewSetting.kodepos_customer : ''}</p>
                                                        <p>UP        :  {previewSetting.pic_customer} </p>
                                                    </pre>
                                                </div>


                                            </div>


                                            {/* <div id="print">
                                <div className="d-block text-center mx-auto">
                                    <img src={Logo} className="border-0 image-logo" alt="Logo" />
                                </div>
                                {
                                    <div className="text-justify ms-2 mb-3" >
                                        <pre className="d-flex flex-column">
                                            <p className="mt-2">{previewSetting.kode_customer}</p>
                                            <p>KEPADA YTH : </p>
                                            <p className="fw-bold">{previewSetting.nama} </p>
                                            <p id="da">D/A       :  {previewSetting.alamat_customer} </p>
                                            <p>Provinsi  :  {infoCust.provinsi ? infoCust.provinsi : ''},</p>
                                            <p>Kecamatan :  {infoCust.kecamatan ? infoCust.kecamatan : ''},</p>
                                            <p>Kelurahan :  {infoCust.kelurahan ? infoCust.kelurahan : ''} - {previewSetting.kodepos_customer ? previewSetting.kodepos_customer : ''}</p>
                                            <p>UP        :  {previewSetting.pic_customer} </p>
                                        </pre>
                                    </div>
                                }
                                <div className="address ">
                                    {
                                        setting.filter(value => value.key === "alamat").map((value, index) => {
                                            return <p className=" text-center mt-2 " key={index}>{value.value}</p>
                                        })
                                    }
                                </div>
                                <div className="d-flex  justify-content-center text-setting">
                                    {
                                        setting.filter(value => value.key !== "alamat").map((value, index) => {
                                            return (
                                                <div className="mx-4">
                                                    <p key={index} className=" text-center" >{value.value}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div> */}
                                        </div>
                                    </div>
                                    <button className="btn btn-primary d-block mx-auto mt-5 d-print-none" onClick={() => {
                                        window.print()
                                    }}>Print this</button>
                                </Modal.Body>
                                <Modal.Footer>

                                </Modal.Footer>
                            </Modal>
                        }
                    </div >
                </main>
            </div>
        </>
    )
}