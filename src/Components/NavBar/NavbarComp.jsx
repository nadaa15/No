import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import style from "./NavbarComp.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { notesAtom } from "../../Atoms/notesAtom";

function NavbarComp() {
  let [noteLenght,setNoteLength] = useRecoilState(notesAtom)
  let navigate = useNavigate()
  let userToken = localStorage.getItem("token") || null;

  function logout() {
    localStorage.removeItem("token");
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className=" bg-body-secondary shadow fixed-top">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-danger fw-bolder fs-3">
            Sticky App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="text-center outline">
          <Nav className="ms-auto my-2 my-lg-0">
            {userToken == null ? (
              <>
                <Nav.Link>
                  <Link to="/register">Register</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <div className="position-relative d-flex justify-content-center align-items-center text-danger">
                  <h6 className="position-absolute bottom-50 mb-2">
                    {noteLenght}
                  </h6>
                  <i class="fa-solid fa-box-open fa-lg"></i>
                </div>
                <Nav.Link className="link" onClick={logout}>
                  Logout
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
