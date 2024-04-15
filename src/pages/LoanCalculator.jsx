import Header from "../components/Header"
import Navbar1 from "../components/Navbar1"
import Footer from "../components/Footer"
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
                <Row>
                    <Col sm={12} className="p-0 position-relative"  >
                        <img src={picture2} alt="Your image" height="250px" className="w-100 " style={{ filter: 'brightness(0.3)' }}></img>
                    </Col>
                    <h2 style={{ fontFamily: '"Source Sans Pro", sans-serif', left: '60px', top: '250px' }} className="font-weight-bold position-absolute text-white ">LOAN CALCULATOR</h2>

                </Row>
            </Container>
            <div>
                <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
                    <Row className="mx-2">
                        <Col sm={12} md={5} className="p-4 border rounded-start p-5 " style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}  >
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
                            </Form>
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
                        </Col>
                        <Col sm={12} md={7} className="p-4 border rounded-end p-5 box-shadow" style={{ backgroundColor: " #5c85d6", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }} >
                            <div>
                                <h5 className="text-white" style={{ fontFamily: "Nunito, Roboto, sans-serif", marginBottom: "10px" }}>Summary:</h5>
                                <div style={{ marginBottom: "20px" }}>
                                    <div style={{ marginBottom: "200px" }}>
                                        <span className="text-white" style={{ color: "#505050", fontSize: "16px", fontWeight: "bold" }}>Estimated House Budget:</span>
                                        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>{houseBudget ? `RM ${addCommas(houseBudget)}` : ""}</span>

                                    </div>

                                    <div>
                                        <span className="text-white" style={{ color: "#505050", fontSize: "16px", fontWeight: "bold" }}>Monthly Payment:</span>
                                        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>{monthlyPayment ? `RM ${addCommas(monthlyPayment)}` : ""}</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    {principalPercentage > 0 && (
                                        <div style={{ width: `${principalPercentage}%`, height: "20px", backgroundColor: "#77CEE2", position: 'relative', textAlign: 'center' }}>
                                            <span style={{ position: "absolute", top: "50%", transform: "translate(-50%, -50%)", color: "white", fontSize: "12px", fontWeight: "bold" }}>{principalPercentage}%</span>
                                        </div>
                                    )}
                                    {interestPercentage > 0 && (
                                        <div style={{ width: `${interestPercentage}%`, height: "20px", backgroundColor: "#AFD5DE", position: 'relative', textAlign: 'center' }}>
                                            <span style={{ position: "absolute", top: "50%", transform: "translate(-50%, -50%)", color: "white", fontSize: "12px", fontWeight: "bold" }}>{interestPercentage}%</span>
                                        </div>
                                    )}
                                </div>
                                <div className="d-flex mt-3">
                                    <div className="rounded-circle me-3" style={{ backgroundColor: "#77CEE2", width: '20px', height: '20px' }}></div>
                                    <span className="text-white">Principal Amount</span>
                                    <div className="rounded-circle ms-5 me-3" style={{ backgroundColor: "#AFD5DE", width: '20px', height: '20px' }}></div>
                                    <span className="text-white ">Interest Amount</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div >
            <Footer />
        </>
    );
};

export default PaymentCalculator;