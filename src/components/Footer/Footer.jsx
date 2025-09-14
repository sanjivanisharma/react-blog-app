import Logo from '../Logo'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <section className="relative overflow-hidden py-5 bg-gray-900 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div>
                                <p className="text-sm text-gray-400 text-center">
                                    &copy; Copyright 2025 by Sanjivani Sharma. All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
