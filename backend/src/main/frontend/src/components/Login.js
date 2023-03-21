import React from 'react'
import './css/Login.css'
import './css/Auth.css'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='auth_frame'>
        <section className='auth_inner'>
          <h2 className='login_h2'>로그인</h2>
          <div className='info_wrap'>
            <input className='auth_input' placeholder='이메일' />
            <input className='auth_input' placeholder='비밀번호' />
          </div>
          <div className='auto_login_section'>
            <input type="checkbox" />
            <span className='auto_login'>자동 로그인</span>
          </div>
          <div>
            <Link to={'/register/email'}>
              <button className='login_email'>
                <span>이메일로 로그인하기</span>
              </button>
            </Link>
          </div>
          <div>
            <button className='login_google'>
              <span className='login_google_span'>구글로 로그인하기</span>
            </button>
          </div>
          <div className='to_login_register'>
            <Link style={{color: "gray", fontSize: 13}} to={"/register"}>회원가입으로</Link>
          </div>
        </section>
    </div>
  )
}
