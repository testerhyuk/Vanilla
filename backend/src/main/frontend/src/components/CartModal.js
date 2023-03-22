import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './css/CartModal.css'

export default function CartModal({ modal, setModal }) {
  return (
    <div className='cart_modal_wrapper'>
        <FontAwesomeIcon icon={faCartArrowDown} style={{color: "#f1c333",}} className='cart_ico' />
        <h3 className='cart_message'>장바구니에 추가되었습니다.</h3>
        <div className='cart_modal_btnWrap'>
            <button className='keep_shopping' onClick={() => setModal(!modal)}>계속 쇼핑하기</button>
            <Link to={"/cart"}>
                <button className='show_cart'>장바구니 보기</button>
            </Link>
        </div>
    </div>
  )
}
