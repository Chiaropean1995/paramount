import { useState, useEffect } from "react"
import Header from "../components/Header"
import Navbar1 from "../components/Navbar1"
import axios from "axios"
import AddProfileImage from "../components/AddProfileImage"


export default function ProfilePage() {
    const url = "https://paramount-i0x2.onrender.com";
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchImages = async () => {
        try {
            const response = await axios.get(`${url}/userimage`);
            setImages(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleAddProfileImage = async (newImage) => {
        try {
            await axios.post(`${url}/userimage`, newImage);
            setImages([...images, newImage]);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    return (
        <>
            <Header />
            <Navbar1 />
            <AddProfileImage onAddProfileImage={handleAddProfileImage} />

        </>
    );
}
