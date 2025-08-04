import React, { useState } from 'react'
import idlclogo from '../../assets/idlclogo.jpg'
import useAuthStore from '../../store/useAuthStore'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useAuthStore()
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register"

        try {
            const response = await axios.post(url + endpoint, data)

            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false)
            } else {
                alert(response.data.message)
            }
        } catch (err) {
            alert("Something went wrong.")
            console.error(err)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid">
            <form
                onSubmit={onLogin}
                className="place-self-center w-[90vw] max-w-md bg-white text-gray-700 flex flex-col gap-6 p-6 rounded-xl shadow-xl transition duration-300 ease-in-out"
            >
                {/* Title & Close */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{currState}</h2>
                    <img
                        src={idlclogo}
                        alt="Close"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => setShowLogin(false)}
                    />
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-4">
                    {currState !== "Login" && (
                        <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600/90"
                        />
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600/90"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600/90"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-red-600/90 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-200 font-semibold"
                >
                    {currState === "Sign Up" ? "Create account" : "Sign In"}
                </button>

                {/* Terms */}
                <div className="flex items-start gap-2 text-sm -mt-3">
                    <input type="checkbox" required className="mt-1" />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {/* Switch State */}
                <p className="text-sm text-center">
                    {currState === "Login" ? (
                        <>
                            Create a new account?{" "}
                            <span
                                className="text-red-600 font-semibold cursor-pointer"
                                onClick={() => setCurrState("Sign Up")}
                            >
                                Click here
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span
                                className="text-red-600 font-semibold cursor-pointer"
                                onClick={() => setCurrState("Sign In")}
                            >
                                Sign In here
                            </span>
                        </>
                    )}
                </p>
            </form>
        </div>
    )
}

export default LoginPopup