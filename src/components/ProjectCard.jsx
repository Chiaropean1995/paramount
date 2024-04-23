import '@fortawesome/fontawesome-free/css/all.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../App.css'
import { Link } from 'react-router-dom';
import { useState, useContext } from "react"
import { AuthContext } from "../components/AuthProvider";
import { Form, Offcanvas, Button, Spinner } from "react-bootstrap";
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProjectCard({ id, price, image_url, title, location, description, car_park, bathroom, bedroom, room_size, progress_percentage, onDelete, }) {
    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [selectedProject, setSelectedProject] = useState(null);
    const [updatedProject, setUpdatedProject] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [updatedImage, setUpdatedImage] = useState(null);
    const url = "https://paramount-i0x2.onrender.com"




    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${url}/allprojects`);
            setProjects(response.data); // Set the fetched projects to state

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
                    const imageRef = ref(storage, `images/${fileName}`);
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
                await axios.put(`${url}/projects/${id}`, updatedProjectData);
                setShowForm(false);

                // Fetch updated projects immediately after update
                fetchProjects();

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
            <div className="project-card border p-0 shadow-lg" style={{ borderRadius: "10px", backgroundColor: "#E6EFF1" }}
            >
                <div className="position-relative image-container">
                    <img
                        src={image_url}
                        className="img-fluid"
                        style={{ height: '300px', width: "500px", borderTopLeftRadius: '10px', borderTopRightRadius: '10px', transition: 'transform 0.3s ease-in-out' }}
                    />
                    {/* Circle button */}
                    <Link to={`/ProjectDetail${id}`}>
                        <div className="position-absolute top-50 start-50 translate-middle circle-button">
                            <button className="btn btn-primary btn-circle btn-lg rounded-circle">
                                <i className="bi bi-link-45deg"></i>
                            </button>
                        </div>
                    </Link>
                    <div className="price text-white position-absolute bottom-0 end-0 d-flex justify-content-center align-items-center" style={{ width: "150px", height: "40px", backgroundColor: "rgba(1, 174, 239, 0.80)", zIndex: 1 }}>
                        {price}
                    </div>
                </div>
                <h3 style={{ fontFamily: "Helvetica Neue, Helvetica, Arial,Source Sans Pro, serif", fontSize: "15px", marginLeft: "20px", marginTop: "10px" }}><b>{title}</b></h3>
                <p style={{ fontFamily: "Helvetica Neue, Helvetica, Arial,Source Sans Pro, serif", fontSize: "14px", marginLeft: "20px", color: "grey" }}>{location}</p>
                <hr style={{ margin: "0 20px" }} />
                <div className="d-flex align-items-center" style={{ marginTop: "10px" }}>
                    <p style={{ fontFamily: "Helvetica Neue, Helvetica, Arial,Source Sans Pro, serif", color: "grey", fontSize: "14px", marginLeft: "20px", maxWidth: "calc(100% - 40px)", overflowWrap: "break-word" }}>{description}</p>
                </div>
                <hr style={{ margin: "0 20px" }} />
                <div className="icons-container" style={{ marginLeft: "20px", marginRight: "20px", marginBottom: "10px", marginTop: "10px" }}>
                    <div className="icons d-flex justify-content-between">
                        <span><i className="fa fa-car text-muted me-3 " aria-hidden="true"></i> {car_park}</span>
                        <span><i className="fa fa-bath text-muted me-3" aria-hidden="true"></i> {bathroom}</span>
                        <span><i className="fa fa-bed text-muted me-3" aria-hidden="true"></i> {bedroom}</span>
                        <span><i className="fa fa-square text-muted me-3" aria-hidden="true"></i>  {room_size}</span>
                    </div>
                    <div style={{ marginLeft: "50px", marginRight: "50px", marginTop: "20px" }}>
                        <ProgressBar animated variant="info" now={progress_percentage} label={`${progress_percentage}%`} />
                    </div>
                    {currentUser && (
                        <div className="text-center">
                            <button onClick={handleDelete} className="delete-button" style={{ width: "70px" }}>
                                {deleting ? (
                                    <Spinner animation="border" size="sm" role="status" />
                                ) : (
                                    "Delete"
                                )}
                            </button>
                            <button onClick={() => {
                                setSelectedProject(projects);
                                setUpdatedProject(projects);
                                setShowForm(true);
                            }} className="update-button" style={{ width: "70px" }}>
                                {updating ? (
                                    <Spinner animation="border" size="sm" role="status" />
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </div>
                    )}
                </div>
                <Offcanvas show={showForm} onHide={() => setShowForm(false)} placement="end">
                    <Offcanvas.Header closeButton style={{ backgroundColor: '#01aeef' }}>
                        <Offcanvas.Title className="text-white">Update Project</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
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
                            <div className="d-flex">
                                <Form.Group controlId="title" className="me-3">
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
                            </div>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={updatedProject.description}
                                    onChange={(e) => setUpdatedProject({ ...updatedProject, description: e.target.value })}
                                />
                            </Form.Group>
                            <div className="d-flex">
                                <Form.Group controlId="car_park" className="me-3">
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
                                        value={updatedProject.bathroom}
                                        onChange={(e) => setUpdatedProject({ ...updatedProject, bathroom: e.target.value })}
                                    />
                                </Form.Group>
                            </div>
                            <div className="d-flex">
                                <Form.Group controlId="bedroom" className="me-3">
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
                            </div>
                            <Form.Group controlId="progress_percentage">
                                <Form.Label>Progress Percentage</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter %"
                                    value={updatedProject.progress_percentage}
                                    onChange={(e) => setUpdatedProject({ ...updatedProject, progress_percentage: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="secondary" onClick={() => setShowForm(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleUpdate}>
                                {updating ? (
                                    <Spinner animation="border" size="sm" role="status" />
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
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
