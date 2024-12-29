import { use, useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SignUpThunk } from "../services/action/AuthAction";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

    const {user, isSignUp, isLoading} = useSelector((state) => state.AuthReducer);
    console.log("user sign UP data", user, isSignUp);
    
    const [SighUp, setSignUp] = useState({
        username: "",
        email: "",
        password: "",
        c_password: "",
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setSignUp({ ...SighUp, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SignUpThunk(SighUp))
        console.log("SighUp", SighUp);
    }

    useEffect(() => {
        if (isSignUp) {
            navigate("/signin");
        }
    }, [isSignUp]);

    return (
        <>
            <section className="page-scrollbar  h-[calc(100vh-11.2rem)] sm:h-[calc(100vh-8rem)] overflow-y-scroll  flex justify-center items-center">
                <Container>
                    <Row className="gap-y-8 justify-center">
                        <Col lg={12} >
                            <div className="max-w-lg mx-auto px-4 py-6 !mt-[6rem] !mb-3 sm:!my-0 bg-[#4B5945] rounded-lg shadow-lg">
                                <h2 className="text-white text-3xl mb-6 text-center">Sign Up</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-white mb-2">Username*</label>
                                        <input type="text" name="username" value={SighUp.username} id="username" className="mt-1 block w-full p-2 border-2 text-white border-[#1b5330]  rounded-md shadow-sm outline-none  focus:border-[#7a9b87] sm:text-sm bg-transparent" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-white mb-2">Email*</label>
                                        <input type="email" name="email" value={SighUp.email} id="email" className="mt-1 block w-full p-2 border-2 text-white border-[#1b5330]  rounded-md shadow-sm outline-none  focus:border-[#7a9b87] sm:text-sm bg-transparent" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-white mb-2">Password*</label>
                                        <input type="password" name="password" value={SighUp.password} id="password" className="mt-1 block w-full p-2 border-2 text-white border-[#1b5330]  rounded-md shadow-sm outline-none  focus:border-[#7a9b87] sm:text-sm bg-transparent" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="c_password" className="block text-white mb-2">Conform Password*</label>
                                        <input type="password" name="c_password" value={SighUp.c_password} id="c_password" className="mt-1 block w-full p-2 border-2 text-white border-[#1b5330]  rounded-md shadow-sm outline-none  focus:border-[#7a9b87] sm:text-sm bg-transparent" onChange={handleChange}/>
                                    </div>
                                    <p className="text-sm text-center text-white">Already have an account? <Link to="/signin" className="text-blue-400">Sign In</Link></p>
                                    <div className="SignUpbtn text-center">
                                        <button type="submit" className=" bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md">{isLoading ? "Sign Up..." : "Sign Up"}</button>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default SignUp;