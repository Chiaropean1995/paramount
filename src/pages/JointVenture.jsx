import Header from '../components/Header'
import Navbar1 from '../components/Navbar1'
import { Container, Row, Col } from 'react-bootstrap'
import picture2 from '../assets/picture2.jpeg'
import jointventure from '../assets/jointventure.jpg'
import Footer from '../components/Footer'

export default function JointVenture() {
    return (
        <>
            <Header />
            <Navbar1 />
            <Container fluid>
                <Row>
                    <Col sm={12} className="p-0 position-relative">
                        <img src={picture2} alt="Your image" height="250px" className="w-100 " style={{ filter: 'brightness(0.3)' }}></img>
                    </Col>
                    <h2 style={{ fontFamily: '"Source Sans Pro", sans-serif', left: '60px', top: '250px' }} className="font-weight-bold position-absolute text-white ">JOINT VENTURE</h2>
                </Row>
            </Container>
            <Container style={{ marginTop: "100px" }}>
                <Col sm={12} md={6} className="joint-venture-page">
                    <h4>JOINT VENTURE OPPORTUNITIES</h4>
                    <img src={jointventure} alt="About us images" height="500px" width="650px" className="toHide"></img>
                    <p className="mt-3 text-muted" style={{ fontFamily: '"Source Sans Pro", sans-serif' }}>We are looking for landowners with vacant land who want to team up with us for exciting property development projects. If you own vacant land and want to see it transformed into something remarkable, we have the experience and expertise to make it happen. With over 20 years in the industry, we have successfully completed numerous projects. Now, we invite you to join forces with us to turn your land into thriving communities, industrial zones, or residential spaces. Let&apos;s work together to unleash the full potential of your land and create exceptional properties. Contact us to explore the joint venture opportunities we offer. Please contact 016-207 2920 for more detail.</p>
                    <hr />
                </Col>
            </Container>
            <Footer />


        </>
    )
}