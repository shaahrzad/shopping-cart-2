import { Link } from "react-router-dom"
import {PiShoppingCartSimpleBold} from 'react-icons/pi'


import styles from "./Layout.module.css"
import { useSelector } from "react-redux"

function Layout({children}) {
   const state = useSelector((store)=> store.cart)
  return (
    <>
        <header className={styles.header}>
            <Link to="/products">BotoShop</Link>
            <Link to="/checkout">
                <div>
                    <PiShoppingCartSimpleBold/>
                    {/* {!!state.itemsCounter && <span>{state.itemsCounter}</span>} */}
                </div>
            </Link>
        </header>
        {children}
        <footer className={styles.footer}>
            <p>Developer is shahrzad</p>
        </footer>
    </>
  )
}

export default Layout
