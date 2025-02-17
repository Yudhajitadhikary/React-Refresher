// import { useContext } from "react";
// import { CategoriesContext } from "../../../contexts/products.context";
// import CategoryPreview from "../../category-preview/category-preview.component";
// import ProductCard from "../../product-card/product-card.component";
import { Routes, Route } from 'react-router-dom';

import './shop.styles.scss';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category  from '../category/category.component';
const Shop =()=>{ 
    // const {categories}=useContext(CategoriesContext);
    // console.log(categories);              
return (
    <Routes>
        <Route index element={
            <CategoriesPreview/>
        }/>
        <Route path=':category' element={<Category/>}/>
    </Routes>
    // <>
    // {
    //     Object.keys(categories).map(category=>(
    //         <>
    //         <h1>{category}</h1>
    //         <div className="products-container">
    //             {categories[category].map(product=>(
    //                 <ProductCard key={product.id} product={product}/>
    //             ))}
    //         </div>
    //         </>
    //     ))
        
    // }
    // </>
    
)
}
export default Shop;