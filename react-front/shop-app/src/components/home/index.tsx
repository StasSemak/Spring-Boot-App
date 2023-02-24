import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../http";
  
interface ICategoryResponse {
  id: number;
  name: string;
  imagesPath: string[]
}

const Home = () => {
  const [categories, setCategories] = useState<ICategoryResponse[]>([]);

  useEffect(() => {
    http.get<ICategoryResponse[]>("api/categories")
        .then(res => {
          console.log(res);
          setCategories(res.data);
        })
        .catch(err => {
          console.log(err);
        })
  }, [])

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-5 lg:max-w-none lg:py-10">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {categories.map((callout) => (
              <div key={callout.name} className="group relative mb-5">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75
                  group-hover:scale-105 transition-all sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={callout.imagesPath[0]}
                    alt={callout.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-3 text-gray-900 font-semibold">
                  <Link to={callout.name}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
  
  export default Home;