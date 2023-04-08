import React from 'react'
import '../css/Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='footerArea'>
            <div className='footerMenu'>
                <span className='ft-menu'>이용 약관</span>
                <span>|</span>
                <span className='ft-menu'>개인정보 처리방침</span>
                <span>|</span>
                <span className='ft-menu'>공지사항</span>
                <span>|</span>
                <span className='ft-menu'>About</span>
            </div>
        </div>
        <div className='pageInfo'>
            <div>
                <strong className='brandName'>(주) 바닐라 쇼핑몰</strong>
                <ul className='ft-ceo'>
                    <li className='ft-ceo-str'>대표이사 : 김규혁</li>
                </ul>
                <span className='ft-warnMessage'>
                    바닐라 쇼핑몰은 통신판매중개자이며 통신 판매의 당사자가 아닙니다.
                    <br />
                    따라서 바닐라 쇼핑몰은 상품 거래정보 및 거래에 대하여 책임을 지지 않습니다.
                </span>
                <span className='copyright'>Copyright © 2023 Vanilla All right reserved</span>
            </div>
            <div className='contact'>
                <strong className='customerService'>고객센터</strong>
                <ul className='contactDetail'>
                    <li className='contactInfo'>대표번호 : 010-1234-5678</li>
                    <li className='contactInfo'>제휴문의 : vanilla@test.com</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
