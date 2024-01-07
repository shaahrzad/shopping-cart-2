import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useProducts } from "../context/ProductContext"

import Sidebar from '../components/Sidebar';
import SearchBox from '../components/SearchBox';
import Card from "../components/Card";
import Loader from "../components/Loader";

import {filterProducts, getInitialQuery, searchProducts } from '../helper/helper';

import Styles from "./ProductsPages.module.css"



function ProductsPage() {
  const products = useProducts();
  
  const [displayed,setDisplayed] = useState([])
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState({});

  const [searchParams,setSearchParams] = useSearchParams();


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
          {!displayed.length && <Loader/>}
          {displayed.map((p) => <Card key={p.id} data={p} />)}
        </div>
        <Sidebar query={query} setQuery={setQuery}/>
      </div>
    </>
  )
}

export default ProductsPage
