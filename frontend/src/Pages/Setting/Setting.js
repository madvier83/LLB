import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap"
import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";
import * as XLSX from 'xlsx';



export default function Setting() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const deleteSettings = async (id) => {
        if (window.confirm("Apakah anda yakin ?")) {
            await axios.delete(`api/settings/${id}`)
        }
        fetchSettings()
    }

    const fetchSettings = async () => {
        await axios.get("api/settings")
            .then(res => setData(res.data))
    }

    const renderFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'binary' })
            const first_sheet_name = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[first_sheet_name]
            const data_json = XLSX.utils.sheet_to_json(worksheet)

            axios.post("/api/import", {
                upload: data_json
            })
                .then(() => {
                    console.log('success')
                })
                .catch((res) => {
                    console.log(res)
                })
        }
        reader.readAsBinaryString(file)
    }

    useEffect(() => {
        fetchSettings()
    }, [])



    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <input type="text" className="form-control w-100" placeholder="Enter search words , ex : FAX " onChange={(event) => {
                                setSearch(event.target.value)
                            }} />
                        </div>
                        <div className="col">
                            <Link className="btn btn-primary float-end" to="create">Create</Link>

                        </div>
                    </div>

                    {/* <input type="text" className="form-control float-end w-25 mx-2 mb-5" value={filter} placeholder="Masukan kata pencarian" onChange={e => setFilter(e.target.value)} /> */}
                    <table className="table table-striped mt-5 ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Value</th>
                                <th scope="col" style={{ width: '150px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.filter((val) => {
                                    if (search === "") {
                                        return val
                                    } else if (val.key.toLowerCase().includes(search.toLowerCase()) || val.value.toLowerCase().includes(search.toLowerCase())) {
                                        return val
                                    }
                                }).map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.key.toUpperCase()}</td>
                                            <td>{value.value.toUpperCase()}</td>
                                            <td>
                                                <button className="btn btn-danger  btn-sm" onClick={() => deleteSettings(value.id)}>Delete</button>
                                                <Button as={Link} to={`/settings/edit/${value.id}`} variant="primary" size="sm" className="me-2">EDIT</Button>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div >
                <hr className="mt-5" />
                <div className="container">
                    <h3>Upload Data Customer</h3>
                    <input type="file" className="bg-success p-2 text-white float-end" onChange={(e) => {
                        const file = e.target.files[0]
                        renderFile(file)
                    }} />
                </div>
            </main>
        </>
    )
}
