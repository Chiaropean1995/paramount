import { Row, Col, Form, FormGroup, Button, NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../App.css"
import { useRef } from "react"
import axios from "axios"

import companylogo1 from "../assets/companylogo1.png"
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer({ noPaddingTop }) {
    const url = "https://paramount-i0x2.onrender.com"
    const formRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [formData, setFormData] = useState({
        email: '',
    });


    window.onscroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to submit the email
            await axios.post(`${url}/email`, { email });
            // Show a success message
            toast.success("Email submitted successfully!");
            // Reset the form input after displaying the alert
            formRef.current.reset(); // Reset the form using the ref
            setEmail(""); // Clear the email state
            setFormData({ ...formData, email: '' }); // Clear the email field in formData
        } catch (error) {
            console.error("Error submitting email:", error);
            // Check if the error is due to duplicate email
            {
                alert("You have already submitted this email.");
            }
        }
    };
    const handleInputChange = (e) => {
        setFormData({ ...formData, email: e.target.value }); // Update the email field in formData
        setEmail(e.target.value); // Update the email state
    };

    const footerStyle = {
        paddingTop: noPaddingTop ? "0" : "100px", // Conditionally set padding based on the prop
        backgroundColor: "#101b25",
        height: "50px",
        width: "100%",
        margin: 0,
        padding: 0
    };

    return (
        <>
            <div style={{ footerStyle, paddingTop: "100px" }}>
                <div className="extended-background1" style={{ backgroundColor: "#101b25", height: "50px", witdh: "100%", margin: 0, padding: 0 }} >
                    {/* Outer layer */}
                </div>
                <div>
                    <div className="bg-light" style={{ width: "100%" }}>
                        {/* Middle layer */}
                        <div className="container-fluid px-0" style={{ width: "100%", margin: 0, padding: 0 }}>
                            <div className="row extended-background2" style={{ backgroundColor: "grey", height: "500px", width: "100%", margin: 0, padding: 0 }}>
                                <div className="col-md-12 text-center py-4">
                                    <Row className="position-relative">

                                        <Col sm={12} md={3} className="ms-0 bottom-content1">
                                            <img src={companylogo1} alt="Your Logo" height="100" width="250px" style={{ marginLeft: "60px", margin: 0, padding: 0 }} />
                                            <div className=" ms-5 p-3">
                                                <p className="text-white mt-4" style={{ textAlign: "left" }}>
                                                    Building extraordinary properties demands exceptional
                                                    attention to detail. We believe in preserving and cherishing every
                                                    development opportunity, ensuring that each project takes root and
                                                    flourishes just like the communities we nurture.
                                                </p>
                                                <ul className="social-links list-unstyled d-flex mt-5">
                                                    <li><a href="https://www.facebook.com/profile.php?id=100063044389705"><i className="fa-brands fa-square-facebook fa-2x me-4 text-muted"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-twitter fa-2x me-4 text-muted"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-google fa-2x me-4 text-muted"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-linkedin fa-2x me-4 text-muted"></i></a></li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={3} className="ms-0">
                                            <div className="toHide bottom-content1" style={{ textAlign: "left", marginLeft: "30px" }}>
                                                <h4 className="text-white">Address</h4>
                                                <div>
                                                    <ul className="list-unstyled">
                                                        <li className="d-flex text-white mt-5">
                                                            <div><i className="fa-solid fa-location-dot me-3"></i></div>
                                                            20B, Jalan Taman, Selangor.
                                                        </li>
                                                        <li className="d-flex text-white mt-5">
                                                            <div><i className="fa-solid fa-phone me-3"></i></div>
                                                            +60-XXXX XXXX
                                                        </li>
                                                        <li className="d-flex text-white mt-5">
                                                            <div><i className="fa-regular fa-envelope me-3"></i></div>
                                                            paramountvalley@live.com
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>

                                        <Col sm={12} md={3} className="ms-0">
                                            <div className="toHide bottom-content2" style={{ textAlign: "left", marginLeft: "30px" }}>
                                                <h4 className="text-white">LINKS</h4>
                                                <div>
                                                    <ul className="list-unstyled">
                                                        <li className="footer-links text-white mt-5">
                                                            <NavLink as={Link} to="/profilepage" className="text-decoration-none text-white nav-link">
                                                                <i className="footer-icon bi bi-chevron-right text-white"></i> Home
                                                            </NavLink>
                                                        </li>
                                                        <li className="footer-links text-white mt-3">
                                                            <NavLink as={Link} to="/aboutus" className="text-decoration-none text-white nav-link">
                                                                <i className="footer-icon bi bi-chevron-right text-white"></i> About Us
                                                            </NavLink>
                                                        </li>
                                                        <li className="footer-links text-white mt-3">
                                                            <NavLink as={Link} to="/jointventure" className="text-decoration-none text-white nav-link">
                                                                <i className="footer-icon bi bi-chevron-right text-white"></i> Joint Venture
                                                            </NavLink>
                                                        </li>
                                                        <li className="footer-links text-white mt-3">
                                                            <NavLink as={Link} to="/contactus" className="text-decoration-none text-white nav-link">
                                                                <i className="footer-icon bi bi-chevron-right text-white"></i> Contact Us
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={3} >
                                            <div className="toHide bottom-content2" style={{ textAlign: "left", marginRight: "50px" }}>
                                                <h4 className="text-white">NEWSLETTER</h4>
                                                <div className="text-white mt-5">Subscribe to our newsletter and we will inform you about newest projects and promotions</div>
                                                <Form className="d-flex align-items-center" onSubmit={handleSubmit} ref={formRef}>
                                                    <FormGroup className="mt-3 mb-0 me-0 flex-grow-1">
                                                        <Form.Control className="rounded-0" type="email" name="Email" placeholder="Email" autoComplete="on" onChange={handleInputChange} required />
                                                    </FormGroup>
                                                    <Button type="submit" variant="primary" className="rounded-0" style={{ verticalAlign: "middle", marginTop: "15px" }}>
                                                        <span className="fa fa-paper-plane"></span>
                                                    </Button>
                                                </Form>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <div style={{ backgroundColor: "#101b25", height: "50px", width: "100%", margin: 0, padding: 0 }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 mt-0">
                                <div className="text-white small-font copy-right">&copy; 2024 Paramount Valley Development. All Rights Reserved</div>
                            </div>
                            <div className="toHide col-md-6 mt-3">
                                <ul className="list-unstyled d-flex justify-content-end bottom-links">
                                    <li><NavLink as={Link} to="/profilepage" className="text-white text-decoration-none me-5 link-hover">Home</NavLink></li>
                                    <li><NavLink as={Link} to="/aboutus" className="text-white text-decoration-none me-5 link-hover">About</NavLink></li>
                                    <li><NavLink as={Link} to="/jointventure" className="text-white text-decoration-none me-5 link-hover">Joint Venture</NavLink></li>
                                    <li><NavLink as={Link} to="/contactus" className="text-white text-decoration-none me-5 link-hover">Contact</NavLink></li>
                                    <button
                                        className={`rounded-pill border scroll-to-top text-white ${isVisible ? 'visible' : 'hidden'}`}
                                        style={{ backgroundColor: "black", position: "fixed", bottom: "20px", right: "20px" }}
                                        onClick={scrollToTop}
                                    >
                                        ↑
                                    </button>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div >
            </div >
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


        </>
    )
} 