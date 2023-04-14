import React, { useState } from 'react'
import '../css/Mypage.css'
import { modifyAddress, modifyPassword } from '../api/ApiCall'
import DaumPostcodeEmbed from 'react-daum-postcode';
import { enqueueSnackbar } from 'notistack';
import { CheckPassword } from '../CheckRegex';
import { SERVER_URL } from '../Constant';

export default function MyInfoList(props) {
    const [address, setAddress] = useState('');
    const [deailAddress, setDetailAddress] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [modal, setModal] = useState(false);
    const [changePassword, setChangePassword] = useState({
        exPassword: '',
        newPassword: '',
        newPasswordCheck: ''
    })
    
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

    const handleChangePassword = (e) => {
        setChangePassword({
            ...changePassword,
            [e.target.name] : e.target.value
        })
    }

    const handleChangeAddress = (e) => {
        setDetailAddress(e.target.value)
    }

    const handleSubmitPassword = () => {
        if (changePassword.newPassword !== changePassword.newPasswordCheck) {
            enqueueSnackbar("비밀번호가 일치하지 않습니다", {variant: 'error', autoHideDuration: 2000});
            return;
        }
        
        if (CheckPassword(changePassword.newPassword) === false) {
            enqueueSnackbar("비밀번호 형식이 올바르지 않습니다", {variant: 'error', autoHideDuration: 2000});
            return;
          }

        modifyPassword({exPassword : changePassword.exPassword, newPassword: changePassword.newPassword})
    }

    const handleSubmitAddress = () => {
        modifyAddress({address: address, detailAddress: deailAddress})
        setIsClicked(false)
    }

    const WithdrawlMemeber = () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            const headers = new Headers({
                'Content-Type': `application/json`,
            })
            
            const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")
            
            if (accessToken && accessToken !== null) {
                headers.append("Authorization", "Bearer " + accessToken);
            }
        
            let options = {
                headers: headers,
                url: SERVER_URL + 'member/delete',
                method: 'DELETE',
            };
        
            options.body = JSON.stringify({email: props.email})
        
            fetch(options.url, options)
                .then((res) => {
                    if (res.status === 200) {

                        if (sessionStorage.getItem("ACCESS_TOKEN")) {
                            sessionStorage.setItem("ACCESS_TOKEN", null)
                        }
                    
                        if (localStorage.getItem("ACCESS_TOKEN")) {
                            localStorage.setItem("ACCESS_TOKEN", null)
                        }
                    }
                    alert('회원 탈퇴가 완료되었습니다')
                    window.location.href='/';
                })
                .catch ((error) => {
                    enqueueSnackbar("회원 탈퇴가 실패했습니다", {variant: 'error', autoHideDuration: 2000});
                    console.log(error);
                })
        } else {
            return;
        }
    }

  return (
    <div className='content_area'>
        <h1>회원정보 수정</h1>
        <table className='modifiy_info_table'>
            <tbody>
                <tr>
                    <th scope='row'>이메일</th>
                    <td>{props.email}</td>
                </tr>
                <tr>
                    <th scope='row'>이름</th>
                    <td>{props.name}</td>
                </tr>
                <tr>
                    <th scope='row'>비밀번호 변경</th>
                    <td>
                        <div>
                            <table className='modify_password'>
                                <tbody>
                                    <tr>
                                        <th>기존 비밀번호</th>
                                        <td>
                                            <input 
                                                type='password' 
                                                value={changePassword.exPassword} 
                                                onChange={handleChangePassword} 
                                                name='exPassword'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>새 비밀번호</th>
                                        <td>
                                            <input 
                                                type='password' 
                                                value={changePassword.newPassword} 
                                                onChange={handleChangePassword}
                                                name='newPassword' 
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>비밀번호 다시 입력</th>
                                        <td>
                                            <input 
                                                type='password' 
                                                value={changePassword.newPasswordCheck} 
                                                onChange={handleChangePassword} 
                                                name='newPasswordCheck'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button className='modify_password_btn submit_btn' onClick={handleSubmitPassword}>비밀번호 변경</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope='row'>주소</th>
                    <td className='modify_address'>
                        <span>{props.address}</span>
                        <span>{props.detailAddress}</span>
                        <button className='modify_address_btn submit_btn' onClick={() => setIsClicked(true)}>주소 변경</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div className='withdrawlMember'>
            <button className='withdrawlMember_btn submit_btn' onClick={WithdrawlMemeber}>회원탈퇴</button>
        </div>
        {isClicked ?
            <div className='addrInput_modal'>
                <button className='addr_close_btn' onClick={() => setIsClicked(false)}>X</button>
                <div className='change_addr_wrap'>
                    <h1 className='change_addr'>주소 변경</h1>
                    <div className='change_addr_content_wrap'>
                        <div>
                            <label>
                                <em className='asterisk'>*</em>
                                주소
                            </label>
                        </div>
                        <input value={address} style={{width:250, height:35, marginRight: 15, marginBottom:10}} />
                        <button className='find_addr' onClick={() => setModal(true)}>주소 찾기</button>
                        <div>
                            <label>
                                <em className='asterisk'>*</em>
                                상세 주소
                            </label>
                        </div>
                        <input value={deailAddress} style={{width:250, height:35, marginTop:10}} onChange={handleChangeAddress} />
                    </div>
                </div>
                <div className='modify_address_btn_modal_wrap'>
                    <button className='modify_address_btn_modal' onClick={handleSubmitAddress}>변경하기</button>
                </div>
            </div>
            : <></>
        }
        {modal ? 
            <div className='change_addr_modal'>
                <button className='addr_close_btn' onClick={() => setModal(false)}>X</button>
                <DaumPostcodeEmbed autoClose onComplete={handleComplete} style={postCodeStyle} />
            </div>
        :
        <></>
        }
    </div>
  )
}
