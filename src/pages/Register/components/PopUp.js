import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";

function Example() {
    const [show, setShow] = useState(false);

    const [field, setField] = useState({
        emailAddress: "",
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOnChange = (event) => {
        setField({ emailAddress: event.target.value });
    };

    const handleSubmit = async () => {
        const res = await axios.post(
            "http://localhost:3700/join/reset-password-email",
            field
        );

        // console.log(res);
        handleClose();

        Swal.fire({
            imageUrl: "/member_img/logo.svg",
            confirmButtonColor: "#224040",

            color: "#224040",
            text: "重設密碼郵件已寄出，請至信箱收信，謝謝！",
        });
    };

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                忘記密碼？
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>忘記密碼</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>請輸入您註冊時的電子郵件：</Form.Label>
                            <Form.Control
                                className="email"
                                type="email"
                                placeholder="name@example.com"
                                value={field.emailAddress}
                                autoFocus
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        關閉
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setField({
                                emailAddress: "shinderr0125@gmail.com",
                            });
                        }}
                    >
                        自動填入
                    </Button>
                    <Button variant="dark" onClick={handleSubmit}>
                        送出
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
