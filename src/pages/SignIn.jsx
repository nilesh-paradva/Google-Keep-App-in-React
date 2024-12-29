import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { SignInThunk } from "../services/action/AuthAction";
import { Link, useNavigate } from "react-router-dom";
import { SignInFalseAct, SignInPopupThunk, SignInThunk  } from "../services/action/AuthAction";
import { Button } from "@mui/material";
import GoogleIcon from "../assets/images/authicon/google.png"

const SignIn = () => {
    const { isSignIn, isLoading } = useSelector((state) => state.AuthReducer);
    console.log("User sign in data", isSignIn);

    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignIn({ ...signIn, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SignInThunk(signIn));
        console.log("SignIn", signIn);
    };

    const SignInGoogle = () => {
        dispatch(SignInPopupThunk());
    }

    useEffect(() => {
        if (isSignIn) {
            navigate("/");
        }
    }, [isSignIn]);


    useEffect(() => {
        dispatch(SignInFalseAct())
    }, []);

    return (
        <>
            <section className="page-scrollbar py-4  h-[calc(100vh-11.2rem)] sm:h-[calc(100vh-8rem)] overflow-y-scroll flex justify-center items-center">
                <Container>
                    <Row className="gap-y-8 justify-center">
                        <Col lg={12}>
                            <div className="max-w-lg mx-auto px-4 py-6 bg-[#4B5945] rounded-lg shadow-lg">
                                <h2 className="text-white text-3xl mb-6 text-center">Sign In</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-white mb-2">Email*</label>
                                        <input type="email" name="email" value={signIn.email} id="email" className="mt-1 block w-full p-2 border-2 text-white border-[#1b5330] rounded-md shadow-sm outline-none focus:border-[#7a9b87] sm:text-sm bg-transparent" onChange={handleChange} />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-white mb-2">Password*</label>
                                        <input type="password" name="password" value={signIn.password} id="password" className="mt-1 block w-full p-2 border-2 text-white border-[#1b5330] rounded-md shadow-sm outline-none focus:border-[#7a9b87] sm:text-sm bg-transparent" onChange={handleChange} />
                                    </div>
                                    <p className="text-sm text-center text-white">Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link></p>
                                    <div className="SignInbtn text-center">
                                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md">{ isLoading ? "Sign In..." : "Sign In" }</button>
                                    </div>
                                </form>
                                <div className="signWithGoogle text-center mt-4">
                                    <Button variant="text" className="text-capitalize text-white hover:!bg-[rgba(92,90,90,0.7)] !rounded-lg px-3 py-2" onClick={SignInGoogle}>
                                        <span className="pe-2"><img src={GoogleIcon} alt="googleicon" className="img-fluid w-8" /></span>Sign With Google
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default SignIn;