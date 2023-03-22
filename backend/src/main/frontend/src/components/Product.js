import React, { useEffect } from 'react'
import './css/Product.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showData } from '../redux/Store';
import ProductList from './ProductList';

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
    <>
        <ProductList product={product} pageTag={"인기 상품 TOP 10"} />
    </>
  )
}
