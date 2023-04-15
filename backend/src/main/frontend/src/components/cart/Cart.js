import { faAngleDown, faAngleUp, faCircleExclamation, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/Cart.css'
import { SERVER_URL } from '../Constant';
import _uniqBy from 'lodash/uniqBy'

export default function Cart() {
    const navigate = useNavigate();
    const [checkedArr, setCheckedArr] = useState(new Set())
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartProduct, setCartProduct] = useState([])
    const [state, setState] = useState(false)
    const [checked, setChecked] = useState(new Array(cartProduct.length).fill(false));
    const [checkState, setCheckState] = useState(false)
    const [checkedProduct, setCheckedProduct] = useState([])

    const checkedProductHandler = (id, isChecked) => {
        if (isChecked) {
            checkedArr.add(id)
            setCheckedArr(checkedArr)
            setCheckState(!checkState)
        } else if (!isChecked && checkedArr.has(id)) {
            checkedArr.delete(id);
            setCheckedArr(checkedArr)
            setCheckState(!checkState)
        }
    }

    const checkedHandler = (e, i, id) => {
        setChecked(!checked[i])
        checkedProductHandler(id, e.target.checked)
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")

        if(accessToken === 'null') {
        return;
        }
        
        const headers = new Headers({
            'Content-Type': `application/json`,
        })

        if (accessToken && accessToken !== 'null') {
            headers.append("Authorization", "Bearer " + accessToken);
        }

        let options = {
            headers: headers,
            url: SERVER_URL + 'api/cart/read',
            method: 'GET',
        };

        fetch(options.url, options).then(response => {
            response.json().then(res => {
                setCartProduct(res)
                setCheckState(!checkState)
            })
        })
    }, [state])

    useEffect(() => {
        let sumPrice = 0
        let product = {}

        Array.from(checkedArr).map((idx) => {
            cartProduct.map((p) => {
                if (p[0] === idx) {
                    sumPrice += p[1]
                    product.productId = p[0]
                    product.title = p[2]
                }
            })
        })

        if (Object.keys(product).length !== 0) {
            setCheckedProduct(_uniqBy([...checkedProduct, product], 'productId'))
        }
        setTotalPrice(sumPrice)
        
    }, [state, checkState])

    const handleDelete = (productId) => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")

        const headers = new Headers({
            'Content-Type': `application/json`,
        })

        if (accessToken && accessToken !== 'null') {
            headers.append("Authorization", "Bearer " + accessToken);
        } 

        
        let options = {
            headers: headers,
            url: SERVER_URL + 'api/cart/delete',
            method: 'DELETE',
        }
        
        options.body = JSON.stringify({product: productId})

        fetch(options.url, options)
            .then((res) => {
                if (res.status === 200) {
                    alert("장바구니에서 삭제되었습니다")
                    window.location.reload();
                }
            })
            .catch ((error) => {
                console.log(error);
            })
    }

    const handleQuantity = (productId, quantity, cmd) => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")

        const headers = new Headers({
            'Content-Type': `application/json`,
        })

        if (accessToken && accessToken !== 'null') {
            headers.append("Authorization", "Bearer " + accessToken);
        } 

        
        let options = {
            headers: headers,
            url: SERVER_URL + `api/cart/${cmd}`,
            method: 'PATCH',
        }
        
        options.body = JSON.stringify({product: productId, quantity: quantity})

        fetch(options.url, options)
            .then((response) => {
                setState(!state)
            })
            .catch ((error) => {
                console.log(error);
            })
    }
    
  return (
    <div>
        {cartProduct.length > 0 ? <>
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
                {cartProduct.map((it, i) => {
                    return (
                        <tr key={i}>
                            <td>
                                <input 
                                    type='checkbox' 
                                    checked={checked[i]}
                                    onChange={(e) => checkedHandler(e, i, it[0])}
                                />
                            </td>
                            <td>
                                <div className='pname'>
                                <img 
                                    src={"https://gdimg.gmarket.co.kr/" + it[0] + "/still/300"}
                                    alt={it.id}
                                    className='pname_img'
                                />
                                <Link 
                                    to={`/detail/${it[0]}`}
                                    state={{
                                        productId: it[0],
                                        title: it[2],
                                        price: it[1]
                                    }}
                                    style={{ 
                                        textDecoration: "none", 
                                        cursor: "pointer", 
                                        color: "black",
                                     }}
                                >
                                    <p style={{overflow : 'hidden'}}>{it[2]}</p>
                                </Link>
                                </div>
                            </td>
                            <td className='cart_price'>
                                {(it[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                            </td>
                            <td className='quantity_td'>
                                <input className='product_quantity' type='text' value={it[3]} />
                                <div className='quantity_btn'>
                                    <FontAwesomeIcon icon={faAngleUp} className='upIcon' onClick={() => handleQuantity(it[0], it[3], 'plus')} />
                                    <FontAwesomeIcon icon={faAngleDown} className='downIcon' onClick={() => handleQuantity(it[0], it[3], 'minus')} />
                                </div>
                            </td>
                            <td>
                                <FontAwesomeIcon icon={faTrashCan} className='trashcanIcon' onClick={() => handleDelete(it[0])} />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className='total-price'>
            <span>총 결제 금액 : </span>
            <span>
                {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </span>
        </div>
        <div className='buy_product'>
            <button 
                className='buy_product_btn'
                onClick={() => {
                    totalPrice === 0 
                    ? alert('구매할 상품이 선택되지 않았습니다') 
                    : navigate('/pay', {
                        state: {
                            productInfo: checkedProduct,
                            price: totalPrice
                        }
                    }) }}
            >
                구매하기
            </button>
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
