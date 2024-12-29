import { Button, Tooltip } from "@mui/material"
import { Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddArchiveNotesThunk, DeleteNotesThunk, GetNotesThunk } from "../services/action/GoogleKeepAction";
import { Menu } from "@headlessui/react";
import NoteIcon from "../assets/images/afterloadicon/note.png"
import Logo from "../assets/images/loader/viewNote.gif"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelIcon from '@mui/icons-material/Label';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { UserIdGet } from "../services/reducer/StoreIgGet";
import { GetSignInUserThunk, SignInThunk, UserFindThunk } from "../services/action/AuthAction";

const Notes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storedUser = UserIdGet();
    const { notes, loading } = useSelector(state => state.GoogleKeepReducer);
    const { user } = useSelector((state) => state.AuthReducer);

    const DeleteNote = (id, data) => {
        dispatch(DeleteNotesThunk(id, data));
    }

    useEffect(() => {
        dispatch(GetNotesThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!user && storedUser) {
            dispatch(UserFindThunk());
        } else if (!storedUser) {
            navigate('/signin');
        }
    }, [user, storedUser]);

    return (
        <>
            <section className="page-scrollbar py-4 h-[calc(100vh-11.2rem)] sm:h-[calc(100vh-8rem)] overflow-y-scroll">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="action-button flex items-center justify-center flex-col flex-xs-row flex-md-row gap-3 border-b-2 border-[#4B5945] rounded-lg pb-4">
                                <Link><Button className="px-3 py-2 !bg-[#1a5276] !text-white  !font-bold"><span className="mr-2"><UploadFileIcon /></span>Upload&nbsp;File</Button></Link>
                                <Link><Button className="px-3 py-2 !bg-[#b7950b] !text-white  !font-bold"><span className="mr-2"><CreateNewFolderIcon /></span>Create&nbsp;Folder</Button></Link>
                                <Link to="/createnotes"><Button className="px-3 py-2 !bg-[#2c3e50] !text-white  !font-bold"><span className="mr-2"><NoteAddIcon /></span>Create&nbsp;Note</Button></Link>
                            </div>
                        </Col>
                    </Row>
                    <Row className="!mt-20 gap-y-8">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" >
                                <img src={Logo} alt="" className="w-[10rem]" />
                            </div>
                        ) : notes.length === 0 ? (
                            <div className="text-center w-full flex items-center justify-center h-full flex-col py-10">
                                <img src={NoteIcon} alt="" className="w-[4rem]" />
                                <h3 className="text-2xl font-semibold">Notes you add appear here</h3>
                            </div>
                        ) : (
                            notes.map((note) => (
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
                                        <div className="p-4 border-t cursor-pointer flex items-center justify-between">
                                            <Tooltip title="Remind me" arrow>
                                                <Button className="text-gray-500 hover:text-gray-700 !min-w-0 hover:bg-[#c4abab]">
                                                    <AddAlertIcon className="text-gray-200" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Collaborators" arrow>
                                                <Button className="text-gray-500 hover:text-gray-700 !min-w-0 hover:bg-[#c4abab]">
                                                    <PersonAddIcon className="text-gray-100" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="background options" arrow>
                                                <Button className="text-gray-500 hover:text-gray-700 !min-w-0 hover:bg-[#c4abab]" onClick={() => navigate(`/editnotes/${note.id}`)}>
                                                    <ColorLensIcon className="text-gray-100" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Add Image" arrow>
                                                <Button className="text-gray-500 hover:text-gray-700 !min-w-0 hover:bg-[#c4abab]" onClick={() => navigate(`/editnotes/${note.id}`)}>
                                                    <AddPhotoAlternateIcon className="text-gray-100" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Archive" arrow>
                                                <Button className="text-gray-500 hover:text-gray-700 !min-w-0 hover:bg-[#c4abab]" onClick={() => dispatch(AddArchiveNotesThunk(note.id, note))}>
                                                    <ArchiveIcon className="text-gray-100" />
                                                </Button>
                                            </Tooltip>
                                            <div className="relative inline-block text-left">
                                                <Menu>
                                                    <Tooltip title="More" arrow>
                                                        <Menu.Button className="!css-1588512-MuiButtonBase-root-MuiButton-root  text-gray-500 hover:text-gray-700 !min-w-0 hover:bg-[#c4abab] rounded-sm px-2 py-1 transition duration-200 ease-in-out">
                                                            <MoreVertIcon className="text-gray-100" />
                                                        </Menu.Button>
                                                    </Tooltip>

                                                    <Menu.Items className={`absolute right-0 w-52 mt-2 p-3 !z-50 shadow-lg !border-[#807777] border-2 rounded-md`} style={{ backgroundColor: note.color ? note.color : "#4B5945" }}>
                                                        <div className="btn-1 flex items-center">
                                                            <span><DeleteIcon className="text-[black] me-2" /></span>
                                                            <Button className="pe-2 w-full !text-[#d0d5ce] hover:bg-[#97b1ba] rounded-lg transition duration-300 flex items-center justify-between" onClick={() => { DeleteNote(note.id, note) }} >Delete Note</Button>
                                                        </div>
                                                        <div className="btn-2 flex items-center">
                                                            <span><LabelIcon className="text-[black] me-2" /></span>
                                                            <Button className="pe-2 w-full !text-[#d0d5ce] hover:bg-[#97b1ba] rounded-lg transition duration-300 flex items-center justify-between" onClick={() => navigate(`/editnotes/${note.id}`)}><span>Add&nbsp;label</span></Button>
                                                        </div>
                                                        <div className="btn-3 flex items-center">
                                                            <span><WorkHistoryIcon className="text-[black] me-2" /></span>
                                                            <Button className="pe-2 w-full !text-[#d0d5ce] hover:bg-[#97b1ba] rounded-lg transition duration-300 flex items-center justify-between" onClick={() => navigate(`/editnotes/${note.id}`)}><span>Version&nbsp;history</span></Button>
                                                        </div>
                                                        <div className="btn-4 flex items-center">
                                                            <span><EditNoteIcon className="text-[black] me-2" /></span>
                                                            <Button className="pe-2 w-full !text-[#d0d5ce] hover:bg-[#97b1ba] rounded-lg transition duration-300 flex items-center justify-between" onClick={() => navigate(`/editnotes/${note.id}`)}><span>Edit&nbsp;Note</span></Button>
                                                        </div>
                                                    </Menu.Items>
                                                </Menu>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Notes;
