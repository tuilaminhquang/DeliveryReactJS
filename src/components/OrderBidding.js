
import { useEffect, useState } from "react"
import { Image, Col, Row, Container, Spinner, Figure, FormControl,Form,Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { authApi, endpoints } from "../config/Apis"

 function OrderBidding(){
    
    const [orders,setOrders] =useState([])
    const [bidding,setBidding] = useState()
    const {ordersId} = useParams()
    const nav=useNavigate()
    const goToOrder=()=>{

        {
            nav(`/order/`)
        }

    }

    
    useEffect (()=>{
        const loadOrders = async()=>{
            
            let res = await authApi().get((endpoints['order-detail'](ordersId)))
            setOrders(res.data)
            console.log(orders)

           
        }
        loadOrders()
     
    }, [] )
    const addBidding = async (event)=>{
        event.preventDefault()
        let res = await authApi().post(((endpoints['addbidding'])(ordersId)),{
            'bid': bidding,
        })
        setBidding(' ')
        goToOrder()


    }
   

    // if (shipper.user===null)

    //     return <>

    //                 <h1 className="text-center" >Chi Tiet Shipper</h1>
    //                 <Spinner animation='border' />

        
        
    //             </>
        
    return (

        <Container>

          <h1 className="text-center text-danger" > Chi tiet Order</h1>         
         
         <Detail image={orders['image']} order_name={orders.order_name} from_address={orders['from_address']} to_address={orders['to_address']} />  


         <Form onSubmit={addBidding}>
             <FormControl type="text" value={bidding} onChange={(event) => setBidding(event.target.value)}  ></FormControl>
             <Button type="submit" variant='primary' >Bidding</Button>
         </Form>
        </Container>

    )




}
export default OrderBidding
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
        <h2> Ten Don Hang : {props.order_name}</h2>
        <p>  Dia Chi Nhan : {props.from_address} </p>
        <p>Dia Chi Gui : {props.to_address} </p>
    </Col>
</Row>)
}