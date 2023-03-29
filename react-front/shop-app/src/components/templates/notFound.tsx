import { Link } from "react-router-dom";


const NotFound = () => {
    return (
      <>
        <div className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center mb-5">
            <p className="text-2xl font-semibold text-gray-800">404</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found!</h2>
            <p className="mt-6 text-base leading-7 text-gray-600">Seems like you missed correct url...</p>
          </div>
              
              <Link to="/"
                className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                Go back home
              </Link>
              
        </div>
      </>
    )
  }
  export default NotFound;