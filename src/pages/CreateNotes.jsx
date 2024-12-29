import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
// import { AddNotesThunk  } from "../../services/action/GoogleKeepAction";
import { useNavigate } from "react-router-dom";
import { AddNotesThunk } from "../services/action/GoogleKeepAction";

const CreateNotes = () => {

    const { isCreated, loading } = useSelector((state) => state.GoogleKeepReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addNotes, setaddNotes] = useState({
        title: "",
        noteText: "",
        labels: "",
        color: "",
        notesImage: "",
    })

    const handleChange = (e) => {
        setaddNotes({ ...addNotes, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setaddNotes((prev) => ({
                ...prev,
                notesImage: reader.result,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(AddNotesThunk(addNotes))
    }

    useEffect(() => {
        if(isCreated){
            navigate("/notes")
        }
    }, [isCreated])

    return (
        <>
            <section className="flex items-center justify-center page-scrollbar  h-[calc(100vh-11.2rem)] sm:h-[calc(100vh-8rem)]  overflow-y-scroll">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="max-w-lg mx-auto px-4 py-6 bg-[#4B5945] rounded-lg shadow-lg">
                                <h1 className="text-2xl font-bold text-center mb-6 text-[#B2C9AD]">Create Notes</h1>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-[#B2C9AD]">Title*: </label>
                                        <input type="text" name="title" value={addNotes.title} onChange={handleChange} className="mt-1 block w-full p-2 border-2 text-[#B2C9AD] border-[#1b5330]  rounded-md shadow-sm outline-none  focus:border-[#7a9b87] sm:text-sm bg-transparent" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-[#B2C9AD]">Note Text*: </label>
                                        <textarea name="noteText" value={addNotes.noteText} onChange={handleChange} className="mt-1 block w-full p-2 border-2 text-[#B2C9AD] border-[#1b5330]  rounded-md shadow-sm outline-none focus:border-[#7a9b87] sm:text-sm resize-none bg-transparent"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-[#B2C9AD]">Labels*: </label>
                                        <input type="text" name="labels" value={addNotes.labels} onChange={handleChange} className="mt-1 block w-full p-2 border-2 text-[#B2C9AD] border-[#1b5330]  rounded-md shadow-sm outline-none focus:border-[#7a9b87] sm:text-sm bg-transparent" />
                                    </div>
                                    <div className="image-color flex items-strat justify-start flex-col ">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-[#B2C9AD]">Background&nbsp;Color: </label>
                                            <input type="color" name="color" value={addNotes.color} onChange={handleChange} className="w-20 border-2 border-[#1b5330]  rounded-sm outline-none focus:border-[#7a9b87] bg-transparent" />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block text-sm font-medium mb-1 text-[#B2C9AD]">Image: </label>
                                            <input type="file" name="image" accept="image/*" onChange={handleImage} className="mt-1 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#54634d] file:text-[#B2C9AD] hover:file:bg-[#4e6858] cursor-pointer"/>
                                        </div>
                                    </div>
                                    <div className="notes-submit-button text-center !mt-10">
                                        <button type="submit" className=" bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md"> {loading ? "Save..." : "Create"} </button>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default CreateNotes