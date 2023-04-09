import React, { useEffect, useState } from 'react'
import MyWishList from './mypage/MyWishList';
import { SERVER_URL } from './Constant';

export default function PageLoading() {
    const [wish, setWish] = useState();

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") !== 'null' ? localStorage.getItem("ACCESS_TOKEN") : sessionStorage.getItem("ACCESS_TOKEN")

    if(accessToken === 'null') {
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
        url: SERVER_URL + 'api/wishes/read',
        method: 'GET',
    };

    fetch(options.url, options).then(response => {
        response.json().then(res => {
            setWish(res)
        })
    })
  }, [])

  if (wish === undefined) {
    return (
        <div>PageLoading</div>
      )
  }
  return <MyWishList wishList={wish} />
}
