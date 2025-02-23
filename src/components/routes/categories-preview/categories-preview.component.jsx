import { useContext } from "react";
import { selectCategories } from "../../../store/categories/category.selector";
// import { CategoriesContext } from "../../../contexts/products.context";
import CategoryPreview from "../../category-preview/category-preview.component";
// import ProductCard from "../../product-card/product-card.component";
import './categories-preview.styles.scss';
import { useSelector } from "react-redux";
const CategoriesPreview =()=>{ 
    // const {categories}=useContext(CategoriesContext);
    const categories=useSelector(selectCategories);
    // console.log(categories);              
return (
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
    <>
        {
            Object.keys(categories).map(category=>(
                <CategoryPreview key={category} title={category} items={categories[category]}/>
            ))
        }
        </>
)
}
export default CategoriesPreview;