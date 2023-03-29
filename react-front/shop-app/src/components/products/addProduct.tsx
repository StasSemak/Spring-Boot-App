import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileContent, useFilePicker } from "use-file-picker";
import http from "../../http";

interface CategoryItem {
  id: number;
  name: string;
  imagePath: string;
}

interface ProductItem {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  images: File[];
}

const AddProduct = () => {
  const [openFileSelector, { filesContent, errors, clear, plainFiles }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true
  });
  
  if(errors.length) {
    errors.forEach(err => {
      console.log(err);
    })
  }
  
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const [product, setProduct] = useState<ProductItem>({
    name: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: []
  })

  const [allFiles, setAllFiles] = useState<FileContent[]>(filesContent);
  const [allPlainFiles, setAllPlainFiles] = useState<File[]>(plainFiles);

  useEffect(() => {
    setAllFiles((files) => files.concat(filesContent));
    setAllPlainFiles((files) => files.concat(plainFiles));
  }, [filesContent, plainFiles, clear])

  useEffect(() => {
    http.get<CategoryItem[]>("/api/categories")
        .then(res => {
          console.log(res);
          setCategories(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    clear();
  }, [clear])

  const options = categories.map((cat, index) => (
    <option key={index} value={cat.id}>{cat.name}</option>
  ));

  const mappedImages = allFiles.map((file, index) => (
    <div className="my-3" key={index}>
      <button className="mx-auto bg-gray-900 rounded-md p-1 hover:bg-gray-700 transition-all" 
        onClick={() => deleteImage(file.name)} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
      <div className="mt-1 h-52">
        <img src={file.content} alt={file.name} className="w-full h-full"/>
      </div>
    </div>
  ));

  const deleteImage = (filename : string) => {
    const tempFiles : FileContent[] = [];
    allFiles.forEach((file) => {
      if(file.name !== filename) tempFiles.push(file); 
    })
    setAllFiles(tempFiles);

    const tempPlainFiles : File[] = [];
    allPlainFiles.forEach((file) => {
      if(file.name !== filename) tempPlainFiles.push(file); 
    })
    setAllPlainFiles(tempPlainFiles);
  }

  const onChangeHandler = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(plainFiles);
    
    e.preventDefault();

    if(product.name === '') {
      alert("Product name can not be empty!");
      return;
    }
    if(product.price === 0) {
      alert("Price can not be 0!");
      return;
    }
    if(product.description === '') {
      alert("Description can not be empty!");
      return;
    }
    if(filesContent.length === 0) {
      alert("At least one image is required!");
      return;
    }

    setProduct({...product, images: plainFiles})

    http.post("/api/products", product, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
        .then(res => {
          console.log(res);
          navigate("/");
        })
        .catch(err => {
          console.log(err);
        })
  }

  return(
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-2 sm:py-5 lg:max-w-none lg:py-10">
            <h2 className="text-2xl font-bold text-gray-900">Add product</h2>
            
            <form onSubmit={submitHandler}>
              <div className="mb-3 flex flex-col items-start">
                <label htmlFor="name" className="block text-md font-semibold leading-6 text-gray-900 mb-1">
                  Name
                </label>
                <input 
                  type="text"
                  name="name"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                  onChange={onChangeHandler}
                  />
              </div>

              <div className="mb-3 flex flex-col items-start">
                <label htmlFor="price" className="block text-md font-semibold leading-6 text-gray-900 mb-1">
                  Price
                </label>
                <input 
                  type="number"
                  name="price"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                  onChange={onChangeHandler}
                  />
              </div>

              <div className="mb-3 flex flex-col items-start">
                <label htmlFor="description" className="block text-md font-semibold leading-6 text-gray-900 mb-1">
                  Description
                </label>
                <textarea 
                  name="description"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                  onChange={onChangeHandler}
                  />
              </div>

              <div className="mb-3 flex flex-col items-start">
                <label htmlFor="categoryId" className="block text-md font-semibold leading-6 text-gray-900 mb-1">
                  Category
                </label>
                <select 
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                  name="categoryId"
                  onChange={onChangeHandler}  
                  >
                  {options}
                </select>
              </div>

              <div className="mb-3 flex flex-col items-start"> 

                <label className="block text-md font-semibold leading-6 text-gray-800 mb-1">
                  Images
                </label>

                <div className="flex flex-row gap-3 flex-wrap items-center">
                  
                  {mappedImages}

                    <button className="bg-gray-800 rounded-md p-2 hover:bg-gray-700 transition-all" 
                      onClick={openFileSelector} type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button> 

                </div>

              </div>

              <button 
                type="submit" 
                className="bg-gray-800 rounded-md py-2 px-4 text-white
                  hover:bg-gray-700 transition-all"
              >
                Create
              </button>

            </form>                  
            
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct;