import React, { useState, useContext } from 'react'
import { Form, Button, Container, Col } from 'react-bootstrap'
import { UserContext } from '../App'
import { Link, Navigate } from 'react-router-dom'
import Apis, {endpoints, authApi} from '../config/Apis'
import cookies from 'react-cookies'
import "./Css.css"



const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(UserContext)

    const login = async (evt) => {
        evt.preventDefault() 
         
        const res = await Apis.post(endpoints['login'], {
            'username': username,
            'password': password,
            'client_id': 'tlCn0efodTEDdzxoPmm3tPjFV8l7MxNuC36lSyxS',
            'client_secret': 'Y4VjIfyzmZr2gWIWX6WDWUPtcIxTbzd8FnQUuFUgEGf71eAr5KQX6eKB4LmHQgMaJfWOEhlOlhuyJ4xFScFgR659VnZmqRLlqFywvx2dXlLG0v8wUFzsivexy2MgZout',
            'grant_type': 'password'
        })

        console.info(res.data)
        cookies.save('token', res.data.access_token)

        const user = await authApi().get(endpoints['current-user'])
        console.info(user.data)
        dispatch({
            'type': 'login',
            'payload': user.data
        })
    }
   


    if (user != null)
        return <Navigate to="/" />
        
    return (
        <div  className="sign-up-container form form-container">
        <Container >
            <h1 className="text-center text-danger">ĐĂNG NHẬP</h1>
            <Col >
            <Form onSubmit={login} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" 
                        value={username} 
                        onChange={(evt) => setUsername(evt.target.value)}
                        placeholder="Nhap username" 
                        required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                            value={password} 
                            onChange={(evt) => setPassword(evt.target.value)}
                            placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
               <Button className="button "> <Link to="/register" className='link' >Đăng ký</Link></Button>
            </Form>
            </Col>
        </Container>
        </div>
    )
}

export default Login