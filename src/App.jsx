import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import JointVenture from './pages/JointVenture'
import ContactUs from './pages/ContactUs'
import UpcomingProjects from './pages/UpcomingProjects'
import CompletedProjects from './pages/CompletedProjects'
import AdminManagement from './pages/AdminManagement'
import LoanCalculator from './pages/LoanCalculator'
import Gallery from "./pages/Gallery"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import ProjectDetail182 from "./pages/ProjectDetail182";
import MyProfile from './pages/MyProfile';
import './App.css'


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>

          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/upcomingprojects" element={<UpcomingProjects />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="projectdetail182" element={<ProjectDetail182 />} />
            <Route path="/loancalculator" element={<LoanCalculator />} />
            <Route path="/adminmanagement" element={<AdminManagement />} />
            <Route path="/CompletedProjects" element={<CompletedProjects />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/jointventure" element={<JointVenture />} />
            <Route path="/gallery" element={<Gallery />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
