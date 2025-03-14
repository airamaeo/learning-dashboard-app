/* Acts as layout for the App */
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/> {/* This is where the routed components will render */}
            </main>
            <Footer/>
        </>
    )
}