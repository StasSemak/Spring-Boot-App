import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { APP_ENV } from "../../env";
import http from "../../http";
import 'react-slideshow-image/dist/styles.css'
import ModalDeleteDialog from "../tailwind/modals/modal";

interface ProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

const ProductPage = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const [product, setProduct] = useState<ProductItem>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    images: []
  });

  useEffect(() => {
    http.get<ProductItem>(`api/products/${id}`)
        .then(res => {
          console.log(res);
          setProduct(res.data);
        })
        .catch(err => {
          console.log(err);
        })
  }, [id])

  const getProductImage = (imagePath : string) => {
    return `${APP_ENV.REMOTE_HOST_NAME}files/600_${imagePath}`;
  }

  const images = product.images.map((image, index) => (
    <div key={index} className="w-full">
      <img src={getProductImage(image)} alt={product.name + "-" + index}/>
    </div>
  ))

  const deleteHandler = (id: number) => {
    http.delete(`api/products/${id}`)
        .then(res => {
          console.log(res);
          navigate(-1);
        })
        .catch(err => {
          console.log(err);
        })
  }
  const editHandler = () => {
    navigate(`/edit-product/${product.id}`)
  }

  return(
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-5 lg:max-w-none lg:py-10">
          <h2 className="text-2xl font-bold">{product.name}</h2>

          <div className="slide-container mt-5 w-3/4 mx-auto">
            <Slide>
              {images}
            </Slide>
          </div>

          <div className="mt-3 flex justify-center gap-4">
            <ModalDeleteDialog id={product.id} type={"product"} name={product.name} deleteHandlerFunction={deleteHandler}/>
            <button className="bg-green-800 rounded-md p-2 hover:bg-green-700 transition-all" 
              onClick={editHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
          </div>

          <div className="mt-5">
            <div className="text-left mb-2">
              <Link to={"/" + product.category.toLowerCase()} className="text-gray-800">
                <div className="flex gap-1 items-center">
                  {product.category}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="flex gap-1 items-end mb-3">
              <p>Price:</p>
              <p className="text-xl font-bold">{product.price}$</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">Description</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default ProductPage;