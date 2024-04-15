import Header from "../components/Header"
import Navbar1 from "../components/Navbar1"
import { useEffect, useState } from "react"
import picture6 from "../assets/picture6.jpeg";
import picture7 from "../assets/picture7.jpeg";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import agent from "../assets/agent.jpeg"

export default function ProjectDetail182() {
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
    const pictures = [
        { src: picture6 },
        { src: picture7 },
    ];

    useEffect(() => {
        // Scroll to the top of the page when the component mounts or renders
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the index or reset to 0 if it reaches the end
            setCurrentPictureIndex((prevIndex) => (prevIndex + 1) % pictures.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup function to clear the interval
    }, [pictures.length]);

    function openWhatsApp() {
        const phoneNumber = '60162072920'; // Replace with your phone number
        const message = '';
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    }
    return (
        <>
            <Header />
            <Navbar1 />

            <Container fluid>
                <Row>
                    <Col sm={12} className="p-0">
                        <Carousel
                            activeIndex={currentPictureIndex}
                            onSelect={(index) => setCurrentPictureIndex(index)}
                            interval={5000} // 5 seconds interval
                            pause={false} // Prevent pausing on hover
                            className="carousel-container"
                        >
                            {pictures.map((picture, index) => (
                                <Carousel.Item key={index} className="carousel-item">
                                    <img src={picture.src} alt={`Slide ${index + 1}`} className="carousel-image" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                </Row>
            </Container>
            <Row className="d-flex border p-4 shadow rounded">
                <Col sm={12} md={6} className="border-0 d-flex rounded project-detail-content" style={{ backgroundColor: "#f3f1f1" }}>
                    <Col sm={12}>

                        <div className="border ms-3 text-center text-white rounded mb-2 mt-2" style={{ fontFamily: "sans-serif", width: "200px", backgroundColor: "#ff6600" }}>
                            Open for registration
                        </div>
                        <h4 className="ms-3" style={{ fontFamily: "sans-serif" }}>Double Storey Terrace</h4>
                        <h6 className="ms-3" style={{ fontFamily: "sans-serif" }}><i className="fa-solid fa-location-dot" style={{ color: "#ff3333" }}></i>  Taman Salak Lestari,Sepang</h6>
                        <h6 className="ms-3" style={{ fontFamily: "sans-serif" }}>From RM 500,000</h6>

                        <Row>
                            <h5 className="ms-3 mt-3 mb-4" style={{ fontFamily: "sans-serif", fontSize: "15px", fontWeight: "bold", color: "#333" }}>PROPERTY INFORMATION</h5>
                            <div className="icons d-flex justify-content-around" style={{ fontFamily: "sans-serif" }}>
                                <span><i className="fa fa-car text-muted me-2" aria-hidden="true"></i> 2 Carpark</span>
                                <span><i className="fa fa-bath text-muted me-2" aria-hidden="true"></i> 4 Bathroom</span>
                                <span><i className="fa fa-bed text-muted me-2" aria-hidden="true"></i> 4 Bedroom</span>
                                <span><i className="fa fa-square text-muted me-2" aria-hidden="true"></i> 1800 Sq ft</span>
                            </div>
                        </Row>
                        <hr />
                        <h6 className="ms-3"><b>DESCRIPTION</b></h6>
                        <p className="ms-3 text-muted" style={{ fontFamily: "sans-serif" }}>The property is a double-storey terrace located in Sepang, offering a comfortable and modern living space. Priced at RM500,000, it presents an attractive opportunity for prospective buyers seeking an affordable yet quality home. With its strategic location in Sepang, residents can enjoy convenient access to essential amenities and facilities while indulging in the tranquility of suburban living. The double-storey design provides ample space for families, featuring multiple bedrooms, bathrooms, and a generous living area. Whether for investment or personal residence, this property offers both value and comfort, making it an ideal choice for those looking to settle in the vibrant locale of Sepang.</p>
                        <hr />
                        <div className="d-flex">
                            <div className="d-flex align-items-center" style={{ height: "80px" }} >
                                <img src={agent} alt="Description of the image" className="ms-5 p-2 me-5" style={{ borderRadius: '50%', height: "100px", width: "100px" }} />
                            </div>
                            <div className="d-flex align-items-center">
                                <Button href="mailto:paramountvalley@live.com" style={{
                                    cursor: 'pointer', height: "40px", color: "white", backgroundColor: " #3377ff"
                                }}>
                                    < i className="fa-solid fa-envelope me-1 text-white" ></i>Contact Agent
                                </Button>
                            </div>
                            <div className="d-flex align-items-center ms-5">
                                <Button onClick={openWhatsApp} style={{ cursor: "pointer", height: "40px", width: "150px", color: "black", backgroundColor: "transparent", border: "1px solid black" }}>
                                    <i style={{ fontSize: "20px" }} className="fa-brands fa-whatsapp"></i> Whatapps
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Col >
                <Col sm={12} md={6} className="project-detail-map">
                    <MapContainer center={[2.79564, 101.71454]} zoom={13} style={{ height: "600px", width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[2.79564, 101.71454]}></Marker>
                    </MapContainer>
                </Col>
            </Row >





        </>
    )
}