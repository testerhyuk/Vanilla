import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './css/RecentModal.css'
import { setIsClick } from '../redux/Store';

export default function RecentModal() {
  const arr = JSON.parse(sessionStorage.getItem('watched'))
  const isClick = useSelector((state) => {return state.click_recent})
  const dispatch = useDispatch()
  
  return (
    <div className='dialog'>
      <div className='dialog_wrap'>
        <div className='dialog_header'>
          <div className='dialog_title'>최근 본</div>
          <span 
            className='dialog_close'
            onClick={() => dispatch(setIsClick(isClick))}
          >
            X
          </span>
        </div>
        <div className='recent_count'>
          <div className='dialog_count'>
            <div className='count_num'>{arr.length}</div>
            <div>건</div>
          </div>
        </div>
          {arr.map((p, i) => {
            return (
              <div className='dialog_detail' key={i}>
                <div>
                  <Link 
                      to={`/detail/${p[0]}`}
                      style={{ textDecoration: "none" }}
                      onClick={() => dispatch(setIsClick(isClick))}
                      state={{
                          productId: parseInt(p[0]), 
                          title: p[1],
                          price: p[2],
                  }}>
                    <img 
                      src={"https://codingapple1.github.io/shop/shoes" + (parseInt(p[0])+1) + ".jpg"}
                      className='dialog_img'
                      alt='dial'
                    />
                  </Link>
                </div>
                <div>
                  <div className='dialog_detail_title'><p>{p[1]}</p></div>
                  <div className='dialog_detail_price'>{p[2].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
