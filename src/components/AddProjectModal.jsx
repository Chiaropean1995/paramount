import { useState } from 'react';
import { Button, Form, Spinner, Offcanvas } from 'react-bootstrap';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProjectModal({ onAddProject }) {
    const url = 'https://paramount-i0x2.onrender.com';
    const [showForm, setShowForm] = useState(false);
    const [imageUrl, setImageURL] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        price: '',
        image_url: null,
        title: '',
        location: '',
        description: '',
        car_park: '',
        bathroom: '',
        bedroom: '',
        room_size: '',
        progress_percentage: '',
    });

    const uploadImage = async (file) => {
        try {
            if (!file) {
                return null;
            }

            const fileName = file.name;
            console.log('File Name:', fileName);

            const imageRef = ref(storage, `images/${fileName}`);
            await uploadBytes(imageRef, file);
            console.log('File uploaded successfully!');

            const imageURL = await getDownloadURL(imageRef);
            setImageURL(imageURL);

            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = null;

            if (file) {
                const fileName = file.name;
                const imageRef = ref(storage, `images/${fileName}`);
                await uploadBytes(imageRef, file);
                console.log('File uploaded successfully!');

                imageUrl = await getDownloadURL(imageRef);
                console.log('Download URL:', imageUrl);
            }

            const formDataWithImageUrl = {
                ...formData,
                image_url: imageUrl,
            };

            const response = await axios.post(`${url}/projects`, formDataWithImageUrl);
            console.log(response.data);

            onAddProject(response.data);

            setShowForm(false);
            toast.success('Project successfully added!', {
                onClose: () => {
                    window.location.reload();
                },
            });
        } catch (error) {
            console.error('Error adding project:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShowForm(true)}>
                +
            </Button>
            <Offcanvas show={showForm} onHide={() => setShowForm(false)} placement="end">
                <Offcanvas.Header closeButton style={{ backgroundColor: '#01aeef' }}>
                    <Offcanvas.Title className="text-white">Add New Project</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form encType="multipart/form-data">
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage_url">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image_url"
                                onChange={handleFileChange}
                                accept="image/jpeg"
                            />
                        </Form.Group>
                        <div className="d-flex">
                            <Form.Group controlId="formTitle" className="me-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <div className="d-flex">
                            <Form.Group controlId="formCar_park" className="me-3">
                                <Form.Label>Car Park</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter no"
                                    name="car_park"
                                    value={formData.car_park}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBathroom">
                                <Form.Label>Bathroom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter no"
                                    name="bathroom"
                                    value={formData.bathroom}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Form.Group controlId="formBedroom" className="me-3">
                                <Form.Label>Bedroom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter no"
                                    name="bedroom"
                                    value={formData.bedroom}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="room_size">
                                <Form.Label>Built Up</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter sq.ft"
                                    name="room_size"
                                    value={formData.room_size}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group controlId="progress_percentage">
                            <Form.Label>Progress Percentage</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter %"
                                name="progress_percentage"
                                value={formData.progress_percentage}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="secondary" onClick={() => setShowForm(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => { handleSubmit(e); uploadImage(); }}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                        </Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
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
