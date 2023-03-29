import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import http from "../../http";

const AddCategory = () => {
  
  const [openFileSelector, { filesContent, errors, plainFiles, clear }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false
  });
  
  if(errors.length) {
    errors.forEach(err => {
      console.log(err);
    })
  }
  
  const [name, setName] = useState<string>('');

  const mappedImages = filesContent.map((file, index) => (
    <div className="my-3" key={index}>
      <button className="mx-auto bg-gray-900 rounded-md p-1 hover:bg-gray-700 transition-all" 
        onClick={clear}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
      <div className="mt-1 h-52">
        <img src={file.content} alt={file.name} className="w-full h-full"/>
      </div>
    </div>
  ));

  const onChange = (e: any) => {
    setName(e.target.value);
  }

  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if(name === '') {
      alert("Category name can not be empty!");
      return;
    }
    if(filesContent.length === 0) {
      alert("At least one image is required!");
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('file', plainFiles[0]);

    http.post("/api/categories", data)
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
            <h2 className="text-2xl font-bold text-gray-900">Add category</h2>
            
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
                  onChange={onChange}
                  />
              </div>

              <div className="mb-3 flex flex-col items-start"> 

                <label className="block text-md font-semibold leading-6 text-gray-800 mb-1">
                  Image
                </label>

                <div className="flex flex-row gap-3 flex-wrap items-center">
                  
                  {mappedImages}

                  {filesContent.length === 0 ? 
                    <button className="bg-gray-800 rounded-md p-2 hover:bg-gray-700 transition-all" 
                      onClick={openFileSelector} type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button> 
                  : ''}

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

export default AddCategory;