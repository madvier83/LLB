import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import axios from "axios";
export default function History() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/history')
                .then(data => {
                    const date = moment(startDate)
                    const date2 = moment(endDate)
                    const datas = data.data.filter((data1) => new Date(data1.tanggal_print) > date && new Date(data1.tanggal_print) < date2)
                    setData(datas)
                })
        }
        fetchData()
    }, [startDate, endDate])



    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-12">
                    <h3>Tanggal Dimulai</h3>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className="col-lg-6 col-12">
                    <h3>Tanggal Berakhir</h3>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
            </div>

            <table className="table table-striped mt-5 mb-5">
                <thead>
                    <tr>
                        <th>Nomer</th>
                        <th>Nama </th>
                        <th scope="col">Tanggal Print</th>
                        <th scope="col">Total Print</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        data.map((value, index) => {

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value.nama}</td>
                                    <td>{moment(value.tanggal_print).format("MMMM Do YYYY")}</td>
                                    <td>{value.total_print.toLocaleString()}</td>
                                </tr>
                            )


                        })


                    }
                </tbody>
            </table>
        </>
    )
}