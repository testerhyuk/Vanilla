import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { showData } from '../redux/Store'
import Nav from './Nav'
import './css/Product.css'
import Footer from './Footer'
import RecentWatched from './RecentWatched'

export default function Category() {
    const product = useSelector((state) => {return state.data})
    const dispatch = useDispatch()
    const location = useLocation();
    const sex_dict = {"m":"남성", "w":"여성"};
    const cat_dict = {"shirts":"셔츠", "tshirts":"티셔츠", "jumper":"패딩/점퍼", "jacket":"자켓/코트", 
                    "pants":"바지/청바지", "skirts":"스커트", "onepiece":"원피스"}

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`http://localhost:8080/api/category/${location.state.sex}/${location.state.cat}`)
            .then((res) => {
                dispatch(showData(res.data))
            })
            .catch ((error) => {
                console.log(error);
        })}
        fetchData();
    }, [location])
    
  return (
    <>
        <Nav />
        <section className='prodSection'>
            <div className='container'>
                <div className='product'>
                    <p className='prp'>{sex_dict[location.state.sex]}용 {cat_dict[location.state.cat]}</p>
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
        <Footer />
        <RecentWatched />
    </>
  )
}
