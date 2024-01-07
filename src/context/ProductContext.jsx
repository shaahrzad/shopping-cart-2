import { createContext, useEffect, useState , useContext } from "react"
import api from "../services/config";


const ProductContext = createContext();

function ProductsProvider({children}) {
    const [products,setProduct] = useState([]);
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              setProduct(await api.get("/products"))
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchProducts()
    },[]);

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  )
}

const useProducts = () => {
    const products = useContext(ProductContext)
    return products;
}

const useProductDetails = (id) => {
  const products = useContext(ProductContext);
  const result = products.find((products) => products.id === id);
  return result;
}

export default ProductsProvider;
export { useProducts , useProductDetails }
