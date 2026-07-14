import { Link } from "react-router";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-4">

            <h1 className="text-6xl font-bold">
                404
            </h1>

            <p>
                Page not found.
            </p>

            <Link
                to="/dashboard"
                className="btn btn-primary"
            >
                Go Home
            </Link>

        </div>
    );
}

export default NotFound;