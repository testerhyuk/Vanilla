import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { SERVER_URL } from '../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { showMemberInfo } from '../../redux/Store';
import '../css/Pay.css'

export default function Pay() {
    const location = useLocation();
    const dispatch = useDispatch();
    const memberInfo = useSelector((state) => {return state.memberInfo})

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
    <div>
        <div className='pay_body'>
            <div className='pay_middle'>
                <div className='orderTitle'>
                    <h3 className='pay_title'>주문 / 결제</h3>
                </div>
                <div>
                    <div className='customer_info pay_info'>
                        <h2 className='customer_h2 pay_h2'>구매자 정보</h2>
                        <table className='customer_table pay_table'>
                            <tbody className='customer_tbody pay_tbody'>
                                <tr className='customer_tr pay_tr'>
                                    <td className='pay_col-1'>이름</td>
                                    <td className='pay_col-2'>{memberInfo.name}</td>
                                </tr>
                                <tr className='customer_tr pay_tr'>
                                    <td className='pay_col-1'>이메일</td>
                                    <td className='pay_col-2'>{memberInfo.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h2 className='delivery_address pay_h2'>받는 사람 정보</h2>
                    <table className='address_table pay_table'>
                            <tbody className='address_tbody pay_tbody'>
                                <tr className='address_tr pay_tr'>
                                    <td className='pay_col-1'>이름</td>
                                    <td className='pay_col-2'>{memberInfo.name}</td>
                                </tr>
                                <tr className='address_tr pay_tr'>
                                    <td className='pay_col-1'>배송주소</td>
                                    <td className='pay_col-2'>{memberInfo.address + " " + memberInfo.detailAddress}</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                {location.state.productInfo.map((p, i) => {
                    return (
                        <div key={i}>
                            <div className='bundle_title pay_h2'>
                                배송 {location.state.productInfo.length}건 중 {i+1}
                            </div>
                            <div className='bundle_info'>
                                <div className='bundle_expected-delivery-date'>
                                    <span className='bundle_expected-delivery-info'>
                                        <strong>몇월 몇일</strong>
                                        <span>도착 예정</span>
                                    </span>
                                </div>
                                <div className='bundle_item-list'>
                                    <div>
                                        <div className='vendor_item'>
                                            <p>
                                                {p.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div>
                    <h2 className='pay_info pay_h2'>결제 정보</h2>
                    <table className='pay_info pay_table'>
                        <tbody className='pay_info pay_tbody'>
                            <tr className='pay_info pay_tr'>
                                <td className='pay_col-1'>총결제금액</td>
                                <td className='pay_col-2'>
                                    <strong>{location.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                                    원
                                </td>
                            </tr>
                            <tr className='address_tr pay_tr'>
                                <td className='pay_col-1'>결제방법</td>
                                <td className='payType'>
                                    <div className='payBox'>
                                        <ul className='type_selector'>
                                            <li>
                                                <input className='type_selector-radio' type='radio' />
                                                <label className='type_selector-label'>
                                                    신용/체크카드
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className='payButton_wrap'>
            <button className='payButton'>결제하기</button>
        </div>
    </div>
  )
}
