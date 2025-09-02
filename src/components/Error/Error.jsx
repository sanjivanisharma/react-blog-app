import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError()
    console.log(error)

    return (
        <h1>Error occurred!</h1>
    )
}