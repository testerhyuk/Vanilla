import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './css/Register.css'
import './css/Auth.css'
import DaumPostcodeEmbed from 'react-daum-postcode';
import { enqueueSnackbar } from 'notistack';
import { signup } from './ApiCall';

export default function RegisterEmail() {
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState('');

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordCheckInput = useRef();
  const addrInput = useRef();
  const addrDetailInput = useRef();

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    addrDetail: ''
  })

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const postCodeStyle = {
    width: "500px",
    height: "550px",
    padding: "5px",
    backgroundColor: "lightgray"
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }

        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');  
    }
    setAddress(fullAddress);
    setModal(false)
  }

  const handleSubmit = () => {
    if (state.name.length < 1) {
      nameInput.current.focus();
      return;
    }

    if (state.email.length < 1) {
      emailInput.current.focus();
      return;
    }

    if (state.password.length < 1) {
      passwordInput.current.focus();
      return;
    }

    if (state.passwordCheck.length < 1) {
      passwordCheckInput.current.focus();
      return;
    }

    if (state.password !== state.passwordCheck) {
      enqueueSnackbar("비밀번호가 일치하지 않습니다", {variant: 'error', autoHideDuration: 2000});
      passwordCheckInput.current.focus();
      return;
    }

    if (address.length < 1) {
      addrInput.current.focus();
      return;
    }

    if (state.addrDetail.length < 1) {
      addrDetailInput.current.focus();
      return;
    }

    // eslint-disable-next-line
    var emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailRegex.test(state.email)) {
      enqueueSnackbar("이메일 형식이 올바르지 않습니다", {variant: 'error', autoHideDuration: 2000});
      emailInput.current.focus();
      return;
    }

    // eslint-disable-next-line
    var pwdReg = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (!pwdReg.test(state.password)) {
      enqueueSnackbar("비밀번호 형식이 올바르지 않습니다", {variant: 'error', autoHideDuration: 2000});
      passwordInput.current.focus();
      return;
    }

    signup({name: state.name, email: state.email, password: state.password, address: address, detailAddress: state.addrDetail});

  }

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
                <input 
                  className='auth_input' 
                  type="text" 
                  placeholder='이름을 입력해주세요' 
                  ref={nameInput} 
                  value={state.name} 
                  onChange={handleChangeState}
                  name='name'
                />
            </div>
            <div>
                <label>
                    <em className='asterisk'>*</em>
                    이메일
                </label>
                <input 
                  className='auth_input' 
                  type="email" 
                  placeholder='이메일을 입력해주세요'
                  ref={emailInput} 
                  value={state.email} 
                  onChange={handleChangeState}
                  name='email'
                />
            </div>
            <div>
                <label>
                    <em className='asterisk'>*</em>
                    비밀번호
                </label>
                <input 
                  className='auth_input' 
                  placeholder='비밀번호 (영문 + 숫자 + 특수문자를 포함한 8자 이상)'
                  ref={passwordInput} 
                  value={state.password} 
                  onChange={handleChangeState} 
                  name='password'
                  type='password'
                />
                <label>
                    <em className='asterisk'>*</em>
                    비밀번호 확인
                </label>
                <input 
                  className='auth_input' 
                  placeholder='비밀번호 확인'
                  ref={passwordCheckInput} 
                  value={state.passwordCheck} 
                  onChange={handleChangeState} 
                  name='passwordCheck'
                  type='password'
                />
            </div>
            <div>
              <div>
                <label>
                  <em className='asterisk'>*</em>
                  주소
                </label>
              </div>
                <input 
                  className='auth_input_addr' 
                  value={address}
                  ref={addrInput}  
                  onChange={handleChangeState}
                />
                <button className='find_addr' onClick={() => setModal(true)}>주소 찾기</button>
                <input 
                  className='auth_input' 
                  placeholder='상세 주소'
                  ref={addrDetailInput} 
                  value={state.addrDetail} 
                  onChange={handleChangeState}
                  name='addrDetail'
                />
            </div>
          </div>
          <div>
            <button className='register_email fin' onClick={handleSubmit}>
            <span>회원가입하기</span>
            </button>
          </div>
          <div className='to_login_register'>
            <Link style={{color: "gray", fontSize: 13}} to={"/login"}>로그인으로</Link>
          </div>
          <div>
            <Link style={{color: "gray", fontSize: 13}} to={"/"}>홈으로</Link>
          </div>
        </section>
        {modal ? 
            <div className='addr_modal'>
              <button className='addr_close_btn' onClick={() => setModal(false)}>X</button>
              <DaumPostcodeEmbed autoClose onComplete={handleComplete} style={postCodeStyle} />
            </div>
        :
         <></>
        }
    </div>
  )
}
