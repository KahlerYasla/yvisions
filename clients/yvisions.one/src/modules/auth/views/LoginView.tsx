import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Components
import CButton from "../../core/components/CButton"
import { CInputField, CLogoSection } from "../../core"

// Stores
import { useLayout } from "../../layout/hooks/useLayout"

interface LoginViewProps {
    className?: string
}

const LoginView: React.FC<LoginViewProps> = ({ className }) => {
    // States --------------------------------------------------------------------
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const addAlert = useLayout((state) => state.addAlert)

    // Hooks --------------------------------------------------------------------
    const navigate = useNavigate() // Use navigate for redirection

    // Handlers --------------------------------------------------------------------
    const handleLogin = useCallback(() => {
        if (username === "" || password === "") {
            addAlert({
                id: new Date().getTime().toString(),
                message: "Please fill in all fields",
                onClose: (id: number) => {},
                type: "error",
            })
            return
        }

        if (username !== "admin" || password !== "admin") {
            addAlert({
                id: new Date().getTime().toString(),
                message: "Invalid username or password",
                onClose: (id: number) => {},
                type: "error",
            })
            return
        }

        // Redirect to dashboard using navigate
        addAlert({
            id: new Date().getTime().toString(),
            message: "Login successful",
            onClose: (id: number) => {},
            type: "success",
        })
        navigate("/home") // Redirect to dashboard
    }, [username, password, addAlert, navigate])

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Enter") handleLogin()
        },
        [handleLogin]
    )

    // Effects --------------------------------------------------------------------
    useEffect(() => {
        // Add event listener for "Enter" key press
        window.addEventListener("keydown", handleKeyPress)

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress])

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <div className="flex md:grid md:grid-cols-2 w-screen h-screen z-10">
                <div className="flex flex-col w-full min-w-96 px-10 pt-10 justify-center gap-16 items-center pb-60 z-20">
                    <div className="flex items-center">
                        <CLogoSection />
                    </div>
                    <p className="text-gray-600">
                        Focus on Objectives, gain Key-Results
                    </p>
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome back!
                    </h1>
                    <div className="flex flex-col gap-6 w-full max-w-96">
                        <div>
                            <CInputField
                                label="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <CInputField
                                label="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 w-full max-w-96">
                        <CButton onClick={handleLogin} className="w-full">
                            login
                        </CButton>
                        <CButton
                            onClick={() => navigate("/register")}
                            className="w-full"
                            secondary
                        >
                            register
                        </CButton>
                    </div>
                </div>
                <img
                    className="hidden top-0 md:static md:flex bg-center grayscale-[0] object-cover w-full h-full"
                    src="/images/1.jpeg"
                    alt="Login Background"
                />
            </div>
        </div>
    )
}

export default LoginView
