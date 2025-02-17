import { useContext,useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../product-card/product-card.component';
import './category.style.scss';
import { CategoriesContext } from '../../../contexts/products.context';
const Category = () => {
    const {category}=useParams();
    const {categories}=useContext(CategoriesContext);
    const [products,setProducts]=useState(categories[category]);
    useEffect(()=>{
        setProducts(categories[category]);
    },[category,categories])
    return(
        <>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
            
            {products && products.map(product=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
        </>
    )
}
export default Category;