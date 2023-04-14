import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../Constant';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function MyWishList() {
    const [wish, setWish] = useState([]);

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
            url: SERVER_URL + 'api/wishes/read',
            method: 'GET',
        };

        fetch(options.url, options).then(response => {
            response.json().then(res => {
                setWish(res)
            })
        })
    }, [])

  return (
    <div className='content_area'>
        <div className='order_list'>
            <h1>찜 목록</h1>
        </div>
        <div>
        {wish.length !== 0 ?
            <div className='ordered_list'>
                <div className='ordered_product_wrap'>
                { wish.map((w, i) => {
                  return (
                    <table key={i}>
                        <colgroup>
                            <col width={600}></col>
                        </colgroup>
                        <tbody>
                            <tr>
                              <td className='ordered_product_td' key={i}>
                                <div className='ordered_product_detail_wrap'>
                                    <div className='ordered_product_detail_wrap2'>
                                        <div className='ordered_product_img'>
                                        <Link 
                                            to={`/detail/${w[0]}`}
                                            style={{ textDecoration: "none" }}
                                            state={{
                                                productId: w[0], 
                                                title: w[2],
                                                price: w[1],
                                        }}>
                                            <img 
                                              alt={w[0]} 
                                              src={"https://gdimg.gmarket.co.kr/" + w[0] + "/still/300"} 
                                              height={100} 
                                              width={100} 
                                            />
                                        </Link>
                                        </div>
                                        <div className='ordered_product_title_price_wrap'>
                                            <div>
                                            <Link 
                                                to={`/detail/${w[0]}`}
                                                style={{ textDecoration: "none" }}
                                                state={{
                                                    productId: w[0], 
                                                    title: w[2],
                                                    price: w[1],
                                            }}>
                                                <div className='ordered_product_title'>
                                                    <span>{w[2]}</span>
                                                </div>
                                            </Link>
                                            </div>
                                            <div>
                                                <div className='ordered_product_price_quantity'>
                                                    <span className='ordered_product_price'>{w[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                                                    <span className='betweenspace'>
                                                        <span className='betweenspace2'></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                    )
                  })
                }
                </div>
            </div>
        :
        <div className='no_wish_data'>
            <FontAwesomeIcon icon={faCircleExclamation} className='exclamation-mark'/>
            <p>찜한 상품이 없어요</p>
        </div>
        }
        </div>
    </div>
  )
}
