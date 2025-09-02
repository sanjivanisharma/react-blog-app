import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="px-26 flex flex-col gap-2">
            <h1 className="text-3xl">Sorry, the page you were looking for was not found.</h1>
            <Link
                to="/"
                className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            >Return to home</Link>
        </div>
    )
}