import { Outlet, useLocation } from "react-router-dom"
import React from "react"

// Components
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AlertView from "../../core/views/CAlertView"

interface LayoutViewProps {
    className?: string
}

const LayoutView: React.FC<LayoutViewProps> = ({ className }) => {
    const location = useLocation()

    // Check if the current path ends with a slash
    const shouldHideNavbar = location.pathname.endsWith("/")

    return (
        <>
            <div
                className={`${className} z-0 w-screen h-screen flex flex-col justify-between`}
            >
                <div className="flex h-full">
                    {!shouldHideNavbar && <Navbar isHorizontal={false} />}
                    <div
                        className={`
                            mx-auto px-[3.8%] w-full h-full
                            ${!shouldHideNavbar ? "py-12" : ""}
                        `}
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
            <AlertView />
        </>
    )
}

export default LayoutView
