import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showMemberInfo } from '../../redux/Store';
import { SERVER_URL } from '../Constant';
import '../css/Mypage.css'
import OrderList from './MyOrderList';
import MyReviewList from './MyReviewList';
import MyInfoList from './MyInfoList';
import PageLoading from '../PageLoading';

export default function MyPage() {
  const [clickedOrderList, setClickedOrderList] = useState(true);
  const [clickedReview, setClickedReview] = useState(false);
  const [clickedWanted, setClickedWanted] = useState(false);
  const [clickedInfo, setClickedInfo] = useState(false);

  const memberInfo = useSelector((state) => {return state.memberInfo})
  const dispatch = useDispatch();

  const handleClick = (keyword) => {
    if (keyword === 'order') {
      setClickedOrderList(true)
      setClickedReview(false)
      setClickedWanted(false)
      setClickedInfo(false)
    } else if (keyword === 'review') {
      setClickedOrderList(false)
      setClickedReview(true)
      setClickedWanted(false)
      setClickedInfo(false)
    } else if (keyword === 'wanted') {
      setClickedOrderList(false)
      setClickedReview(false)
      setClickedWanted(true)
      setClickedInfo(false)
    } else {
      setClickedOrderList(false)
      setClickedReview(false)
      setClickedWanted(false)
      setClickedInfo(true)
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")

    if (accessToken === 'null') {
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
      url: SERVER_URL + 'member/my-page',
      method: 'GET',
    };

    const fetchData = async () => {
        fetch(options.url, options)
        .then((res) => {
            res.json().then((response) => {
              dispatch(showMemberInfo(response))
            })
        })
        .catch ((error) => {
            console.log(error);
    })}
    fetchData();
  }, [])

  return (
    <section className='contents'>
      <div className='mypage_wrap'>
        <div className='left_menu'>
          <div className='me_box'>
            <div className='me_wrap'>
              <span className='me'>MY</span>
            </div>
          </div>
          <div className='mymenu'>
              <nav>
                <div className='myshopping wrap_box'>
                  <div className='shopping func_title'>MY 쇼핑</div>
                  <div className='shopping_func list_wrap'>
                    <ul className='shopping_func_list func_list'>
                      <li>
                        <span className='order_data list_font' onClick={() => handleClick('order')}>
                          주문목록/배송조회
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='myactivity wrap_box'>
                  <div className='activity func_title'>MY 활동</div>
                  <div className='activity_func list_wrap'>
                    <ul className='activity_func_list func_list'>
                      <li>
                        <span className='myreview list_font' onClick={() => handleClick('review')}>
                          리뷰관리
                        </span>
                      </li>
                      <li>
                        <span className='mywanted list_font' onClick={() => handleClick('wanted')}>
                          찜 리스트
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='myinfo wrap_box'>
                  <div className='chckinfo func_title'>MY 정보</div>
                  <div className='info_func list_wrap'>
                    <ul className='info_func_list func_list'>
                      <li>
                        <span className='modifyinfo list_font' onClick={() => handleClick('info')}>
                          개인정보확인/수정
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
        </div>
        <div>
        {clickedOrderList ? <OrderList /> 
          : clickedReview ? <MyReviewList /> 
          : clickedWanted ? <PageLoading />
          : <MyInfoList 
              email={memberInfo.email} 
              name={memberInfo.name} 
              address={memberInfo.address} 
              detailAddress={memberInfo.detailAddress} 
            />
        }
        </div>
      </div>
    </section>
  )
}
