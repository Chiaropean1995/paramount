import Header from '../components/Header'
import Navbar1 from '../components/Navbar1'
import Footer from '../components/Footer'
import picture2 from '../assets/picture2.jpeg'
import { Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect } from "react"
import axios from "axios"

export default function AdminManagement() {
    const [contacts, setContacts] = useState([]);
    const url = 'http://localhost:3000'



    const fetchContacts = async () => {

        try {
            const response = await axios.get(`${url}/contact`);
            console.log(response.data);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`${url}/contacts/${id}`);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);



    return (
        <>
            <Header />
            <Navbar1 />
            <Container fluid>
                <Row>
                    <Col sm={12} className="p-0 position-relative">
                        <img src={picture2} alt="Your image" height="250px" className="w-100 " style={{ filter: 'brightness(0.3)' }}></img>
                    </Col>
                    <h2 style={{ fontFamily: '"Source Sans Pro", sans-serif', left: '60px', top: '250px' }} className="font-weight-bold position-absolute text-white ">ADMIN MANAGEMENT</h2>
                </Row>
            </Container>
            <div style={{ paddingTop: '80px' }}>
                <Container>
                    <table className="table table-bordered table-sm">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {contacts.map((contact, index) => (
                                <tr key={index}>
                                    <td>{contact.name}</td>
                                    <td>{contact.phone_number}</td>
                                    <td>{contact.subject}</td>
                                    <td>{contact.message}</td>
                                    <td> <i onClick={() => handleDeleteBooking(contact.id)} className="bi bi-trash" style={{ cursor: 'pointer', marginRight: '10px' }}></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            </div>
            <Footer />


        </>
    )
}