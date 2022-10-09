import {  useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { authApi, endpoints } from "../config/Apis";
import CardShipper from "./CardShipper";
 
export default function ShipperList(){
    const [shipper,setShipper]= useState([])
 
 
    useEffect(()=>{
        const loadShipper= async()=>{
   
            const res = await authApi().get(endpoints['shippers'])
            setShipper(res.data)
        }
         loadShipper()
 
     
 
    },[])

    return(
 
        <Container>
       
        <h1 className="text-center text-danger m-5 badge">Đánh giá và bình luận Shipper</h1>

            <Row >
                {shipper.map(c =>
                    <CardShipper id={c.id} avatar={c.user['avatar']} first_name={c.user['first_name']}  />
                )}
            </Row>
        </Container>
    )
 
 
 
   
 
 
 
}
