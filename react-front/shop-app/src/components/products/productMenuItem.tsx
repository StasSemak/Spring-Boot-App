import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../env";

interface ListItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  imagePath: string;
}

const ProductListItem:FC<ListItemProps> = ({ id, name, price, description, imagePath}) => {
  const getProductImage = () => {
    return `${APP_ENV.REMOTE_HOST_NAME}files/300_${imagePath}`;
  }
  
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/product/${id}`)
  }

  return(
    <div className="bg-gray-300 sm:h-40 sm:mx-6 pb-4 sm:pb-0 mx-10 my-3 p-2 hover:bg-gray-200 transition-all hover:cursor-pointer" onClick={onClick}>
      <div className="flex sm:flex-row sm:items-center gap-4 flex-col">
        <img src={getProductImage()} alt={name} className="h-36 w-auto object-contain"/>
      
        <div className="flex flex-col items-start ml-4 sm:ml-0">
          <h3 className="text-xl font-bold">{name}</h3>
          <p>{description}</p>
          <p className="font-bold text-xl mt-2">{price}$</p>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem;