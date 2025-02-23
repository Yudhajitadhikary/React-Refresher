// import { useContext } from "react";
// import { CategoriesContext } from "../../../contexts/products.context";
// import CategoryPreview from "../../category-preview/category-preview.component";
// import ProductCard from "../../product-card/product-card.component";
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './shop.styles.scss';
import { useDispatch } from 'react-redux';
import { fetchCategoriesStart } from '../../../store/categories/category.action';
// import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category  from '../category/category.component';
const Shop =()=>{ 
    const dispatch=useDispatch();
     useEffect(() => {
            dispatch(fetchCategoriesStart());
            // dispatch(fetchCategoriesAsync());
            
            }, []);
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