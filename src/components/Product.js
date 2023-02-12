import React, { useState } from 'react'
import data from '../data';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/Product.css'
import { Link } from 'react-router-dom';

export default function Product() {
    const [product] = useState(data);
  return (
    <section className='prodSection'>
        <div className='container'>
            <div className='product'>
                <p className='prp'>상품</p>
            </div>
            <div className='productInfo'>
                <li className='p_list'>
                <ul className='p_list2'>
                    {product.map((p, i) => {
                    return (
                        <li className='p_list3' key={i}>
                        <div className='row'>
                            <div className='col-1'>
                            <Link to='/detail' state={{
                                productId: p.id, 
                                title: p.title,
                                price: p.price,
                                description: p.content
                            }}>
                                <img 
                                    src={"https://codingapple1.github.io/shop/shoes" + (i+1) + ".jpg"} 
                                    alt='shoe1'
                                    className='product-1'
                                />
                            </Link>
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
