import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductList( { product, pageTag }) {
  return (
    <section className='prodSection'>
        <div className='container'>
            <div className='product'>
                <p className='prp'>{pageTag}</p>
            </div>
            <div className='productInfo'>
                <li className='p_list'>
                <ul className='p_list2'>
                    {product.map((p, i) => {
                    return (
                        <li className='p_list3' key={i}>
                        <div className='row'>
                            <div className='col-1'>
                                <Link 
                                    to={`/detail/${p.id}`}
                                    style={{ textDecoration: "none" }}
                                    state={{
                                        productId: p.id, 
                                        title: p.title,
                                        price: p.price,
                                }}>
                                    <img 
                                        src={"https://gdimg.gmarket.co.kr/" + p.id + "/still/300"} 
                                        alt={'product'}
                                        className='product-1'
                                    />
                                    <div className='namePrice'>
                                        <h4 className='productName'>{p.title}</h4>
                                        <p className='price'>{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
                                    </div>
                                    <div className='stars'>
                                        <div className='score'>
                                            <FontAwesomeIcon icon={faStar} className='starIcon'/>
                                            <FontAwesomeIcon icon={faStar} className='starIcon'/>
                                            <FontAwesomeIcon icon={faStar} className='starIcon'/>
                                            <FontAwesomeIcon icon={faStar} className='starIcon'/>
                                            <FontAwesomeIcon icon={faStar} className='starIcon'/>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        </li>
                    )
                    })}
                </ul>
                </li>
            </div>
        </div>
    </section>
  )
}
