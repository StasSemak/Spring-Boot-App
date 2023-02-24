import { FC } from "react";
import { Link } from "react-router-dom";

interface Props{
    name: string;
}

const Template:FC<Props> = ({name}) => {
    return (
      <>
        <div className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center mb-5">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{name}</h2>
            <p className="mt-6 text-base leading-7 text-gray-600">There's nothing right now here...</p>
          </div>
              
              <Link to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Go back home
              </Link>
              
        </div>
      </>
    )
  }
  export default Template;