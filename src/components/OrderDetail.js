import { useEffect, useState } from "react"
import { Image, Col, Row, Container, Spinner, Figure, Table, Button, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { authApi, endpoints } from "../config/Apis"

 function OrderDetail(){
    const {ordersId} = useParams()

    
    const [orders,setOrders] =useState([])
    const [bid,setBid] =useState([])
    const [toAddress,setToAddress]= useState()
    const [fromAddress,setFromAddress] = useState()
    const [ordername,setOrdername] =useState()
    const [image,setImage] = useState()
    const [status,setStatus]= useState()
   

   
    
    useEffect (()=>{
        const loadOrders = async()=>{
            
            let res = await authApi().get((endpoints['order-detail'](ordersId)))
            setOrders(res.data)
            setToAddress(res.data.to_address)
            setFromAddress(res.data.from_address)
            setOrdername(res.data.order_name)
            setImage(res.data.image_path)
            setStatus(res.data.status.name)
            console.log(orders)

           
        }
      
        loadOrders()
     
    }, [] )
   
    useEffect(()=>{

        const loadBid= async ()=>{
            let list = await authApi().get((endpoints['loadbidding'])(ordersId))
            setBid(list.data)
            console.log(list.data)
            
            
        }


        loadBid()



    }, [])
  

    // if (shipper.user===null)

    //     return <>

    //                 <h1 className="text-center" >Chi Tiet Shipper</h1>
    //                 <Spinner animation='border' />

        
        
    //             </>
    let list = <>
    </>
    if (status=="Dang dau gia")
        list = <>
                
                {
                        bid.map(c => {
                            return <TableBox id={c.id} shipperId={c.shipper.id} first_name={c.shipper.user.first_name} last_name={c.shipper.user.last_name} bid={c.bid} ordersId={c.order.id}  />
                        })
                        
                    } 
            </>



        
    return (

        <Container>

          <h1 className="text-center text-danger" > Chi tiết Đơn hàng</h1>         
         
         <Detail image={image} order_name={ordername} from_address={fromAddress} to_address={toAddress} />  
         <h1>{status}</h1>
         
        <Table>
        <thead>
                <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Bid</th>
                <th>Chọn</th>
                </tr>
        </thead>
        </Table>
        
     
                   {/* {
                        bid.map(c => {
                            return <TableBox id={c.id} first_name={c.shipper.user.first_name} last_name={c.shipper.user.last_name} bid={c.bid} />
                        })
                        
                    }  */}
                    {list}
                   
            
                
        </Container>
    )




}
export default OrderDetail
function Detail (props){
    
    return(
    <Row>
    <Col>
        <Figure>
                <Figure.Image  rounded fluid
                    width={171}
                    height={180}
                    src={props.image}
                />
                
        </Figure>
    </Col>
    <Col>
        <h2> Tên Đơn Hàng : {props.order_name}</h2>
        <p>  Địa chỉ nhận : {props.from_address} </p>
        <p>Địa chỉ gửi : {props.to_address} </p>
    </Col>
</Row>)
}
function TableBox(props){
    const nav = useNavigate()
    const goToOrder =()=>{
        {
            nav(`/my-orders/`)
    
    
        }
    
    }

    
    const addReceipt = async (event)=>{

        event.preventDefault()
        let res = await authApi().post((endpoints['addreceipt'])(props.ordersId),{
            "shipper" : props.shipperId,
            "price" : props.bid ,
            "order" : props.ordersId,

            }
        )
        goToOrder()

    }
    
    return(

        <Row>
            <Form onSubmit={addReceipt}>
             <Table striped bordered hover>

                       
                        <tbody>
                            <tr>
                            <td>{props.id}</td>
                            <td>{props.first_name}</td>
                            <td>{props.last_name}</td>
                            <td>{props.bid}</td>
                            <td><Button type="submit"  > Chọn</Button></td>

                            </tr>              
                        </tbody>                      
                            {/* <Button type="submit"  > Chọn</Button> */}
                        </Table>
                     </Form>
        </Row>
    )
}