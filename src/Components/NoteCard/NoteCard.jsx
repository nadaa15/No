import React, { useState } from 'react'
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function NoteCard({ note, deleteFn, headers, getFn }) {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    async function updateNote(values) {
      await axios
        .put(
          `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
          values,
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res);
          values.title = "";
          values.content = "";
          getFn();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.msg);
        }).finally(() => {
            handleClose()
        })
    }


     let formik = useFormik({
       initialValues: {
         title: "",
         content: "",
       },
       onSubmit: updateNote,
     });
    return (
      <>
        <div className="col-md-4 my-2">
          <Card className='shadow-lg'>
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.content}</Card.Text>
              <Card.Link variant="danger" onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square text-danger"></i>
              </Card.Link>
              <Card.Link>
                <i
                  className="fa-solid fa-trash-can text-danger"
                  onClick={() => deleteFn(note._id)}
                ></i>
              </Card.Link>
            </Card.Body>
          </Card>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update note</Modal.Title>
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
            <Button variant="warning" onClick={formik.handleSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
