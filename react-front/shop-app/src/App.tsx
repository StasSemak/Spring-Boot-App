import './App.css';
import Navbar from './components/tailwind/navbars';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';
import Template from './components/templates/template';
import AddCategory from './components/categories/addCategory';
import { ICategoryItem } from './components/home/types';
import { useSelector } from 'react-redux';
import CategoryPage from './components/categories/categoryPage';
import EditCategory from './components/categories/editCategory';

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
        <Route path='projects' element={ <Template name="Projects"/> }/>
        <Route path='calendar' element={ <Template name="Calendar"/> }/>
        {routes}
        <Route path="edit-category" element={ <EditCategory/> }/>
        <Route path='*' element={ <Home/> }/>
      </Routes>
    </div>
  );
}

export default App;
