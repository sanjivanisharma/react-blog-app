import { useState } from "react"

import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import authService from "../services/auth"

import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"

export default function LoginForm() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const login = (data) => {
        setError("")
        setLoading(true)
        authService.login(data)
            .then((userData) => {
                if (userData)
                    dispatch(authLogin({ userData }))
                navigate("/")
            })
            .catch(error => {
                setError(error.message)
                throw error
            })
            .finally(() => setLoading(false))
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="my-2">
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="text"
                            {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address."
                                }
                            })}
                        />
                        <p className="text-red-600">{errors.email?.message}</p>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "This field is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be 8 characters long."
                                }
                            })}
                        />
                        <p className="text-red-600">{errors.password?.message}</p>
                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2"
                        >Log in
                            <ClipLoader
                                color="white"
                                loading={loading}
                                size={18}
                                aria-label="Loading Spinner"
                            />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}