import { Button, Card, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function CardShipper  (props){

    const nav = useNavigate()
    const goToShipper = ()=>{
        nav(`/shippers/${props.id}/`)


    }

    return (




        <Col md={4} xs={12}>
            <Card  >
                <Card.Img variant="top" src={props.avatar} height="350px"  />
                <Card.Body>
                    <Card.Title>{props.first_name}</Card.Title>
                    <Button variant="primary" onClick={goToShipper} >Xem chi tiet</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}