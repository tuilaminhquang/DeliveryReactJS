
import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, FormControl, InputGroup, Row,  Spinner, Button, Figure } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Apis, { authApi, endpoints } from '../config/Apis';
import Item from './Item';



export default function Receipt(){


    const [receipt, setReceipt] = useState([])
  
    useEffect(() => {
        const loadReceipt = async () => {
            
            // const res = await authApi().get((endpoints['customer-order'])(1))
            const res = await authApi().get(endpoints['receipt'])
            setReceipt(res.data)
            // setOrders(res.data)
             console.log(receipt)
        }

        loadReceipt()
    }, [])
    
    const card =<>
                </>
   



    return(

        
        
        <Container>
            <h1 className="text-center text-danger">DANH SACH ORDER</h1>
            
            {receipt.length === 0 && <Spinner animation="grow" />}
          
       
          
        <Row>
                {receipt.map(c => {

                    return  <Items  id={c.id} order={c.order.id} image={c.order.image} order_name={c.order.order_name}  from_address={c.order.from_address} to_address={c.order.to_address} 
                    price={c.price} status={c.order.status.name}  />
                
                })}
            </Row>


         </Container>   
        
       


    )
}
function Items (props){
    const nav = useNavigate()
    const goToReceipt=()=>{
        
       { 
           nav(`/order/`)

        }

    }
    const changeStatus = async(event) =>{
        console.log(props.orderId)

        event.preventDefault()
        let res = await authApi().post((endpoints['changeStatus'])(props.order),{
        })
        goToReceipt()
    }

         if (props.status == "Da giao")
            return(

                <Col  md={4} xs={12}>
        
                <Card >
                   <Card.Img variant="top" src={props.image}height="350px"   />
                   <Card.Title className="text-center "> Trạng thái : {props.status} </Card.Title>
                   <Card.Body>
                       <Card.Title> Tên đơn hàng : {props.order_name} </Card.Title>
                       <Card.Title> Price :  {props.price}</Card.Title>
                       <Card.Text>
                           From: {props.from_address}  
                       </Card.Text>
                       <br></br>
                       <Card.Text>
                           To :  {props.to_address}
                       </Card.Text>
                      
                   </Card.Body>
                </Card>
           </Col>

            )
    return(

    
        
            <Col  md={4} xs={12}>
        
             <Card height="500px" >
                <Card.Img variant="top" src={props.image} height="350px" />
                <h1 className='text-danger text-center'>{props.status}</h1>
                <Card.Body>
                    <Card.Title> Tên đơn hàng : {props.order_name} </Card.Title>
                    <Card.Title> Price :  {props.price}</Card.Title>
                    <Card.Text>
                        From: {props.from_address}  
                    </Card.Text>
                    <Card.Text>
                        To :  {props.to_address}
                    </Card.Text>
                    <Button variant="primary" onClick={changeStatus} >Xác nhận giao hàng</Button>
                </Card.Body>
             </Card>
        </Col>
     
   
    )

}