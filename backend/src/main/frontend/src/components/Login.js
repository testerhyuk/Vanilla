import React, { useState } from 'react'
import './css/Login.css'
import './css/Auth.css'
import { Link } from 'react-router-dom'
import { signin } from './ApiCall';

export default function Login() {
  const [isChecked, SetIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email")
    const password = data.get("password")

    signin({email: email, password: password}, isChecked);
  }

  return (
    <div className='auth_frame'>
        <section className='auth_inner'>
          <h2 className='login_h2'>로그인</h2>
          <form onSubmit={handleSubmit}>
            <div className='info_wrap'>
              <input className='auth_input' placeholder='이메일' name='email' />
              <input className='auth_input' placeholder='비밀번호' type='password' name='password' />
            </div>
            <div className='auto_login_section'>
              <input type="checkbox" onClick={() => {SetIsChecked(!isChecked)}} />
              <span className='auto_login'>자동 로그인</span>
            </div>
            <div>
              <button className='login_email' type='submit'>
                <span>이메일로 로그인하기</span>
              </button>
            </div>
          </form>
          <div>
            <button className='login_google'>
              <span className='login_google_span'>구글로 로그인하기</span>
            </button>
          </div>
          <div className='to_login_register'>
            <Link style={{color: "gray", fontSize: 13}} to={"/register"}>회원가입으로</Link>
          </div>
          <div>
            <Link style={{color: "gray", fontSize: 13}} to={"/"}>홈으로</Link>
          </div>
        </section>
    </div>
  )
}
