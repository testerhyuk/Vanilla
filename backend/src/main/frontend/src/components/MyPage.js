import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showMemberInfo } from '../redux/Store';
import { SERVER_URL } from './Constant';

export default function MyPage() {
  const memberInfo = useSelector((state) => {return state.memberInfo})
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")
    const headers = new Headers({
      'Content-Type': `application/json`,
    })
    if (accessToken && accessToken !== null) {
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
      <div>
        {memberInfo.email}
      </div>
      <div>
        {memberInfo.name}
      </div>
      <div>
        {memberInfo.address}
      </div>
      <div>
        {memberInfo.detailAddress}
      </div>
    </div>
  )
}
