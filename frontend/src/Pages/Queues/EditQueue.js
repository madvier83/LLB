import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import axios from "axios";
import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Setting created successfully", {
    duration: 6000,
    icon: '🎉',
    style: {
        backgroundColor: '#40916c',
        color: '#fff',
    }
})
export default function EditQueue() {
    const [totalPrint, setTotalPrint] = useState([])

    const { id } = useParams()

    const getPostById = async () => {
        const response = await axios.get(`/api/queue/${id}`)
        const data = await response.data[0]
        setTotalPrint(data)
    }

    useEffect(() => {
        getPostById()
    }, [])
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/queue/${id}`, {
            total_print: totalPrint
        })
            .then(() => {
                window.location.href = "/queues"
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <div className="container">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Total Print</Form.Label>
                            <Form.Control type="text" value={totalPrint.total_print} onChange={(e) => setTotalPrint(e.target.value)} />
                        </Form.Group>
                        <button className="btn btn-primary" type="submit" onClick={notify}>Save</button>
                    </Form>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                </div>
            </main>
        </>
    )
}