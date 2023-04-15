import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solildHeart} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons';
import '../css/Detail.css'
import CartModal from '../cart/CartModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { enqueueSnackbar } from 'notistack';
import { SERVER_URL } from '../Constant';
import { Link } from 'react-router-dom';

export default function Detail() {
    const location = useLocation();

    const originPrice = location.state.price;
    
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(location.state.price);
    const [modal, setModal] = useState(false);
    const [like, setLike] = useState(false)

    const handleQuantityPlus = () => {
        setQuantity(quantity+1)
    }

    const handleQuantityMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity-1)
        }
    }

    const handleCartClick = () => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")

        if (accessToken === 'null') {
            enqueueSnackbar('로그인이 필요한 서비스입니다', {variant: 'error', autoHideDuration: 2000});
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
            url: SERVER_URL + 'api/cart/create',
            method: 'POST',
        }
        
        options.body = JSON.stringify({product: location.state.productId, quantity: quantity})
        
        fetch(options.url, options)
            .then((res) => {
                if (res.status === 200) {
                    setModal(true); 
                }
            })
            .catch ((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        setPrice(location.state.price * quantity)
    }, [location.state.price, quantity])

    useEffect(() => {
        let watched = sessionStorage.getItem('watched')
        watched = JSON.parse(watched)
        watched.unshift([location.state.productId, location.state.title, originPrice])
        watched = [...new Set(watched.join("|").split("|"))]
                    .map((v) => v.split(","))
        watched = Array.from(watched)
        sessionStorage.setItem('watched', JSON.stringify(watched))
        window.dispatchEvent(new Event("storage"));
    })

    useEffect(() => {
        function likeData() {
            const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")

            if (accessToken === 'null') {
                return;
            }
            
            const headers = new Headers({
                'Content-Type': `application/json`,
            })
    
            if (accessToken && accessToken !== null) {
                headers.append("Authorization", "Bearer " + accessToken);
            }

            let options = {
                headers: headers,
                url: SERVER_URL + 'api/wishes/check/' + location.state.productId,
                method: 'GET',
            };

            fetch(options.url, options).then(response => {
                response.text().then(res => {
                    if (res === 'true') {
                        setLike(true)
                    }
                })
            })
        }
        likeData()
    }, [location.state.productId, like])

    const handleLike = () => {

        const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")

        if (accessToken === 'null') {
            enqueueSnackbar('로그인이 필요한 서비스입니다', {variant: 'error', autoHideDuration: 2000});
            return;
        }

        const headers = new Headers({
            'Content-Type': `application/json`,
        })

        if (accessToken && accessToken !== 'null') {
            headers.append("Authorization", "Bearer " + accessToken);
        } 

        if (like === true) {
            let options = {
                headers: headers,
                url: SERVER_URL + 'api/wishes/delete',
                method: 'DELETE',
            }
            
            options.body = JSON.stringify({product: location.state.productId})

            fetch(options.url, options)
                .then((res) => {
                    if (res.status === 200) {
                        enqueueSnackbar('찜목록에서 삭제되었습니다', {variant: 'success', autoHideDuration: 2000});
                        setLike(false)
                    }
                })
                .catch ((error) => {
                    console.log(error);
                })
        } else {
            let options = {
                headers: headers,
                url: SERVER_URL + 'api/wishes/create',
                method: 'POST',
            }
            
            options.body = JSON.stringify({product: location.state.productId})
            
            fetch(options.url, options)
                .then((res) => {
                    if (res.status === 200) {
                        enqueueSnackbar('찜목록에 추가되었습니다', {variant: 'success', autoHideDuration: 2000});
                        setLike(true)
                    }
                })
                .catch ((error) => {
                    console.log(error);
                })
        }
    }

  return (
    <>
        {modal === true ? <CartModal modal={modal} setModal={setModal} /> : null}
        <section className='productDetail'>
            <div className='imgInfo'>
                <img 
                    src={"https://gdimg.gmarket.co.kr/" + location.state.productId + "/still/300"}
                    alt={location.state.productId}
                    className='productImg'
                />
            </div>
            <div className='buyInfo'>
                {like ?
                    <FontAwesomeIcon icon={solildHeart} style={{color:'#ee1742', cursor: 'pointer', height: 25}} onClick={handleLike} />
                    :
                    <FontAwesomeIcon icon={regularHeart} style={{color:'#ee1742', cursor: 'pointer', height: 25}} onClick={handleLike} />
                }
                <div>
                    <h3 className='productTitle'>{location.state.title}</h3>
                </div>
                <div>
                    <h3 className='ProductPrice'>{location.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h3>
                </div>
                <div>
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>배송비</td>
                                    <td className='prod_info_dt'>무료 배송</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>배송 시작</td>
                                    <td className='prod_info_dt'>평균 1일, 최대 2일 이내</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='totalPriceSection'>
                    <span className='totalPrice'>총 금액</span>
                    <span className='varPrice'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                </div>
                <div className='buyButton'>
                    <div className='quantity_box'>
                        <span className='quantity'>수량</span>
                        <input className='prod_quantity' type='text' value={quantity} readOnly={true} />
                        <div className='quantity_button'>
                            <FontAwesomeIcon icon={faAngleUp} className="quantity_plus" onClick={handleQuantityPlus} />
                            <FontAwesomeIcon icon={faAngleDown} className="quantity_minus" onClick={handleQuantityMinus} />
                        </div>
                    </div>
                    <div className='buy_ctn'>
                        <button 
                            type='button' 
                            className='cart_button'
                            onClick={handleCartClick}
                        >
                            장바구니
                        </button>
                        <Link
                            to={'/pay'}
                            style={{ textDecoration: "none" }}
                            state={{ 
                                productInfo: [{"title": location.state.title, "quantity": quantity}],
                                price: price,
                            }} 
                        >
                            <button type='button' className='buy_button'>구매하기</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* 리뷰 UI */}
        </section>
        <div className='tabUI'>
            <ul className='menuTab'>
                <li>
                    <span className='tabBox'>리뷰</span>
                </li>
            </ul>
        </div>
        <div className='tabDetail'>
            <div>리뷰를 보여줌</div>
        </div>
    </>
  )
}