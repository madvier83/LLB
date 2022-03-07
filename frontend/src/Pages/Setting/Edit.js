import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import Header from "../../Core/Header";
import Sidebar from "../../Core/Sidebar";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Setting updated successfully", {
    duration: 6000,
    icon: '🎉',
    style: {
        backgroundColor: '#40916c',
        color: '#fff',
    }
})
export default function Edit() {

    //   State 
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')

    const history = useNavigate();

    const { id } = useParams()

    useEffect(() => {
        getPostById();
    }, [])

    const getPostById = async () => {
        const response = await axios.get(`/api/settings/${id}`)
        console.log(response)
        const data = await response.data

        setKey(data.key)
        setValue(data.value)
    }


    const updatePost = async (e) => {
        e.preventDefault();
        await axios.put(`/api/settings/${id}`, {
            key: key,
            value: value
        })
            .then(() => {
                setTimeout(() => {
                    history("/settings")
                }, 4000)

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
                    <Form onSubmit={updatePost} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>TITLE</Form.Label>
                            <Form.Control type="text" value={key} disabled onChange={(e) => setKey(e.target.value)} placeholder="Masukkan Title" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>CONTENT</Form.Label>
                            <Form.Control type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Masukkan Title" />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={notify}>
                            SIMPAN
                        </Button>
                    </Form>
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </main>
        </>
    )
}


