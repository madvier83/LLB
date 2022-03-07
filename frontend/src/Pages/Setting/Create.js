import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdSaveAlt } from 'react-icons/md'
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
const keySetting = [
    {
        "id": 1,
        "key": "number",
        "value": "nomer_handphone"
    },
    {
        "id": 2,
        "key": "number",
        "value": "fax"
    },
    {
        "id": 3,
        "key": "number",
        "value": "whatsapp_number",
    },
    {
        "id": 4,
        "key": "text",
        "value": "email"
    },
    {
        "id": 5,
        "key": "text",
        "value": "alamat"
    }
]



export default function Create() {
    //state
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    let navigate = useNavigate();
    const storePost = async (e) => {
        e.preventDefault();
        await axios.post('/api/settings', {
            key: key,
            value: value
        })
            .then(() => {
                setTimeout(() => {
                    navigate("/settings")
                }, 4000)
            })

    }


    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <Form onSubmit={storePost} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>TITLE</Form.Label>

                        <Form.Select aria-label="Default select example" onChange={(e) => setKey(e.target.value)} required>
                            <option>Open this select menu</option>
                            {keySetting.map((value, index) => {
                                return <option value={value.value} key={index} >{value.value}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>CONTENT</Form.Label>
                        <Form.Control type="text" value={value} required onChange={(e) => setValue(e.target.value)} placeholder="Masukkan Title" />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={notify}>
                        < MdSaveAlt className="me-2 fs-5 " />   Save
                    </Button>
                </Form>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </main>
        </>
    )
}