import React, { useState } from "react"
import '../Auth/Auth.css'
import axios from 'axios'
import Logo from '../../Assets/Logo/label.png'
import toast, { Toaster } from 'react-hot-toast'

const notify = () => toast.success("Login Success", {
    duration: 6000,
    icon: '🎉',
    style: {
        backgroundColor: '#40916c',
        color: '#fff',
    }
})

export default function Auth() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState([])
    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData()

        formData.append("username", username)
        formData.append("password", password)

        await axios.post("/api/login", formData)
            .then((response) => {
                try {
                    if (username === "" && password === "") {
                        setError(response.data)
                    } else {
                        setTimeout(() => {
                            localStorage.setItem('token', response.data.id)
                            window.location.href = '/customer'
                        }, 4000);

                    }
                } catch (error) {
                    console.log(error.message)
                }
            })
    }

    return (
        <>
            <div className="container mt-5">
                {
                    error.message && (
                        <div className="alert alert-danger" role="alert">
                            {error.message}
                        </div>

                    )
                }
            </div>
            <div className="container custommt">
                <img src={Logo} className="d-block mx-auto mb-5" alt="Logo" />
                <form className="w-100 d-flex align-items-center justify-content-center flex-column" onSubmit={handleLogin}>
                    <div className="mb-3 w-50">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="text" className="form-control w-100" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3 w-50">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control w-100" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button onClick={notify} type="submit" className="btn btn-primary w-50">Login</button>
                </form>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <p className="text-center mt-4">Developed By <a href="https://www.cursor.id/" className="text-primary ">Cursor ID</a></p>
            </div>
        </>
    )
}