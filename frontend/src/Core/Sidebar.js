
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../Core/Nav.css'
export default function Sidebar() {



    return (
        <nav className="sidebar d-print-none">
            <ul className="suryono">
                <li className="rizsur">
                    <Link to="/customer">Customer</Link>
                </li>
                {/* <li className="rizsur">
                    <Link to="/print">Print</Link>
                </li> */}
                <li className="rizsur">
                    <Link to="/queues">Print Queues</Link>
                </li>
                {/* <li className="rizsur">
                    <Link to="/history/print">History Print</Link>
                </li> */}
                <li className="rizsur">
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </nav>



    )
}