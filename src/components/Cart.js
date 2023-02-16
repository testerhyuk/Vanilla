import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Cart() {
    const location = useLocation();
    const [cart, setCart] = useState([]);
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>금액</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{location.state.productId}</td>
                    <td>{location.state.title}</td>
                    <td>{location.state.quantity}</td>
                    <td>{location.state.price * location.state.quantity}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
