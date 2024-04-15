import { Row, Col, Spinner, Modal, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react"
import { AuthContext } from "../components/AuthProvider";
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CompleteUpcomingCard({ id, price, image_url, title, location, description, car_park, bathroom, bedroom, room_size, onDelete }) {
    const [deleting, setDeleting] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [updating, setUpdating] = useState(false);
    const [updatedProject, setUpdatedProject] = useState({});
    const [selectedProject, setSelectedProject] = useState(null);
    const [upcomingProjects, setUpcomingProject] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [updatedImage, setUpdatedImage] = useState(null);
    const url = "http://localhost:3000"

    const fetchUpcomingProjects = async () => {
        try {
            const response = await axios.get(`${url}/upcomingprojects`);
            setUpcomingProject(response.data); // Set the fetched projects to state
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (selectedProject) {
                setUpdating(true); // Set updating to true when update process starts

                let imageUrl = updatedProject.image_url; // Preserve the existing image URL

                // Check if there's a new image selected for update
                if (updatedImage) {
                    // Upload the new image to Firebase Storage
                    const fileName = updatedImage.name;
                    const imageRef = ref(storage, `upcomingimages/${fileName}`);
                    await uploadBytes(imageRef, updatedImage);
                    console.log("File uploaded successfully!");

                    // Get the download URL for the new image
                    imageUrl = await getDownloadURL(imageRef);
                    console.log("New Download URL:", imageUrl);
                }

                // Include the new image URL in the updated project data
                const updatedProjectData = {
                    ...updatedProject,
                    image_url: imageUrl
                };

                // Send the updated project data to the server
                await axios.put(`${url}/upcomingprojects/${id}`, updatedProjectData);
                setShowModal(false);

                // Fetch updated projects immediately after update
                fetchUpcomingProjects();

                // Optionally, you can choose to update the state with the updated project

                toast.success('Project successfully updated!', {
                    onClose: () => {
                        window.location.reload()
                    }
                })
            }
        } catch (error) {
            console.error('Error updating project:', error);
        } finally {
            setUpdating(false); // Set updating back to false after update process completes
        }
    };



    const handleDelete = async () => {

        setDeleting(true); // Set deleting state to true when delete action starts
        try {
            await onDelete(); // Call onDelete function, which should handle the delete action
        } catch (error) {
            console.error('Error deleting project:', error);
        } finally {
            setDeleting(false); // Reset deleting state after deletion attempt
        }
    };


    return (
        <>
            <Row className="align-items-center">
                <Col xs={12} md={5} className="px-0 position-relative justify-content-mobile1">
                    <div className="price  text-white position-absolute -0 end-0 d-flex justify-content-center align-items-center" style={{ width: "150px", height: "40px", backgroundColor: "rgba(1, 174, 239, 0.80)" }}>{price}</div>
                    <div className="border" style={{ height: '400px', marginLeft: "20px" }}>
                        <img src={image_url} className="img-fluid" style={{ height: '100%', width: "100%" }} alt={title} />
                    </div>
                </Col>
                <Col xs={12} md={7} className="px-0 justify-content-mobile2">
                    <div className="border p-3" style={{ height: '400px', fontFamily: "Helvetica Neue, Helvetica, Arial,Source Sans Pro, serif", backgroundColor: "#E6EFF1" }}>
                        <h5><b>{title}</b></h5>
                        <p style={{ color: "grey" }}>{location}</p>
                        <hr />
                        <p style={{ color: "grey", wordWrap: "break-word", marginBottom: "150px" }}>{description}</p>
                        <hr />
                        <div className="d-flex">
                            <p><strong><i className="fa fa-car text-muted me-2 " aria-hidden="true"></i> </strong> {car_park}</p>
                            <p><strong><i className="fa fa-bath text-muted me-2 ms-5" aria-hidden="true"></i></strong> {bathroom}</p>
                            <p><strong><i className="fa fa-bed text-muted me-2 ms-5" aria-hidden="true"></i> </strong> {bedroom}</p>
                            <p><strong><i className="fa fa-square text-muted me-2 ms-5" aria-hidden="true"></i></strong> {room_size}</p>
                            {currentUser && (
                                <div className="text-center delete-update">
                                    <i onClick={handleDelete} className="delete-button ms-5 bi bi-trash" style={{ cursor: "pointer", width: "70px" }}>
                                        {deleting ? (
                                            <Spinner animation="border" size="sm" role="status" />
                                        ) : (
                                            "Delete"
                                        )}
                                    </i>
                                    <i
                                        className="bi bi-pencil-square update-button" // Merged className attributes
                                        onClick={() => {
                                            setSelectedProject(upcomingProjects);
                                            setUpdatedProject(upcomingProjects);
                                            setShowModal(true);
                                        }}
                                        style={{ width: "70px", cursor: 'pointer', marginRight: "10px", marginLeft: "10px" }} // Combined style attributes
                                    >
                                        {updating ? (
                                            <Spinner animation="border" size="sm" role="status" />
                                        ) : (
                                            "Update"
                                        )}
                                    </i>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedProject.price}
                                placeholder="Enter price"
                                onChange={(e) => setUpdatedProject({ ...updatedProject, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="image_url">
                            <Form.Label>Image</Form.Label>
                            {/* Display the current image if available */}
                            {updatedProject.image_url && (
                                <div>
                                    <img src={updatedProject.image_url} alt="Current Image" style={{ height: '300px', width: "500px" }} />
                                    <p>Current Image</p>
                                </div>
                            )}
                            {/* Input field to select a new image */}
                            <Form.Control
                                type="file"
                                onChange={(e) => setUpdatedImage(e.target.files[0])}
                            />
                        </Form.Group>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={updatedProject.title}
                                onChange={(e) => setUpdatedProject({ ...updatedProject, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                value={updatedProject.name}
                                onChange={(e) => setUpdatedProject({ ...updatedProject, location: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={updatedProject.description}
                                onChange={(e) => setUpdatedProject({ ...updatedProject, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="car_park">
                            <Form.Label>Car Park</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter no"
                                value={updatedProject.car_park}
                                onChange={(e) => setUpdatedProject({ ...updatedProject, car_park: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="bathroom">
                            <Form.Label>Bathroom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter no"
                                value={updatedProject.bathrooom}
                                onChange={(e) => setUpdatedProject({ ...updatedProject, bathroom: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="bedroom">
                            <Form.Label>Bedroom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter no"
                                value={updatedProject.bedroom}
                                onChange={(e) => setUpdatedProject({ ...updatedProject, bedroom: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="room_size">
                            <Form.Label>Built Up</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter no"
                                value={updatedProject.room_size}
                                onChange={(e) => setUpdatedProject({ ...updatedProject, room_size: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        {updating ? (
                            <Spinner animation="border" size="sm" role="status" />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
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
    );
}