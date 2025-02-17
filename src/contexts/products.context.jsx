import { createContext,useState,useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// import PRODUCTS_DATA from "../shop-data";
// import SHOP_DATA from "../shop-data";
export const CategoriesContext = createContext({
    categories:[]
});
export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState({});
    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        setCategories(categoryMap);
        
        }
        getCategoriesMap()}, []);
//     useEffect(() => {
// addCollectionAndDocuments('categories', SHOP_DATA);
//     },[])
    const value = {
        categories
    }
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};