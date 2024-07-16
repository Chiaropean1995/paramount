import Header from "../components/Header"
import Navbar1 from "../components/Navbar1"
import Footer from "../components/Footer"
import video from "../assets/video.mp4"
import picture2 from "../assets/picture2.jpeg"
import { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

const PaymentCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTenure, setLoanTenure] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [principalPercentage, setPrincipalPercentage] = useState(0);
    const [interestPercentage, setInterestPercentage] = useState(0);
    const [netIncome, setNetIncome] = useState(0);
    const [commitment, setCommitment] = useState(0);
    const [dsr, setDsr] = useState(0);
    const [houseBudget, setHouseBudget] = useState(0);

    const calculateMonthlyPayment = () => {
        const monthlyInterestRate = interestRate / 12 / 100;
        const totalPayments = loanTenure * 12;
        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
        setMonthlyPayment(monthlyPayment.toFixed(2));

        // Calculate principal and interest percentages
        const totalInterest = monthlyPayment * totalPayments - loanAmount;
        const principalPercentage = ((loanAmount / (monthlyPayment * totalPayments)) * 100).toFixed(2);
        const interestPercentage = ((totalInterest / (monthlyPayment * totalPayments)) * 100).toFixed(2);
        setPrincipalPercentage(principalPercentage);
        setInterestPercentage(interestPercentage);
    };

    const calculateHouseBudget = () => {
        const budget = (netIncome * dsr / 100 - commitment) * 200 * 1.1;
        setHouseBudget(budget.toFixed(2));
    };

    const handleCalculate = () => {
        calculateMonthlyPayment();
    };

    const addCommas = (value) => {
        if (!value) return ''; // Return empty string if value is not provided
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };



    return (
        <>
            <Header />
            <Navbar1 />
            <Container fluid>
                <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <video autoPlay muted loop id="video-bg" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: "-1" }}>
                        <source src={video} type="video/mp4" />
                    </video>
                    <Col sm={12} md={6} className="p-4 border rounded p-5 mt-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                        <h4 style={{ fontFamily: "Nunito, Roboto, sans-serif" }}>House Budget Calculator</h4>
                        <Form>
                            <Form.Group controlId="netIncome">
                                <Form.Label>Net Income (RM):</Form.Label>
                                <Form.Control type="text" placeholder="RM" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} />
                            </Form.Group>
                            <div className="d-flex">
                                <Form.Group controlId="commitment">
                                    <Form.Label>Commitment (RM):</Form.Label>
                                    <Form.Control type="text" placeholder="RM" value={commitment} onChange={(e) => setCommitment(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="dsr" className="ms-3">
                                    <Form.Label>DSR by Bank (%):</Form.Label>
                                    <Form.Control type="text" placeholder="%" value={dsr} onChange={(e) => setDsr(e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="text-center mt-3">
                                <Button variant="primary" onClick={calculateHouseBudget}>Calculate</Button>
                            </div>
                            <hr />
                            <h4 style={{ fontFamily: "Nunito, Roboto, sans-serif" }}>Loan Calculator</h4>
                            <Form>
                                <Form.Group className="mb-3" controlId="loanAmount">
                                    <Form.Label>Loan Amount (RM):</Form.Label>
                                    <Form.Control type="text" placeholder="RM" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                                </Form.Group>
                                <div className="d-flex">
                                    <Form.Group className="mb-3" controlId="interestRate">
                                        <Form.Label>Interest Rate (%):</Form.Label>
                                        <Form.Control type="text" placeholder="%" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 ms-3" controlId="loanTenure">
                                        <Form.Label>Loan Tenure (yrs):</Form.Label>
                                        <Form.Control type="text" placeholder="years" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <div className="text-center">
                                    <Button variant="primary" onClick={handleCalculate}>Calculate</Button>
                                </div>
                            </Form>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default PaymentCalculator;