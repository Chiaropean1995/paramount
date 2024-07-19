import Header from '../components/Header'
import Navbar1 from '../components/Navbar1'
import { Container, Row, Col } from 'react-bootstrap'
import picture2 from '../assets/picture2.jpeg'
import Aboutus from '../assets/Aboutus.jpeg'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <>
            <Header />
            <Navbar1 />
            <Container fluid>
                <Row>
                    <Col sm={12} className="p-0 position-relative">
                        <img src={picture2} alt="Your image" height="250px" className="w-100 " style={{ filter: 'brightness(0.3)' }}></img>
                    </Col>
                    <h2 style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial,Source Sans Pro, sans-serif', left: '60px', top: '250px' }} className="font-weight-bold position-absolute text-white ">ABOUT US</h2>
                </Row>
            </Container>
            <Container style={{ marginTop: "100px", paddingBottom: "50px" }}>
                <Row>
                    <Col md={6} className="about-us-content">
                        <p style={{ fontStyle: "italic", color: "grey" }}>About Paramount Valley Development Sdn.Bhd.</p>
                        <h4 >WHO WE ARE</h4>
                        <p style={{ color: "grey", lineHeight: 2.0 }}> Paramount Valley Development Sdn.Bhd. boasts over two decades of property development expertise, leaving an indelible mark in the Klang area, Telok Panglima Garang, Kuala Selangor, and Sepang with a portfolio of 20 diverse projects encompassing industrial,residential, and shoplot developments.Our commitment goes beyond construction,we foster lasting relationships, innovate for sustainbility, and empower communities. As we shape the future, we invite you to join us in crafting remarkable spaces that enrich lives and businesses.Welcome to Paramount Valley Development,your partner in building tomorrow&apos;s.</p>
                        <Link
                            to="/contactus"
                            className="btn btn-primary border-0"
                            style={{
                                backgroundColor: "#1b2936",
                                borderRadius: 0,

                            }}
                        >
                            Find out more
                        </Link>
                    </Col>
                    <Col md={6} className="about-us-picture">
                        <img src={Aboutus} alt="About us images" height="330px" className="toHide"></img>
                    </Col>
                </Row>
            </Container >
            <Footer />
        </>
    )
}