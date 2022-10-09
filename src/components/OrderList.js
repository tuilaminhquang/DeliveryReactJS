
import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, FormControl, InputGroup, Row,  Spinner, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Apis, { authApi, endpoints } from '../config/Apis';
import Item from './Item';



export default function OrderList(){


    const [orders, setOrders] = useState([])
  
    useEffect(() => {
        const loadOrders = async () => {
            
            // const res = await authApi().get((endpoints['customer-order'])(1))
            const res = await authApi().get(endpoints['shipper-view'])
            setOrders(res.data)
            // setOrders(res.data)
             console.log(orders)
        }

        loadOrders()
    }, [])



    return(

        <>
        
        <Container>
            <h1 className="text-center text-danger">DANH SACH ORDER</h1>
            
            {orders.length === 0 && <Spinner animation="grow" />}
            
            <Row>
                {orders.map(c => {

                    return  <Items id={c.id}  image={c['image']} order_name={c['order_name']}  from_address={c['from_address']} to_address={c['to_address']}   />
                
                })}
            </Row>
        </Container>   

        
        
        </>


    )
}
function Items (props){
    const nav = useNavigate()
    const goToDetail = ()=>{
        nav(`/bidding/${props.id}/`)


    }

    return(
        <Col md={4} xs={12}>
        <Card   >
                <Card.Img variant="top" src={props.image} height="350px"/>
                <Card.Body>
                        <Card.Title>Ten Don Hang: {props.order_name}</Card.Title>
                        <Card.Text>
                            From : {props.from_address}     

                        </Card.Text>
                        <br/>
                        <Card.Text>
                              To : {props.to_address}

                        </Card.Text>
                        <Button variant="primary"  onClick = {goToDetail} >Đấu giá đơn hàng</Button>
                 
                    
                                
                        
                    
                 </Card.Body>

        </Card>
        </Col>
    )
}