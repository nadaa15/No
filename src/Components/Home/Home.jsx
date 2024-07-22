import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoteCard from '../NoteCard/NoteCard';
import { notesAtom } from '../../Atoms/notesAtom';
import { useRecoilState } from 'recoil';

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notes, setNotes] = useState([]);
  const [noteError, setNoteError] = useState();
  let [noteLenght, setNoteLength] = useRecoilState(notesAtom);
  let headers = {
    token: `3b8ny__${localStorage.getItem("token")}`,
  };

  //! Add Note
  async function addNote(values) {
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
        headers,
      })
      .then((res) => {
        handleClose();
        values.title = "";
        values.content = "";
        getNotes();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg);
      });
  }

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNote,
  });

  //! Get Notes

  async function getNotes() {
    setNoteError(null)
    await axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", { headers })
      .then((res) => {
        console.log(res);
        setNotes(res?.data?.notes);
        setNoteLength(res?.data?.notes.length);
      })
      .catch((err) => {
        setNoteError(err?.response?.data?.msg)
        setNoteLength(0)
      });
  }

  //! Delete Note

  async function deleteNotes(id) {
    await axios
      .delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        { headers }
      )
      .then((res) => {
        getNotes()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Your Notes</h3>
        <Button variant="danger" onClick={handleShow}>
          <i className=" fas fa-plus"></i> Add note
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="text"
                placeholder="Note title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="textarea">
              <Form.Control
                as="textarea"
                placeholder="Note content"
                style={{ resize: "none" }}
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={formik.handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {noteError ? <h3 className='mx-auto text-center my-5 bg-danger bg-opacity-75 text-white p-4 w-50 rounded-5'>{noteError}</h3> : <>
        <div className="row mt-4">
        {notes?.map((note) => (
          <NoteCard key={note?._id} note={note} deleteFn={deleteNotes} headers={headers} getFn={getNotes} />
        ))}
      </div>
      <p className="text-end my-4 fs-5 fw-bold">
        Notes Number: <span className="text-danger">{noteLenght}</span>
      </p>
      </>}
      
    </>
  );
}
