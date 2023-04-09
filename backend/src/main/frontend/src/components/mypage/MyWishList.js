import React from 'react'

export default function MyWishList(props) {
  return (
    <div className='content_area'>
        <div className='order_list'>
            <h1>찜 목록</h1>
        </div>
        <div>
            <div className='ordered_list'>
                <div className='ordered_product_wrap'>
                {props.wishList && props.wishList.map((w, i) => {
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
                                            <img 
                                              alt={w[i][0]} 
                                              src={"https://gdimg.gmarket.co.kr/" + w[i][0] + "/still/300"} 
                                              height={100} 
                                              width={100} 
                                            />
                                        </div>
                                        <div className='ordered_product_title_price_wrap'>
                                            <div>
                                                <div className='ordered_product_title'>
                                                    <span>{w[i][2]}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='ordered_product_price_quantity'>
                                                    <span className='ordered_product_price'>{w[i][1].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
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
        </div>
    </div>
  )
}
