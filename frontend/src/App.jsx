import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../src/Main';
import Home from '../src/Pages/Home';
import AboutUs from '../src/Pages/AboutUs';
import ContactUs from '../src/Pages/ContactUs';
import EditProduct from './Components/EditProduct/EditProduct';
import ProductCard from './Components/ProductCard/ProductCard';
import ProductForm from './Components/ProductForm/ProductForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Nested Routes under Main layout */}
        <Route path="/products" element={<Main />}>
          <Route index element={<ProductCard />} />          {/* /products */}
          <Route path="add" element={<ProductForm />} />     {/* /products/add */}
          <Route path="edit/:id" element={<EditProduct />} /> {/* /products/edit/123 */}
        </Route>

        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;