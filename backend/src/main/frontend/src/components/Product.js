import React, { useEffect } from 'react'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/Product.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showData } from '../redux/Store';

export default function Product() {
    const product = useSelector((state) => {return state.data})
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            axios.get('http://localhost:8080/api/product-best')
            .then((res) => {
                dispatch(showData(res.data))
            })
            .catch ((error) => {
                console.log(error);
        })}
        fetchData();
    }, [])
    
  return (
    <section className='prodSection'>
        <div className='container'>
            <div className='product'>
                <p className='prp'>인기 상품 TOP 10</p>
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
