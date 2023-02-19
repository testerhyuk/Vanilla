import React, { useEffect, useState } from 'react'
import './css/RecentWatched.css'

export default function RecentWatched() {
    const [count, setCount] = useState(0);
    const [recentImg, setRecentImg] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        window.addEventListener('storage', () => {
            setCount(JSON.parse(sessionStorage.getItem('watched')).length)
            setRecentImg(JSON.parse(sessionStorage.getItem('watched'))[0]+1)
        })
    }, [count, recentImg])

    const handleModal = () => {

    }
    
  return (
    <>
     { JSON.parse(sessionStorage.getItem('watched')).length === 0 ? 
     <div>낫띵</div>
    : 
    <div className='floating_wrapper'>
        <button type='button' className='btn_history' onClick={handleModal}>
            <span className='img_box'>
                <img 
                    src={"https://codingapple1.github.io/shop/shoes" + recentImg + ".jpg"}
                    alt='최근 본 상품'
                />
            </span>
            <span className='count_recent'>{JSON.parse(sessionStorage.getItem('watched')).length}</span>
        </button>
    </div>
        }
    </>
    
    )
}
