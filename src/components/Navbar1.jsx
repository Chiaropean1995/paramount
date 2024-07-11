import companylogo from "../assets/companylogo.jpeg"
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider"





export default function Navbar1() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();



    useEffect(() => {
        if (currentUser && currentUser.isAuthenticated) {
            navigate("/homepage");
        }
    }, [currentUser, navigate]);

    return (
        <>

            <Navbar bg="transparent" variant="light" expand="lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Container>
                    <Navbar.Brand as={Link} to="/profilepage">
                        <img
                            src={companylogo}
                            alt="Your Logo"
                            height="70"
                            className="company-logo d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="ms-auto navbar-links">
                            <Nav.Link className="me-4" as={Link} to="/profilepage">Home</Nav.Link>
                            <Nav.Link className="me-4" as={Link} to="/aboutus">About Us</Nav.Link>
                            <NavDropdown title="Projects" id="navbarDropdown" className="me-4">
                                <NavDropdown.Item as={Link} to="/upcomingprojects">Upcoming Projects</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/completedprojects">Completed Projects</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className="me-4" as={Link} to="/gallery">Gallery</Nav.Link>
                            <Nav.Link className="me-4" as={Link} to="/jointventure">Joint Venture</Nav.Link>
                            <Nav.Link className="me-4" as={Link} to="/loancalculator">Loan</Nav.Link>
                            <Nav.Link className="me-4" as={Link} to="/contactus">Contact Us</Nav.Link>
                            <Nav.Link className="custom-nav-link" as={Link} to="/adminmanagement" style={{ display: currentUser && currentUser.email === 'user@admin.com' ? 'block' : 'none' }}>Admin Management</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}
