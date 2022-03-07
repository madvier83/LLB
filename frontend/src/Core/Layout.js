import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../Core/Layout.css'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="wrapper d-print-none">
                <Sidebar />
                <main>{children}</main>
            </div>
        </>
    )
}