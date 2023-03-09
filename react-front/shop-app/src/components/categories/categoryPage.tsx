import { FC } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../http";

interface CategoryProps {
  id: number;
  name: string;
  imagePath: string;
}

const CategoryPage:FC<CategoryProps> = ({id, name, imagePath}) => {
  const navigate = useNavigate();

  const getCategoryImage = () => {
    return `http://localhost:8080/files/${imagePath}`;
  }

  const deleteHandler = () => {
    if(!window.confirm(`You surely want to delete category "${name}"?`)) return;

    http.delete(`/api/categories/${id}`)
        .then(res => {
          console.log(res);
          navigate("/");
        })
        .catch(err => {
          console.log(err);
        });
  }

  const editHandler = () => {
    navigate(`/edit-category?id=${id}`)
  }

  return(
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-5 lg:max-w-none lg:py-10">

          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          <img src={getCategoryImage()} className="mt-3 h-80 mx-auto"/>

          <div className="mt-3 flex justify-center gap-4">
            <button className="bg-red-800 rounded-md p-2 hover:bg-red-700 transition-all" 
              onClick={deleteHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
            <button className="bg-green-800 rounded-md p-2 hover:bg-green-700 transition-all" 
              onClick={editHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage;