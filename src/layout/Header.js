import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { UserContext } from "../App"
import { authApi, endpoints } from '../config/Apis';
import '../components/Css.css';
import cookies from 'react-cookies'



function Header() {
    
    const [kw, setKw] = useState("")
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)
    const [ shipper,setShipper] = useState([])
    const [customer, setCustomer]= useState([])
    


    useEffect(()=>{
        const loadShipper= async()=>{
   
            const res = await authApi().get(endpoints['shippers'])

            setShipper(res.data)
        }
         loadShipper()
       
     
 
    },[])
    useEffect(()=>{
        const loadCustomer = async()=>{
            const cus = await authApi().get(endpoints['customers'])
                setCustomer(cus.data)
                console.log(cus)

        }
            loadCustomer()
            

    },[])

    const search = (event) => {
        event.preventDefault()

        nav(`/?kw=${kw}`)
    }

    const logout = (evt) => {
        dispatch({"type": "logout"})
        
        nav(`/login}`)

       
    }
    
        let btn = <>
        <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>
        </>
        
       


   
   
     
        
    
    if (user != null)
        { 
             let checkShipper = 0
            {
        
                for (let i = 0; i < shipper.length; i++) {
                    if(shipper[i].user['id']==user.id)
                    checkShipper = 1
                    
                }
            }
           
            let checkCustomer = 0
            {
        
                for (let i = 0; i < customer.length; i++) {
                    if(customer[i].user['id']==user.id)
                        checkCustomer= 1
                    
                }
            }

            
          if(checkShipper===1)
                { 
                        btn = <>
                        
                        <Link to="/" className="nav-link text-danger"> Shipper: {user.username} </Link>
                        <Link to="/login" onClick={logout} className="nav-link text-danger">Đăng xuất</Link>
                        <Link to="/order/" className= "nav-link text-danger"  > Orders </Link>
                        <Link to="/receipt" className='nav-link text-danger'>Receipt</Link>

                    </>
               
              }


            else {
                if(checkCustomer===1)   
                     {   btn = 
                            <>
                                <Link to="/" className="nav-link text-danger">{user.username} </Link>
                                <Link to="/login" onClick={logout} className="nav-link text-danger">Đăng xuất</Link>
                                {/* <Link to="/registershiper" className='nav-link text-danger' > Dang Ky Shipper </Link> */}
                                <Link to="/shippers/" className='nav-link text-danger' >Shipper</Link>
                                <Link to="/my-orders" className='nav-link text-danger' >Đơn hàng của tôi</Link>
                                <Link to="/addOrder" className='nav-link text-danger'>Tạo đơn hàng mới</Link>
                            </>
                     }
                else  
                  {
                            btn = 
                            <>
                                <Link to="/" className="nav-link text-danger">{user.username} </Link>
                                <Link to="/login" onClick={logout} className="nav-link text-danger">Dang xuat</Link>
                                <Link to="/registershiper" className='nav-link text-danger' > Dang Ky Shipper </Link>
                                <Link to="/registercustomer/" className='nav-link text-danger'  > Begin </Link>
                            </>  
                        }
                    
            }

  
            
           
        
        // if (shipper.user.id === user.id)
        //     <a>AA</a>

      }
    return (
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"  >
            <Container>
            <Link to="/" className="navbar-brand">E-Delivery Application </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto" fill variant='tabs' >
                    {/* {categories.map(c => {
                        const url = `/?category_id=${c.id}`
                        return <Link to={url} className="nav-link">{c.name}</Link>
                    })} */}
                    
                     {btn}
                </Nav>
                {/* <Form className="d-flex" onSubmit={search}>
                    <FormControl
                        type="search"
                        value={kw}
                        onChange={event => setKw(event.target.value)}
                        placeholder="Tu khoa..."
                        className="me-2"
                        aria-label="Search" />
                    <Button type="submit" variant="outline-success">Tim</Button>
                </Form> */}
            </Navbar.Collapse>
            </Container>
        </Navbar>
        
    )
}

export default Header