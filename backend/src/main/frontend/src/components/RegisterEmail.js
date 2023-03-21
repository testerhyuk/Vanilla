import React from 'react'
import { Link } from 'react-router-dom'
import './css/Register.css'
import './css/Auth.css'

export default function RegisterEmail() {
  return (
    <div className='auth_frame'>
        <section className='auth_inner'>
          <h2 className='register_h2'>정말 간단한 회원가입</h2>
          <div className='register_step_wrapper'>
            <ul className='register_step_ul'>
              <li>1</li>
              <li className='register_step'>2</li>
            </ul>
            <h3 className='choose_register'>가입 정보 입력하기</h3>
          </div>
          <div className='info_wrap'>
            <div>
                <label>
                    <em className='asterisk'>*</em>
                    이름
                </label>
                <input className='auth_input' type="text" placeholder='이름을 입력해주세요' />
            </div>
            <div>
                <label>
                    <em className='asterisk'>*</em>
                    이메일
                </label>
                <input className='auth_input' type="email" placeholder='이메일을 입력해주세요' />
            </div>
            <div>
                <label>
                    <em className='asterisk'>*</em>
                    비밀번호
                </label>
                <input className='auth_input' placeholder='비밀번호 (영문 + 숫자 + 특수문자를 포함한 8자 이상)' />
                <label>
                    <em className='asterisk'>*</em>
                    비밀번호 확인
                </label>
                <input className='auth_input' placeholder='비밀번호 확인' />
            </div>
          </div>
          <div>
            <button className='register_email fin'>
            <span>회원가입하기</span>
            </button>
          </div>
          <div className='to_login_register'>
            <Link style={{color: "gray", fontSize: 13}} to={"/register"}>회원가입으로</Link>
          </div>
        </section>
    </div>
  )
}
