import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './css/RecentWatched.css'
import RecentModal from './RecentModal';
import { setIsClick } from '../redux/Store';

export default function RecentWatched() {
    const [count, setCount] = useState(0);
    const isClick = useSelector((state) => {return state.click_recent})
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('storage', () => {
            setCount(JSON.parse(sessionStorage.getItem('watched')).length)
        })
    }, [count])
    
  return (
    <>
        {sessionStorage.watched && JSON.parse(sessionStorage.watched).length > 0 ?
        
        <div className='floating_wrapper'>
            <button type='button' className='btn_history' onClick={() => dispatch(setIsClick(isClick))}>
                <span className='img_box'>
                    <img 
                        src={"https://codingapple1.github.io/shop/shoes" + (parseInt(JSON.parse(sessionStorage.getItem('watched'))[0][0])+1) + ".jpg"}
                        alt='최근 본 상품'
                    />
                </span>
                <span className='count_recent'>{JSON.parse(sessionStorage.getItem('watched')).length}</span>
            </button>
        </div>
        :
        <div></div>
    }
    {isClick ? <RecentModal /> : <></>}
    </>
    
    )
}
