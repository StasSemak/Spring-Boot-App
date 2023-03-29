import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../env";
import http from "../../http";
import ProductListItem from "../products/productMenuItem";
import ModalDeleteDialog from "../tailwind/modals/modal";

interface CategoryProps {
  id: number;
  name: string;
  imagePath: string;
}

interface ProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

const CategoryPage:FC<CategoryProps> = ({id, name, imagePath}) => {
  const navigate = useNavigate();

  const getCategoryImage = () => {
    return `${APP_ENV.REMOTE_HOST_NAME}files/600_${imagePath}`;
  }

  const deleteHandler = (id: number) => {
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
    navigate(`/edit-category/${id}`)
  }

  const [products, setProducts] = useState<ProductItem[]>([]);
  useEffect(() => {
    http.get<ProductItem[]>(`/api/products/category/${id}`)
        .then(res => {
          console.log(res);
          setProducts(res.data);
        })
        .catch(err => {
          console.log(err);
        })
  }, [id])

  const mappedProducts = products.map((product, index) => (
    <ProductListItem key={index} name={product.name} price={product.price}
      description={product.description} imagePath={product.images[0]} id={product.id}/>
  ))

  return(
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-5 lg:max-w-none lg:py-10">

          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          <img src={getCategoryImage()} alt={name} className="mt-3 mx-auto"/>

          <div className="mt-3 flex justify-center gap-4">
            <ModalDeleteDialog id={id} type={"category"} name={name} deleteHandlerFunction={deleteHandler}/>
            <button className="bg-green-800 rounded-md p-2 hover:bg-green-700 transition-all" 
              onClick={editHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-5">Products</h3>

          {products.length > 0 ? mappedProducts : 
            <p>There's nothing here right now...</p>}

        </div>
      </div>
    </div>
  )
}

export default CategoryPage;