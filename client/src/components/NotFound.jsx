import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-9xl font-extrabold text-white">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-300 mt-2 mb-8 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
