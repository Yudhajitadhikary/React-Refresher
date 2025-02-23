import { useContext,useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../../spinner/spinner.component';
import { selectCategoriesIsLoading } from '../../../store/categories/category.selector';
import { selectCategories } from '../../../store/categories/category.selector';
import ProductCard from '../../product-card/product-card.component';
import './category.style.scss';
// import { CategoriesContext } from '../../../contexts/products.context';
const Category = () => {
    const {category}=useParams();
    const categories=useSelector(selectCategories);
    const isLoading=useSelector(selectCategoriesIsLoading);
    const [products,setProducts]=useState(categories[category]);
    // console.log('reder/reredndering category component ')
    useEffect(()=>{
        // console.log('effect fired calling setProducts')
        setProducts(categories[category]);
    },[category,categories])
    return(
        <>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        {isLoading ? <Spinner/>:
        <div className='category-container'>
            
            {products && products.map(product=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>}
        </>
    )
}
export default Category;