import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Apis, { authApi, endpoints } from "../config/Apis";

export default function RegisterCustomer(){
    
    const nav = useNavigate()
    const [phone,setPhone] = useState()
    const [user, dispatch] = useContext(UserContext)

    const goToLogin=()=>{


       { nav(`/login/`)}
    }
    const logout = (evt) => {
        dispatch({"type": "logout"})
    }
    const addCustomer = async (event) =>{

        event.preventDefault()
        const res = await authApi().post(endpoints['registercustomer'],{
            'phone': phone,
        })
        console.log(res.data)
        logout()
        goToLogin()
        
        
    }
    
    


    return(
        <Container>
        <h1 className="text-center text-danger">Get Start</h1>
       
        <Form onSubmit={addCustomer} >
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" 
                      value={phone}
                      onChange={(event) =>{ setPhone(event.target.value )}}/>
            <Button variant="primary" type="submit" className="position ">
                Start
            </Button>
        </Form>
       
        </Container>
    )





}