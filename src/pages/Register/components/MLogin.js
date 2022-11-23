import "../../Login/styles/login.scss";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Login/sub-pages/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import Example from "./PopUp";
const MLogin = () => {
    const [myform, setMyform] = useState({
        account: "",
        password: "",
    });

    const [URL, setURL] = useState("");

    const { setAuth } = useAuth();

    useEffect(() => {
        const handleGoogle = async () => {
            const res = await axios.get(
                "http://localhost:3700/join/api/v1/auth/google"
            );

            setURL(res.data);
        };

        handleGoogle();
    }, []);

    const changeFields = (event) => {
        const id = event.target.id;
        const val = event.target.value;

        setMyform({ ...myform, [id]: val });
    };

    // useEffect(() => {
    //     console.log("auth change!!!!");
    // }, [auth]);

    const navigate = useNavigate();

    const whenSubmit = (event) => {
        event.preventDefault();

        // console.log(myform);
        // TODO: 欄位檢查

        fetch("http://localhost:3700/join/login", {
            method: "POST",
            body: JSON.stringify(myform),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => r.json())
            .then((result) => {
                if (result.success) {
                    localStorage.setItem("auth", JSON.stringify(result.data));
                    Swal.fire({
                        imageUrl: "/member_img/logo.svg",
                        confirmButtonColor: "#224040",
                        color: "#224040",
                        text: "登入成功，即將跳轉至會員頁面",
                    });
                    // console.log({ ...result.data });
                    setAuth({
                        ...result.data,
                        authorized: true,
                    });
                    navigate("/shuyoung/Member");
                } else if (result.code === 401) {
                    Swal.fire({
                        imageUrl: "/member_img/logo.svg",
                        confirmButtonColor: "#224040",
                        title: "糟糕！",
                        color: "#224040",
                        text: "查無此帳號，請先申請會員",
                    });
                } else {
                    Swal.fire({
                        imageUrl: "/member_img/logo.svg",
                        confirmButtonColor: "#224040",
                        title: "糟糕！",
                        color: "#224040",
                        text: "帳號或密碼錯誤",
                    });
                }
            });
    };

    return (
        <>
            <div className="login-container">
                <div className="login-title">舒營-會員登入</div>
                <div className="login-card">
                    <form onSubmit={whenSubmit}>
                        <div className="account-title">帳號：</div>
                        <div className="account-group">
                            <input
                                className="login-input"
                                type="text"
                                id="account"
                                name="account"
                                value={myform.account}
                                onChange={changeFields}
                                required
                            />
                            <label>Username</label>
                        </div>
                        <div className="account-title">密碼：</div>
                        <div className="account-group">
                            <input
                                className="login-input"
                                type="password"
                                id="password"
                                name="password"
                                value={myform.password}
                                onChange={changeFields}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="login-btn">
                            <button
                                className="auto-fill"
                                type="button"
                                onClick={() => {
                                    setMyform({
                                        account: "bearbear",
                                        password: "bearbear",
                                    });
                                }}
                                style={{ marginRight: "20px" }}
                            >
                                自動填入
                            </button>
                            <button type="submit" className="submit-login">
                                登入
                            </button>
                        </div>
                    </form>
                    <Example />
                    <div className="third-party">
                        <div className="google-login">
                            <a href={URL}>
                                login with google
                                <img src="/member_img/google-icon.svg" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MLogin;
