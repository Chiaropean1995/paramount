import Header from "../components/Header"
import Navbar1 from "../components/Navbar1"
import Footer from "../components/Footer"
import { Container, Row, Col, Form } from "react-bootstrap";
import picture2 from "../assets/picture2.jpeg"
import { useState } from "react";
import axios from "axios"

export default function ContactUs() {
    const url = "https://paramount-i0x2.onrender.com"
    const [contacts, addContacts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        subject: '',
        message: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/contact`, { ...formData });
            // After successful submission, fetch updated booking data for the current user only
            console.log(response.data);
            addContacts(response.data);
            window.alert('Submit Successfully');
            // Clear form data
            setFormData({
                name: '',
                phone_number: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };






    return (

        <>
            <Header />
            <Navbar1 />
            <Container fluid>
                <Row>
                    <Col sm={12} className="p-0 position-relative">
                        <img src={picture2} alt="Your image" height="250px" className="w-100 " style={{ filter: 'brightness(0.3)' }}></img>
                    </Col>
                    <h2 style={{ fontFamily: '"Source Sans Pro", sans-serif', left: '60px', top: '250px' }} className="font-weight-bold position-absolute text-white ">CONTACT US</h2>

                </Row>
            </Container>

            <Container style={{ paddingTop: "100px" }}>
                <Row className="justify-content-center align-items-stretch">
                    <Col xs={12} md={6} className=" p-0  d-flex">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.1683991329314!2d101.44373708051346!3d3.049534345853114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc536627bb5bbf%3A0x6b99067098bb50a1!2sPerangsang%20Sentosa%20Sdn.%20Bhd.!5e0!3m2!1sen!2smy!4v1711784013370!5m2!1sen!2smy" style={{ width: "100%", height: "100%" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </Col>
                    <Col xs={12} md={6} className="border shadow p-5 d-flex flex-column p-0" >
                        <div className="text-center">
                            <h4 style={{ fontFamily: '"Source Sans Pro", serif', borderBottom: '2px solid blue', paddingBottom: '5px', width: "auto" }}>CONTACT US</h4>
                            <p style={{ fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '13px' }}>Please fill out the form below to get in touch with us.</p>
                        </div>
                        <Form onSubmit={handleSubmit} >
                            <Form.Group controlId="name">
                                <Form.Label className="text-secondary" style={{ fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '13px' }}>Name:</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="border-0 border-bottom rounded-0 shadow-none" required />
                            </Form.Group>
                            <Form.Group controlId="phone_number">
                                <Form.Label className="text-secondary" style={{ fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '13px' }}>Phone Number:</Form.Label>
                                <Form.Control type="text" name="phone_number" placeholder="Enter your phone" value={formData.phone_number} onChange={handleInputChange} className="border-0 border-bottom rounded-0 shadow-none" required />
                            </Form.Group>
                            <Form.Group controlId="subject">
                                <Form.Label className="text-secondary" style={{ fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '13px' }}>Subject:</Form.Label>
                                <Form.Control type="text" name="subject" placeholder="Enter your subject" value={formData.subject} onChange={handleInputChange} className="border-0 border-bottom rounded-0 shadow-none" required />
                            </Form.Group>
                            <Form.Group controlId="message">
                                <Form.Label className="text-secondary" style={{ fontFamily: 'Lato, Helvetica, Arial, sans-serif', fontSize: '13px' }}>Message:</Form.Label>
                                <Form.Control as="textarea" rows={3} name="message" placeholder="Your message" value={formData.message} onChange={handleInputChange} className="border-0 border-bottom rounded-0 shadow-none" required />
                            </Form.Group>
                            <div className="text-center">
                                <button type="submit" className="border-0 mt-3" style={{ backgroundColor: "#e75635", color: "white", width: "200px", height: "40px" }}>SUBMIT</button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>


            <Footer />
        </>
    )
}

