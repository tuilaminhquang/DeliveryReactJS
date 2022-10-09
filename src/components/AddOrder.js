
import { useRef, useState } from "react"
import { Container, Form , Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { authApi, endpoints } from "../config/Apis"

export default function AddOrder() {

        const [ordername, setOrdername] = useState()
     
        const [km, setKm]= useState()
        const[fromAddress, setFromAddress] = useState()
        const[toAddress,setToAddress] = useState()
        const image =useRef()
        const nav = useNavigate()
        const goToOrder = ()=>{
           
            {
                nav(`/my-orders/`)
            }

        }

        const Addorders = (event) => {
            event.preventDefault()
            
            let AddOder = async () => {
                const formData = new FormData()
                formData.append("order_name", ordername)
                formData.append("from_address", fromAddress)
                formData.append("to_address",toAddress)
                formData.append("km",km)
                formData.append("image", image.current.files[0])
                try {
                    await authApi().post(endpoints['addOrder'], formData,{
                        headers: {
                            "Content-Type" :   "multipart/form-data"
                        }
                    }) 
        
                   
                } catch (err) {
                    console.error(err)
                }
                
            }
                AddOder()
             goToOrder()
        }





    return(
        <Container>
            <h1 className="text-center text-success" >Dat Hang</h1>
            <Form onSubmit={Addorders} >
                <AddOrderForm    id="odrername" label="Order Name" 
                                 type="text" value={ordername}
                                 change={(event) => setOrdername(event.target.value)}  />  
                <AddOrderForm    id="fromAddress" label="From" 
                                 type="text" value={fromAddress}
                                 change={(event) => setFromAddress(event.target.value)}  />
                <AddOrderForm    id="toAddress" label="To" 
                                 type="text" value={toAddress}
                                 change={(event) => setToAddress(event.target.value)}  />  
                <AddOrderForm    id="km" label="KM" 
                                 type="text" value={km}
                                 change={(event) => setKm(event.target.value)}  />    
                <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" ref={image} className="form-control" />
                </Form.Group>                 

                <Button variant="primary" type="submit"> Dat Hang </Button>
            </Form>
        </Container>

    )

    
}



function AddOrderForm(props) {
    return (
    <Form.Group className="mb-3" controlId={props.id}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control type={props.type} 
                      value={props.value}
                      onChange={props.change} />
    </Form.Group>
  )
} 