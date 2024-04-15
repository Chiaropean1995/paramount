
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider"
import { Modal, Button, Form, NavDropdown } from "react-bootstrap"
import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth"
import axios from "axios"
import { BiSun } from "react-icons/bi"




export default function Header() {
    const [showLoginModal, setShowLoginModal] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleShowSignUp = () => setShowLoginModal("SignUp");
    const handleShowLogin = () => setShowLoginModal("login");
    const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showCoordinates, setShowCoordinates] = useState(false);
    const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
    const [showWeatherModal, setShowWeatherModal] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState("");



    useEffect(() => {
        if (currentUser && currentUser.uid) {
            // Fetch the profile image URL from local storage
            const imageUrl = localStorage.getItem(`uploadedImageUrl_${currentUser.uid}`);
            setProfileImageUrl(imageUrl);
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser && currentUser.isAuthenticated) {
            navigate("/homepage");
        }
    }, [currentUser, navigate]);


    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
            handleClose();
        } catch (error) {
            console.error(error);
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
            window.alert("Login successful!");
            handleClose();
            navigate("/homepage");
        } catch (error) {
            console.error(error);
            // Show error message
            setErrorMessage("Invalid username or password. Please try again.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (username.length < 6 || password.length < 6) {
            setErrorMessage("Username and password must be at least 6 characters long.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;

        }
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log(res.user);
            // Show success message
            window.alert("Sign-up successful!");
            // Close the modal
            handleClose();
            // Navigate to homepage
            navigate("/homepage");
        } catch (error) {
            console.error(error);
        }
    }


    const handleClose = () => {
        console.log("Closing modal");
        setShowLoginModal(null);
    };



    const handleLogout = () => {
        if (!currentUser) {
            // If user is already logged out, show alert
            alert("You are already logged out.");
            return;
        }

        auth.signOut()
            .then(() => {
                // Show logout success message
                alert("Logout successful!");
                // Navigate to profilepage.jsx
                navigate("/homepage");
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setCoordinates({ lat: latitude, lon: longitude }); // Set coordinates state
                        const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER;
                        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyWeather}&units=metric`;
                        try {
                            const response = await axios.get(apiUrl);
                            setWeatherData(response.data);
                            // Check if weather data modal has already been shown
                            const weatherModalShown = localStorage.getItem('weatherModalShown');
                            if (!weatherModalShown) {
                                setShowWeatherModal(true);
                                // Set flag in local storage to indicate modal has been shown
                                localStorage.setItem('weatherModalShown', 'true');
                            }
                        } catch (error) {
                            console.error("Error fetching weather data:", error);
                        }
                    },
                    (error) => {
                        console.error("Error getting geolocation:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        fetchWeatherData();
    }, []);


    const viewOnMap = () => {
        if (coordinates) {
            // Construct the URL for Google Maps with the coordinates
            const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lon}`;
            // Open the URL in a new tab
            window.open(url, '_blank');
        } else {
            console.error("Coordinates not available.");
        }
    };
    const handleCloseWeatherModal = () => {
        setShowWeatherModal(false);
    };

    const handleSunIconClick = () => {
        setShowWeatherModal(true);
    };






    return (
        <>
            <header className="main-header header-style-one">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-md-6 p-2">
                            <ul className="social-links list-unstyled d-flex mb-0">
                                <li className="me-4"><a href="https://www.facebook.com/profile.php?id=100063044389705"><i className="bi bi-facebook text-muted"></i></a></li>
                                <li className="me-4"><a href="#"><i className="bi bi-twitter text-muted"></i></a></li>
                                <li className="me-4"><a href="#"><i className="bi bi-google text-muted"></i></a></li>
                                <li><a href="#"><i className="bi bi-linkedin text-muted"></i></a></li>
                                <li>
                                    <i className="bi bi-geo-alt-fill ms-4" onClick={() => setShowCoordinates(true)}></i>
                                </li>
                                <li>
                                    <div className="sun-icon ms-4" onClick={handleSunIconClick}>
                                        <BiSun size={30} />
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-6 d-flex flex-column justify-content-md-end justify-content-center align-items-center align-items-md-end">
                            <ul className="top-links list-unstyled mb-0 d-flex align-items-center">
                                <li className="me-3 border-end pe-3"><a href="#" className="text-decoration-none"><i className="bi bi-telephone text-muted"></i><span className="text-muted d-none d-md-inline"> +603-3344 5988</span></a></li>
                                <li><a href="mailto:paramountvalley@live.com" className="text-decoration-none"><i className="bi bi-envelope text-muted"></i><span className="text-muted d-none d-md-inline me-3"> paramountvalley@live.com</span></a></li>

                                <li>
                                    {currentUser ? (
                                        profileImageUrl ? (
                                            <NavDropdown title={<img src={profileImageUrl} alt="Profile" className="bi bi-person-circle text-muted ms-3" style={{ height: "30px", borderRadius: "50%", cursor: "pointer" }} />} className="remove-dropdown-arrow" id="basic-nav-dropdown" >
                                                <NavDropdown.Item href="/myprofile">My Profile</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                        ) : (
                                            <NavDropdown title={<i className="bi bi-person-circle text-muted icon-hover" style={{ fontSize: "2rem", cursor: "pointer" }}></i>} className="remove-dropdown-arrow" id="basic-nav-dropdown" >
                                                <NavDropdown.Item href="/myprofile">My Profile</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                        )
                                    ) : (
                                        <li>
                                            <i
                                                className="bi bi-person-circle text-muted icon-hover"
                                                style={{ fontSize: "2rem", cursor: "pointer" }}
                                                onClick={handleShowLogin}
                                            ></i>
                                        </li>
                                    )}

                                </li>


                            </ul>
                        </div>

                    </div>
                </div>
            </header >
            <Modal
                show={showLoginModal !== null}
                onHide={handleClose}
                animation={false}
                centered
            >
                <Modal.Title className="text-center">
                    {showLoginModal === "SignUp" ? "Create your account" : "Login With"}
                </Modal.Title>
                <Modal.Body>
                    <Form
                        className="d-grid gap-2 px-5"
                        onSubmit={showLoginModal === "SignUp" ? handleSignUp : handleLogin}
                    >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
                                type="email"
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        {showLoginModal === "SignUp" && errorMessage && (
                            <p style={{ color: "red", marginBottom: "15px" }}>
                                {errorMessage}
                            </p>

                        )}

                        {showLoginModal === "login" && errorMessage && (
                            <p style={{ color: "red", marginBottom: "15px" }}>
                                {errorMessage}
                            </p>

                        )}
                        {showLoginModal === "SignUp" && (
                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Policy.
                            </p>
                        )}
                        <Button className="rounded-pill" type="submit">
                            {showLoginModal === "SignUp" ? "Sign up" : "Log in"}
                        </Button>
                        <p className="text-center p-2"> or use a social networks</p>
                        <div className="d-flex justify-content-center">
                            <Button
                                className="rounded-circle btn-sm border-0 me-5"
                                variant="outline-dark"
                                style={{ width: "50px", height: "50px", backgroundColor: "#DE4444" }}
                                onClick={handleGoogleLogin}
                            >
                                <i className="bi bi-google fs-4 text-white"></i>
                            </Button>
                            <Button
                                className="rounded-circle btn-sm border-0"
                                variant="outline-dark"
                                style={{ width: "50px", height: "50px", backgroundColor: "#2E53A4" }}
                            >
                                <i className="fab fa-facebook-f fs-4 text-white"></i>
                            </Button>
                        </div>
                        <hr />
                        <div className="text-center text-muted">
                            Looking to{" "}
                            <a href="#" className="text-decoration-none text-primary fw-bold" onClick={handleShowSignUp}>
                                create an account
                            </a>
                            ?
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showCoordinates} onHide={() => setShowCoordinates(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: 'blue', color: 'white' }}>
                    <Modal.Title>Current Coordinates</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'lightgray' }}>
                    <p style={{ textAlign: 'center' }}>Latitude: {coordinates.lat}</p>
                    <p style={{ textAlign: 'center' }}>Longitude: {coordinates.lon}</p>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button variant="primary" onClick={viewOnMap}>View on Map</Button>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'lightgray' }}>
                    <Button variant="secondary" onClick={() => setShowCoordinates(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showWeatherModal}
                onHide={handleCloseWeatherModal}
                centered
            >
                <Modal.Header closeButton className="bg-primary text-light">
                    <Modal.Title className="fw-bold">Weather Information</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">
                    {weatherData && (
                        <>
                            <div className="mb-3">
                                <h5 className="fw-bold">Temperature:</h5>
                                <p>{weatherData.main.temp}°C</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="fw-bold">Description:</h5>
                                <p>{weatherData.weather[0].description}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="fw-bold">Humidity:</h5>
                                <p>{weatherData.main.humidity}%</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="fw-bold">Wind Speed:</h5>
                                <p>{weatherData.wind.speed} m/s</p>
                            </div>
                            <div>
                                <h5 className="fw-bold">Pressure:</h5>
                                <p>{weatherData.main.pressure} hPa</p>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={handleCloseWeatherModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 