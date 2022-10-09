import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Apis, { authApi, endpoints } from "../config/Apis";

export default function RegisterShiper(){
    const [CMND,setCMND] = useState([])
    const [user, dispatch] = useContext(UserContext)

    const nav=useNavigate()
    const goToLogin= ()=>{


        {nav(`/login/`)}
    }
    const logout = (evt) => {
        dispatch({"type": "logout"})
    }
    const addShipper = async (event) =>{

        event.preventDefault()
        const res = await authApi().post(endpoints['register-shipper'],{
            'identity_number': CMND,
        })
        logout()
        goToLogin()
        console.log(res.data)
        
        setCMND('')
    }
    
    


    return(
        <Container>
        <h1 className="text-center text-danger">Dang Ky Shiper</h1>
        <Form onSubmit={addShipper}>
        <Form.Group className="mb-3" controlId="CMND">
        <Form.Label>CMND</Form.Label>
        <Form.Control type="text" 
                      value={CMND}
                      onChange={(event) =>{ setCMND(event.target.value )}}/>
        </Form.Group>
            <Button variant="primary" type="submit">
                Dang ky
            </Button>
        </Form>
        </Container>
    )





}