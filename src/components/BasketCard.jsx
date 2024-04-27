import { shortenText } from "../helper/helper"
import {MdDeleteOutline} from "react-icons/md"

import styles from "./BasketCard.module.css"
import { useDispatch } from "react-redux";
import { decrease, increase, removeItem } from "../features/cart/cartSlice";

function BasketCard({data , clickHandler}) {

    const {image,title,quantity} = data;

    const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <img src={image} alt={data.title}/>
      <p>{shortenText(data.title)}</p>
      <div className={styles.actions}>
        {quantity === 1 && (
            <button onClick={() => dispatch(removeItem(data))}>
                <MdDeleteOutline/>
            </button>
        )}
        {quantity > 1 && (
            <button onClick={() => dispatch(decrease(data))}>
                -
            </button>
        )}
        <span>{quantity}</span>
        {quantity > 1 && (
            <button onClick={() => dispatch(increase(data))}>
                +
            </button>
        )}
      </div>
    </div>
  )
}

export default BasketCard
