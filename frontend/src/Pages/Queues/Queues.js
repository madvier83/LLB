import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";
function Queues () {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])



  const deleteSettings = async (id) => {
    if (window.confirm(`Apakah anda yakin ingin menghapus ID : ${id} ?`)) {
      await axios.delete(`api/queue/${id}`)
    }
    fetchData()
  }

  const fetchData = async () => {
    const result = await axios.get(`/api/queue`)
    setData(result.data[0])
  }
  useEffect(() => {

    fetchData()
  }, [])



  return (
    <>
      <Header />
      <Sidebar />
      <main>

        <div className="container m-5">
          <div className="row">
            <div className="col-lg-6">
              <input type="text" className="form-control w-100" placeholder="Enter search words , ex : FAX " onChange={(event) => {
                setSearch(event.target.value)
              }} />
            </div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <Link className="btn btn-primary" to='/queues/printall'  >Print All</Link>
              </div>
            </div>
          </div>
          <table className="table table-striped mt-5 ">
            <thead style={{ position: 'sticky', top: '0' }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer</th>
                <th scope="col">Status</th>
                <th scope="col">Total Print</th>
                <th scope="col" className="w-25">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.filter(val => {
                  if (search === "") {
                    return val
                  } else if (val.status.toLowerCase().includes(search.toLowerCase()) || val.nama.toLowerCase().includes(search.toLowerCase())) {
                    return val
                  }
                }).map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.nama}</td>
                      <td>{value.status}</td>
                      <td>{value.total_print}</td>
                      <td>
                        <Link to={`/queues/prints/${value.id_print}`} className="btn btn-primary btn-sm mr-2 mx-2" target="_blank">Print</Link>
                        <Link to={`/queues/preview/${value.id_print}`} className="btn btn-warning btn-sm mr-2 mx-2" target="_blank">Preview</Link>
                        <button className="btn btn-danger mr-2 mx-2 btn-sm" onClick={() => deleteSettings(value.id_print)}>Delete</button>
                        <Link to={`/queues/edit/${value.id_print}`} className="btn btn-info btn-sm mr-2 mx-2">EDIT</Link>
                        {/* to={`/queues/edit/${value.id_print}`} */}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}



export default Queues