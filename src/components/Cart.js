import { faAngleDown, faAngleUp, faCircleExclamation, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './css/Cart.css'

export default function Cart() {
    const location = useLocation();
    const [quantity, setQuantity] = useState(location.state ? location.state.quantity : null);
    const [totalPrice, setTotalPrice] = useState(location.state ? location.state.price * location.state.quantity : null);

    const handleQuantityPlus = () => {
        setQuantity(quantity+1)
    }

    const handleQuantityMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity-1)
        }
    }

    useEffect(() => {
        setTotalPrice(location.state ? location.state.price * quantity : null)
    }, [quantity])
  return (
    <div>
        {location.state ? <>
        <table className='cartDiv'>
            <thead className='cartHead'>
                <tr>
                    <th>선택</th>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>합계</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody className='cartBody'>
                <tr>
                    <td><input type='checkbox'></input></td>
                    <td>
                        <div className='pname'>
                        <img 
                            src={"https://codingapple1.github.io/shop/shoes" + (location.state.productId+1) + ".jpg"}
                            alt={'product' + location.state.productId}
                            className='pname_img'
                        />
                        <p style={{overflow : 'hidden'}}>{location.state.title}</p>
                        </div>
                    </td>
                    <td>{location.state.price}</td>
                    <td className='quantity_td'>
                        <input className='product_quantity' type='text' value={quantity} readOnly={true} />
                        <div className='quantity_btn'>
                            <FontAwesomeIcon icon={faAngleUp} className='upIcon' onClick={handleQuantityPlus} />
                            <FontAwesomeIcon icon={faAngleDown} className='downIcon' onClick={handleQuantityMinus} />
                        </div>
                    </td>
                    <td>{totalPrice}</td>
                    <td><FontAwesomeIcon icon={faTrashCan} className='trashcanIcon'/></td>
                </tr>
            </tbody>
        </table>
        <div className='total-price'>
            <span>합계 금액 : {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
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
    </div>
  )
}
