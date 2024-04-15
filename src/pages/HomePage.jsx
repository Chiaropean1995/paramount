import '../App.css'
import picture1 from "../assets/picture1.jpeg";
import picture3 from "../assets/picture3.jpeg";
import picture4 from "../assets/picture4.jpeg";
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header'
import Navbar1 from '../components/Navbar1'
import AddProjectModal from '../components/AddProjectModal'
import { useState, useEffect, useContext } from "react"
import { Spinner } from "react-bootstrap";
import { Col, Container, Row, Button, Carousel, Form } from "react-bootstrap";
import axios from "axios"
import { AuthContext } from "../components/AuthProvider";
import { AiOutlineSearch } from "react-icons/ai";



const PAGE_SIZE = 9
export default function ProfilePage() {
    const url = "https://paramount-i0x2.onrender.com"
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
    const pictures = [
        { src: picture1, label: 'Taman Medan Indah', description: 'Affordable comfort awaits at Taman Medan Indah. Enjoy modern living surrounded by nature without breaking the bank.' },
        { src: picture3, label: 'Taman Sungai Serdang Jaya', description: 'Experience luxury at an affordable price at Taman Sungai Serdang Jaya. Indulge in elegance without compromising on budget.' },
        { src: picture4, label: 'Taman Srikandi', description: 'Discover affordable sophistication at Taman Srikandi. Enjoy stylish living with community charm within your budget.' },
    ];
    const { currentUser } = useContext(AuthContext);



    useEffect(() => {
        // Fetch data from your backend API when the component mounts
        fetchProjects();
    }, [currentPage]);


    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${url}/allprojects`);
            setProjects(response.data); // Set the fetched projects to state
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`${url}/projects/${id}`);
            fetchProjects(); // Fetch updated bookings after deletion
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };


    const handleAddProject = async (newProject) => {
        try {
            // Add the new project to the database
            await axios.post(`${url}/projects`, newProject);

            // Log the new project data
            console.log('New Project Data:', newProject);

            // Update state with the new project
            setProjects(prevProjects => [...prevProjects, newProject]);
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const totalPages = Math.ceil(projects.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, projects.length);
    const currentProjects = projects.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the index or reset to 0 if it reaches the end
            setCurrentPictureIndex((prevIndex) => (prevIndex + 1) % pictures.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup function to clear the interval
    }, [pictures.length]);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Update the search term state
    };

    const filteredProjects = currentProjects.filter((project) =>
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Filter the projects based on the search term

    const handleViewProjects = () => {
        const projectSection = document.getElementById("projectListingSection");
        if (projectSection) {
            projectSection.scrollIntoView({ behavior: "smooth" });
        }
    };


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
                                    <img src={picture.src} alt={`Slide ${index + 1}`} className="d-block w-100 carousel-image brighten" />
                                    <Carousel.Caption className="slide-in-bottom">
                                        {index === 0 && (
                                            <Button className="slide-in-bottom" variant="primary" onClick={() => handleViewProjects()} style={{ marginBottom: "200px", backgroundColor: "transparent", border: "1px solid white", borderRadius: "0px", padding: "20px" }}>VIEW PROJECTS <i className="bi bi-arrow-down"></i>
                                            </Button>
                                        )}
                                        <h3>{picture.label}</h3>
                                        <p>{picture.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                </Row>
            </Container>


            <section id="projectListingSection" className="latest-projects" style={{ paddingTop: "50px" }}>
                <Container>
                    <p className="text-center" style={{
                        fontStyle: 'italic', color: "grey"
                    }}>Properties for sale</p>
                    < h2 className="text-center mb-4" > OUR LATEST PROJECT LISTINGS</h2>
                    <Form.Group className="d-flex justify-content-end">
                        <div className="input-group" style={{ width: "200px" }}>
                            <Form.Control
                                type="text"
                                placeholder="Search by location"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <Button variant="outline-primary">
                                <AiOutlineSearch />
                            </Button>
                        </div>
                    </Form.Group>

                    <Col sm={12} className="d-flex align-items-center justify-content-center" style={{ marginBottom: "20px" }}>
                        {currentUser && (
                            <AddProjectModal onAddProject={handleAddProject} />
                        )}
                    </Col>
                    {loading ? ( // Render spinner if loading
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
                        </div>
                    ) : (
                        <Row >
                            {filteredProjects.length === 0 ? (
                                <p className="text-center" style={{ color: 'red', fontStyle: 'italic' }}>No projects found</p>
                            ) : (
                                <Row>
                                    {filteredProjects.map((project, index) => (
                                        <Col key={index} sm={12} md={4} className="mb-5">
                                            <ProjectCard
                                                key={project.id}
                                                id={project.id}
                                                price={project.price}
                                                image_url={project.image_url}
                                                title={project.title}
                                                location={project.location}
                                                description={project.description}
                                                car_park={project.car_park}
                                                bathroom={project.bathroom}
                                                bedroom={project.bedroom}
                                                room_size={project.room_size}
                                                progress_percentage={project.progress_percentage}
                                                onDelete={() => handleDeleteProject(project.id)}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Row>

                    )}
                    {filteredProjects.length > 0 && (
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
                    )}
                </Container>
            </section >
            <Footer />
        </>
    );
}

