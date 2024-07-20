import Header from "../components/Header"
import Navbar1 from "../components/Navbar1"
import Footer from "../components/Footer"
import picture2 from '../assets/picture2.jpeg'
import { Container, Row, Col, Spinner, Button, Modal } from "react-bootstrap"
import { AuthContext } from "../components/AuthProvider";
import { useState, useContext, useEffect } from "react";
import AddGalleryImage from '../components/AddGalleryImage'
import axios from "axios"



const PAGE_SIZE = 9
export default function Gallery() {
    const url = "https://paramount-i0x2.onrender.com";
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchImages();
    }, [currentPage]);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${url}/allgalleryimages`);
            setImages(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleAddProject = async (newImage) => {
        try {
            await axios.post(`${url}/projectimage`, newImage);
            setImages([...images, newImage]);
        } catch (error) {
            console.error('Error adding image:', error);
        }
    };

    const totalPages = Math.ceil(images.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, images.length);
    const currentImages = images.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    // Function to handle clicking on an image
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url}/projectimages/${id}`);
            const updatedImages = images.filter(image => image.id !== id);
            setImages(updatedImages);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };


    return (
        <>
            <Header />
            <Navbar1 />
            <Container fluid>
                <Row>
                    <Col sm={12} className="p-0 position-relative">
                        <img src={picture2} alt="Your image" height="250px" className="w-100" style={{ filter: 'brightness(0.3)' }} />
                    </Col>
                    <h2 style={{ fontFamily: '"Source Sans Pro", sans-serif', left: '60px', top: '250px' }} className="font-weight-bold position-absolute text-white">GALLERY</h2>
                </Row>
            </Container>
            <section style={{ paddingTop: "100px", paddingBottom: "50px" }}>
                <Col sm={12} className="d-flex align-items-center justify-content-center" style={{ marginBottom: "20px" }}>
                    {currentUser && (
                        <AddGalleryImage onAddImage={handleAddProject} />
                    )}
                </Col>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
                    </div>
                ) : (
                    <Container>
                        <Row className="justify-content-center">
                            {currentImages.map((image, index) => (
                                <Col key={index} xs={12} md={4} className="mb-4">
                                    <div className="image-container position-relative" onClick={() => handleImageClick(image)}>
                                        <img src={image.galleryimage} alt={`Image ${index}`} className="img-fluid" style={{ width: '400px', maxHeight: '300px', cursor: 'pointer' }} />
                                        {currentUser && (
                                            <div className="delete-btn-container d-flex justify-content-center">
                                                <Button variant="danger" className="delete-btn" onClick={(e) => { handleDelete(image.id); e.stopPropagation(); }}>Delete</Button>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Row className="justify-content-center mt-3">
                            <Button
                                variant="outline-primary"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                style={{ width: "100px", height: "40px", display: "flex", alignItems: "center", justifyContent: "flex-start", backgroundColor: "white", color: "blue", borderRadius: "10px" }}
                            >
                                <i className="bi bi-arrow-left"></i> Previous
                            </Button>
                            <Button
                                variant="outline-primary"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                style={{ width: "100px", height: "40px", backgroundColor: "white", color: "blue", marginLeft: "10px", borderRadius: "10px" }}
                            >
                                Next <i className="bi bi-arrow-right"></i>
                            </Button>
                        </Row>
                    </Container>
                )}
            </section>
            <Footer />

            {/* Modal for Enlarged Image */}
            {selectedImage && (
                <Modal show={true} onHide={handleCloseModal} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Enlarged Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <img src={selectedImage.galleryimage} alt="Zoomed Image" className="img-fluid" style={{ maxHeight: '80vh', maxWidth: '100%' }} />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};