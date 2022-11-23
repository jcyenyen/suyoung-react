import React, { useState, serializeFormQuery } from "react";
import axios from "axios";
import { useAuth } from "../../Login/sub-pages/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
    const { setAuth, ...auth } = useAuth();

    const [password, setPassword] = useState({
        newPassword: "",
        comfirmPassword: "",
    });

    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.newPassword === "" || password.comfirmPassword === "") {
            Swal.fire({
                imageUrl: "/member_img/logo.svg",
                confirmButtonColor: "#224040",
                title: "糟糕！",
                color: "#224040",
                text: "請填入密碼",
            });
        } else if (password.newPassword !== password.comfirmPassword) {
            Swal.fire({
                imageUrl: "/member_img/logo.svg",
                confirmButtonColor: "#224040",
                title: "糟糕！",
                color: "#224040",
                text: "新密碼與確認密碼不符",
            });
        } else {
            const res = await axios.put(
                `http://localhost:3700/join/reset-password?token=${token}`,
                password
            );
            // console.log(res);

            if (res.data.success === true) {
                Swal.fire({
                    imageUrl: "/member_img/logo.svg",
                    confirmButtonColor: "#224040",
                    color: "#224040",
                    text: "修改完成，請重新登入",
                });
                navigate("/shuyoung/join");
            } else {
                Swal.fire({
                    imageUrl: "/member_img/logo.svg",
                    confirmButtonColor: "#224040",
                    title: "糟糕！",
                    color: "#224040",
                    text: "有錯誤",
                });
            }
        }
    };

    return (
        <>
            <div className="reset-password">
                <form onSubmit={handleSubmit}>
                    <label className="reset-password">重設密碼：</label>
                    <input
                        name="newPassword"
                        value={password.newPassword}
                        className="password-input"
                        onChange={handleFieldsChange}
                        type="password"
                    />
                    <label className="reset-password">確認密碼：</label>
                    <input
                        name="comfirmPassword"
                        className="password-comfirm"
                        value={password.comfirmPassword}
                        onChange={handleFieldsChange}
                        type="password"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setPassword({
                                newPassword: "bearbear",
                                comfirmPassword: "bearbear",
                            });
                        }}
                    >
                        自動填入
                    </button>
                    <button type="submit">送出</button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
