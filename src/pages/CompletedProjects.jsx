import Header from "../components/Header"
import Navbar1 from "../components/Navbar1"
import picture2 from '../assets/picture2.jpeg'
import { Container, Row, Col, Spinner, Button, Form } from "react-bootstrap"
import Footer from "../components/Footer";
import AddCompleteProjectModal from '../components/AddCompleteProjectModal'
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../components/AuthProvider";
import CompleteProjectCard from '../components/CompleteProjectCard';
import { AiOutlineSearch } from "react-icons/ai";



const PAGE_SIZE = 5
export default function CompletedProjects() {
    const url = "http://localhost:3000"
    const [completedProjects, setCompletedProject] = useState([])
    const { currentUser } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        // Fetch data from your backend API when the component mounts
        fetchCompletedProjects();
    }, []);


    const fetchCompletedProjects = async () => {
        try {
            const response = await axios.get(`${url}/allcompletedprojects`);
            setCompletedProject(response.data); // Set the fetched projects to state
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };




    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`${url}/completedprojects/${id}`);
            fetchCompletedProjects(); // Fetch updated bookings after deletion
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };


    const totalPages = Math.ceil(completedProjects.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, completedProjects.length);
    const currentProjects = completedProjects.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };


    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Update the search term state
    };

    const filteredProjects = currentProjects.filter((project) =>
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Filter the projects based on the search term


    return (
        <>
            <Header />
            <Navbar1 />
            <Container fluid>
                <Row>
                    <Col sm={12} className="p-0 position-relative">
                        <img src={picture2} alt="Your image" height="250px" className="w-100 " style={{ filter: 'brightness(0.3)' }}></img>
                    </Col>
                    <h2 style={{ fontFamily: '"Source Sans Pro", sans-serif', left: '60px', top: '250px' }} className="font-weight-bold position-absolute text-white ">COMPLETED PROJECTS</h2>
                </Row>
            </Container>
            <Col sm={12} className="d-flex align-items-center justify-content-center" style={{ marginBottom: "20px", paddingTop: "50px" }}>
                {currentUser && (
                    <AddCompleteProjectModal />
                )}
            </Col>
            <Form.Group className="d-flex justify-content-end" style={{ marginRight: "90px", marginBottom: "50px" }}>
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


            {
                loading ? ( // Render spinner if loading
                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
                    </div >
                ) : (
                    <Row >
                        {filteredProjects.length === 0 ? (
                            <p className="text-center" style={{ color: 'red', fontStyle: 'italic', marginTop: '20px' }}>No completed projects found</p>
                        ) : (
                            <Row >
                                {filteredProjects.map((upcomingProject, index) => (
                                    <Col key={index} sm={12} className="mb-5">
                                        <CompleteProjectCard
                                            key={upcomingProject.id}
                                            id={upcomingProject.id}
                                            price={upcomingProject.price}
                                            image_url={upcomingProject.image_url}
                                            title={upcomingProject.title}
                                            location={upcomingProject.location}
                                            description={upcomingProject.description}
                                            car_park={upcomingProject.car_park}
                                            bathroom={upcomingProject.bathroom}
                                            bedroom={upcomingProject.bedroom}
                                            room_size={upcomingProject.room_size}
                                            onDelete={() => handleDeleteProject(upcomingProject.id)}

                                        />

                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Row>

                )
            }
            {filteredProjects.length !== 0 && (
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

            <Footer />
        </>
    )
}