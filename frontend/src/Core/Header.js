import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
export default function Header() {


    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-print-none">
            <div className="container">
                <h2 className="fs-3">LEMBAGA LITERATUR BAPTIS - ADMIN DASHBOARD</h2>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">

                            <button className="btn btn-danger " onClick={handleLogout}>Logout<RiLogoutBoxRLine className="ms-2" /></button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}