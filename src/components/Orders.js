import React, { useState, useEffect } from 'react';
import { Container, Row,  Spinner } from 'react-bootstrap';
import  { authApi, endpoints } from '../config/Apis';
import Item from './Item';

export default function Orders() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const loadOrders = async () => {
            
            // const res = await authApi().get((endpoints['customer-order'])(1))
            const res = await authApi().get(endpoints['my-orders'])
            setOrders(res.data)
            // setOrders(res.data)
             console.log(orders)
        }

        loadOrders()
    }, [])

    return (
        <Container>
            <h1 className="text-center text-danger">CÁC ĐƠN HÀNG CỦA TÔI</h1>
            
            {orders.length === 0 && <Spinner animation="grow" />}
            
            <Row>
                {orders.map(c => {
                    return <Item id={c.id}  image={c['image']} order_name={c['order_name']} />
                })}
            </Row>
        </Container>   
    )
}

