import React from 'react'
import { Link } from 'react-router-dom'
import './css/Register.css'
import './css/Auth.css'

export default function Register() {
  return (
    <div className='auth_frame'>
        <section className='auth_inner'>
          <h2 className='register_h2'>정말 간단한 회원가입</h2>
          <div className='register_step_wrapper'>
            <ul className='register_step_ul'>
              <li className='register_step'>1</li>
              <li>2</li>
            </ul>
            <h3 className='choose_register'>회원가입 방법 선택</h3>
          </div>
          <div>
            <button className='register_google'>
              <span className='register_google_span'>구글로 가입하기</span>
            </button>
          </div>
          <div>
            <Link to={'/register/email'}>
              <button className='register_email'>
                <span>이메일로 가입하기</span>
              </button>
            </Link>
          </div>
          <div className='to_login_register'>
            <Link style={{color: "gray", fontSize: 13}} to={"/login"}>바로 로그인하기</Link>
          </div>
        </section>
    </div>
  )
}
