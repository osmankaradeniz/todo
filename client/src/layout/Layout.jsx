import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function Layout() {
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Outlet />
            </main>
        </div>
    )
}
