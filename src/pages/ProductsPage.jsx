import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import Sidebar from '../components/Sidebar';
import SearchBox from '../components/SearchBox';
import Card from "../components/Card";
import Loader from "../components/Loader";
import { fetchProducts } from '../features/product/productSlice';

import {filterProducts, getInitialQuery, searchProducts } from '../helper/helper';

import Styles from "./ProductsPages.module.css"


function ProductsPage() {
  const dispatch = useDispatch();
  const {products,loading} = useSelector((store)=> store.product);

  const [displayed,setDisplayed] = useState([])
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState({});

  const [searchParams,setSearchParams] = useSearchParams();

  useEffect(()=> {
    dispatch(fetchProducts())
  },[])

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams))
  },[products])

  useEffect(() => {
    setSearchParams(query)
    setSearch(query.search || "")

    let finalProducts = searchProducts(products,query.search);
    finalProducts = filterProducts(finalProducts,query.category);
    setDisplayed(finalProducts)
  },[query])

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery}/>
      <div className={Styles.container}>
        <div className={Styles.products}>
          {loading && <Loader/>}
          {displayed.map((p) => <Card key={p.id} data={p} />)}
        </div>
        <Sidebar query={query} setQuery={setQuery}/>
      </div>
    </>
  )
}

export default ProductsPage
