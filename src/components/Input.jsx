import { useId, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

export default function Input({
    label,
    type = "text",
    ref,
    className = "",
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false)
    const id = useId()

    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type

    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <div
                className={`flex items-center pr-1 rounded-lg border border-gray-200 bg-white text-black focus-within:bg-gray-50 duration-200 ${className}`}
            >
                <input
                    id={id}
                    type={inputType}
                    ref={ref}
                    {...props}
                    className="w-full px-3 py-2 outline-none bg-transparent"
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="hover:bg-gray-200 rounded-full py-1 px-1.5 duration-200"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                )}

            </div>
        </div>
    );
}