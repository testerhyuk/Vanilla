import React from 'react'
import '../css/Mypage.css'

export default function MyOrderList() {
  return (
    <div className='content_area'>
        <div className='order_list'>
            <h1>주문목록</h1>
        </div>
        <div>
            <div className='ordered_list'>
                <div className='ordered_date_wrap'>
                    <div className='ordered_date'>0000.00.00 주문</div>
                </div>
                <div className='ordered_product_wrap'>
                    <table>
                        <colgroup>
                            <col width={600}></col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td className='ordered_product_td'>
                                    <div className='ordered_product_detail_wrap'>
                                        <div className='ordered_product_detail_wrap2'>
                                            <div className='ordered_product_img'>
                                                <img alt='' src='https://codingapple1.github.io/shop/shoes1.jpg' height={100} width={100} />
                                            </div>
                                            <div className='ordered_product_title_price_wrap'>
                                                <div>
                                                    <div className='ordered_product_title'>
                                                        <span>의류 상품</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='ordered_product_price_quantity'>
                                                        <span className='ordered_product_price'>00,000원</span>
                                                        <span className='betweenspace'>
                                                            <span className='betweenspace2'></span>
                                                        </span>
                                                        <span>1개</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='write_review_btn_wrap'>
                                    <div className='write_review_btn_wrap2'>
                                        <button className='write_review_btn'>리뷰 작성하기</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
