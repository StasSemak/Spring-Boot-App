import './App.css';
import Navbar from './components/tailwind/navbars';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/templates/notFound';
import AddCategory from './components/categories/addCategory';
import { ICategoryItem } from './components/home/types';
import { useSelector } from 'react-redux';
import CategoryPage from './components/categories/categoryPage';
import EditCategory from './components/categories/editCategory';
import ProductPage from './components/products/productPage';
import AddProduct from './components/products/addProduct';
import EditProduct from './components/products/editProduct';

function App() {
  const list = useSelector((store : any) => store.categories as ICategoryItem[]);
  const routes = list.map((item, index) => (
    <Route key={index} path={item.name.toLowerCase()} 
      element={ <CategoryPage id={item.id} name={item.name} imagePath={item.imagePath} /> }/>
  ))

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route index element={ <Home/> }/>
        <Route path="add-category" element={ <AddCategory/> }/>
        {routes}
        <Route path="edit-category/:id" element={ <EditCategory/> }/>
        <Route path="product/:id" element={ <ProductPage/> }/>
        <Route path="add-product" element={ <AddProduct/> }/>
        <Route path="edit-product/:id" element={ <EditProduct/> }/>
        <Route path='*' element={ <NotFound/> }/>
      </Routes>
    </div>
  );
}

export default App;
