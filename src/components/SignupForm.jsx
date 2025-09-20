import { useState } from "react"

import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import authService from "../services/auth"

import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"

export default function SignupForm() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const signup = (data) => {
        setError("")
        setLoading(true)
        authService.createAccount(data)
            .then((accountData) => {
                authService.login(data)
                    .then((userData) => {
                        if (userData) {
                            authService
                                .getCurrentUser()
                                .then((account) => {
                                    if (account) {
                                        dispatch(authLogin({ userData: account }))
                                        navigate("/")
                                    }
                                })
                        }
                    })
            })
            .catch(error => {
                setError(error.message)
                throw error
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg rounded-xl p-10 border bg-white`} style={{ borderColor: 'var(--border-color)' }}>
                <h2 className="text-center text-2xl font-extrabold leading-tight">Sign up</h2>
                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signup)} className="my-5">
                    <div className='space-y-5'>
                        <Input
                            label="Username"
                            placeholder="Enter your username"
                            {...register("name", {
                                required: "This field is required"
                            })}
                        />
                        <p className="text-red-600">{errors.name?.message}</p>
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
                            className="w-full flex items-center justify-center gap-2">
                            Create Account
                            <ClipLoader
                                color="white"
                                loading={loading}
                                size={18}
                                aria-label="Loading Spinner"
                            />
                        </Button>
                    </div>
                </form>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}