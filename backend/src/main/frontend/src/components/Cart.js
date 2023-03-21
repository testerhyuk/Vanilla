import { faAngleDown, faAngleUp, faCircleExclamation, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCount, deleteCart, minusCount } from '../redux/Store';
import './css/Cart.css'
import Footer from './Footer';
import Nav from './Nav';
import RecentWatched from './RecentWatched';

export default function Cart() {
    const cartList = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    
  return (
    <div>
        <Nav />
        {cartList.length > 0 ? <>
        <table className='cartDiv'>
            <thead className='cartHead'>
                <tr>
                    <th>선택</th>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody className='cartBody'>
                {cartList.map((it, i) => {
                    return (
                        <tr key={i}>
                            <td><input type='checkbox'></input></td>
                            <td>
                                <div className='pname'>
                                <img 
                                    src={"https://gdimg.gmarket.co.kr/" + it.id + "/still/300"}
                                    alt={it.id}
                                    className='pname_img'
                                />
                                <p style={{overflow : 'hidden'}}>{it.title}</p>
                                </div>
                            </td>
                            <td className='cart_price'>
                                {(it.price * it.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                            </td>
                            <td className='quantity_td'>
                                <input className='product_quantity' type='text' value={it.quantity} readOnly={true} />
                                <div className='quantity_btn'>
                                    <FontAwesomeIcon icon={faAngleUp} className='upIcon' onClick={() => {dispatch(addCount(cartList[i].id))}} />
                                    <FontAwesomeIcon icon={faAngleDown} className='downIcon' onClick={() => {dispatch(minusCount(cartList[i].id))}} />
                                </div>
                            </td>
                            <td><FontAwesomeIcon icon={faTrashCan} className='trashcanIcon' onClick={() => {
                                dispatch(deleteCart(cartList[i].id))
                            }} /></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className='total-price'>
            {/* <span>총 결제 금액 : {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span> */}
        </div>
        <div className='buy_product'>
            <button className='buy_product_btn'>구매하기</button>
        </div>
        </>
        :
        <div className='no_cart_data'>
            <FontAwesomeIcon icon={faCircleExclamation} className='exclamation-mark'/>
            <p>장바구니에 담긴 상품이 없어요</p>
        </div>
        }
        <Footer />
        <RecentWatched />
    </div>
  )
}
