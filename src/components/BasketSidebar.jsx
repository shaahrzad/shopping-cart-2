import {TbChecklist} from "react-icons/tb"
import {FaHashtag} from "react-icons/fa"
import {BsPatchCheck} from "react-icons/bs"

import styles from "./BasketSidebar.module.css"
import { useDispatch } from "react-redux"
import {checkout} from "../features/cart/cartSlice"

function BasketSidebar({state}) {

  const dispatch = useDispatch()

  return (
    <div className={styles.sidebar}>
      <div>
          <TbChecklist/>
          <p>Total:</p>
          <span>{state.total} $
          </span>
      </div>
      <div>
          <FaHashtag/>
          <p>Quantity:</p>
          <span>{state.itemsCounter}</span>
      </div>
      <div>
          <BsPatchCheck/>
          <p>Status:</p>
          <span>{!state.checkout && "pending..."}</span>
      </div>
      <button onClick={() => dispatch(checkout())}>checkout</button>
    </div>
  )
}

export default BasketSidebar
