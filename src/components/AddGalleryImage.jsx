import { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap"
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'





export default function AddGalleryImage({ onAddImage }) {
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);


    const uploadImage = async (file) => {
        try {
            if (!file) {
                return null;
            }

            const fileName = file.name;
            console.log("File Name:", fileName);

            const imageRef = ref(storage, `galleryimages/${fileName}`);
            await uploadBytes(imageRef, file);
            console.log("File uploaded successfully!");

            const imageURL = await getDownloadURL(imageRef);
            return imageURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const imageUrl = await uploadImage(file);

            // Call the onAddImage function with the new image URL
            if (imageUrl) {
                onAddImage({ galleryimage: imageUrl });
            }

            handleClose();
            window.alert('Image successfully added!');
        } catch (error) {
            console.error('Error adding image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Images
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <Form.Group controlId="formgalleryimage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="galleryimage"
                                onChange={handleFileChange}
                                accept="image/jpeg"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {loading ? <Spinner animation="border" /> : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
