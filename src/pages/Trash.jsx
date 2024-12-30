import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteArchiveNotesThunk, DeleteTrashNotesThunk, GetArchiveNotesThunk, GetTrashNotesThunk } from "../services/action/GoogleKeepAction";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserIdGet } from "../services/reducer/StoreIgGet";
import DeleteIcon from '@mui/icons-material/Delete';
import Logo from "../assets/images/loader/Trash.gif"
import TrashIcon from "../assets/images/afterloadicon/trash.png"
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

const Trash = () => {

    const { trash, loading } = useSelector((state) => state.GoogleKeepReducer);
    const {user} = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storedUser = UserIdGet();

    useEffect(() => {
        dispatch(GetTrashNotesThunk());
    }, [dispatch]);

    useEffect(() => {
        if(!storedUser){
            navigate("/signin");
        }
    }, [storedUser]);

    return (
        <section className="page-scrollbar py-4 h-[calc(100vh-11.2rem)] sm:h-[calc(100vh-8rem)] overflow-y-scroll">
            <Container>
                <Row className="!mt-20 gap-y-8">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" >
                            <img src={Logo} alt="Loading..." className="!w-[10rem]" />
                        </div>
                    ) : trash.length === 0 ? (
                        <div className="text-center w-full flex items-center justify-center h-full flex-col py-10">
                            <img src={TrashIcon} alt="" />
                            <p className="text-lg font-medium mt-3">No notes in Trash</p>
                        </div>
                    ) : (
                        trash.map((note) => (
                            <Col md={6} lg={4} key={note.id} className="flex flex-col">
                                <div className={`rounded-lg shadow-lg relative flex flex-col h-full`} style={{ backgroundColor: note.color ? note.color : "#4B5945" }}>
                                    <div className="p-4 flex-grow">
                                        {note.notesImage && (
                                            <div className="bg-gray-50 rounded-lg">
                                                <img src={note.notesImage} alt="" className="w-full h-full rounded-lg" />
                                            </div>
                                        )}
                                        <p className="mt-4 text-lg font-medium text-center">{note.title}</p>
                                        <span className="inline-block mt-2 px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-full">{note.labels}</span>
                                        <p className="mt-4 text-lg font-medium">{note.noteText}</p>
                                    </div>
                                    <div className="p-4 border-t flex items-center justify-center gap-x-2">
                                        <Button className="" onClick={() => dispatch(DeleteTrashNotesThunk(note.id))}>
                                            <DeleteIcon className="text-red-950 !text-3xl" />
                                        </Button>
                                        <Button className="" onClick={() => dispatch(DeleteArchiveNotesThunk(note.id, note))}>
                                            <RestoreFromTrashIcon className="text-red-950 !text-3xl" />
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </section>
    )
}
export default Trash;
