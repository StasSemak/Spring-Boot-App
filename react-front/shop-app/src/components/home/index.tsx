import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import http from "../../http";
import { CategoryActionType, ICategoryItem } from "./types";

const Home = () => {
  const dispatch = useDispatch();
  const list = useSelector((store : any) => store.categories as ICategoryItem[]);

  useEffect(() => {
    http.get<ICategoryItem[]>("api/categories")
        .then(res => {
          console.log(res);
          const {data} = res;
          dispatch({type: CategoryActionType.GET_CATEGORIES, payload: data});
        })
        .catch(err => {
          console.log(err);
        })
  }, [])

  const getCategoryImage = (name: string) => {
    return `http://localhost:8080/files/${name}`;
  }

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-5 lg:max-w-none lg:py-10">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {list.map((callout) => (
              <div key={callout.name} className="group relative mb-5">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75
                  group-hover:scale-105 transition-all sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={getCategoryImage(callout.imagePath)}
                    alt={callout.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-3 text-gray-900 font-semibold">
                  <Link to={callout.name.toLowerCase()}>
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