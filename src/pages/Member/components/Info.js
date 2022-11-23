import React, { useContext, useEffect, useState, useRef } from "react";
import "../styles/member-form.scss";
import { motion } from "framer-motion";
import { MemberInfo } from "../../Login/sub-pages/MemberProvider";
import { useAuth } from "../../Login/sub-pages/AuthProvider";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import TWZipCode from "./TWZipCode";
import axios from "axios";

const Info = () => {
    const { setAuth, ...auth } = useAuth();

    const [selectedFile, setSelectedFile] = useState(null);

    const [isFilePicked, setIsFilePicked] = useState(false);

    const [preview, setPreview] = useState("");

    const [imgServerUrl, setImgServerUrl] = useState("");

    //選擇檔案更動時建立預覽圖

    const [fields, setFields] = useState({
        m_id: auth.m_id,
        lastname: auth.m_last_name,
        firstname: auth.m_first_name,
        avatar: auth.m_avatar,
        birthday: auth.m_birthday,
        email: auth.m_email,
        phone: auth.m_phone,
        address: auth.m_addr,
        county: auth.m_city ? auth.m_city : "",
        area: auth.m_area ? auth.m_area : "",
    });

    // console.log(fields);

    const getUserData = () => {
        axios.get(`http://localhost:3700/member/${auth.m_id}`).then((res) => {
            if (res) {
                // console.log(res.data.user);
                setAuth({ ...auth, ...res.data.user });
            } else {
                Swal.fire({
                    imageUrl: "/member_img/logo.svg",
                    confirmButtonColor: "#224040",
                    title: "糟糕！",
                    color: "#224040",
                    text: "查無會員資料",
                });
            }
        });
    };

    const handleFieldsChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (values) => {
        // e.preventDefault();

        // console.log(values);

        const county = fields.county;
        const area = fields.area;

        const finalForm = { ...values, county: county, area: area };

        // console.log(finalForm);

        const res = await axios.put(
            `http://localhost:3700/member/${auth.m_id}`,
            finalForm
        );

        Swal.fire({
            imageUrl: "/member_img/logo.svg",
            confirmButtonColor: "#224040",
            color: "#224040",
            text: "資料修改完成",
        });

        getUserData();

        // console.log(res);
    };

    const changeHandler = (e) => {
        const file = e.target.files[0];

        // console.log(file.name);

        if (file) {
            setIsFilePicked(true);
            setSelectedFile(file);
            // setImgServerUrl("");
        } else {
            setIsFilePicked(false);
            setSelectedFile(null);
            // setImgServerUrl("");
        }
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append("avatar", selectedFile);

        // console.log(formData);

        fetch(
            `http://localhost:3700/member/upload-avatar/${auth.m_id}`, //server url
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                setImgServerUrl(
                    "http://localhost:3700/avatar_img/" + result.data.name
                );
                getUserData();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    // const tryUpload = async () => {
    //     const url = {
    //         avatar: `http://localhost:3700/avatar_img/${selectedFile.name}`,
    //         sid: auth.m_id,
    //     };

    //     const res = await axios.put(
    //         "http://localhost:3700/member/try-upload",
    //         url
    //     );

    //     setImgServerUrl(url.avatar);

    //     setAuth({ ...auth, m_avatar: url.avatar });

    //     // getUserData();

    //     console.log(res);
    // };

    // useEffect(() => {
    //     if (imgServerUrl !== "") {
    //     }
    // }, [imgServerUrl]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview("");
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        // console.log(objectUrl);
        setPreview(objectUrl);

        // 當元件unmounted時清除記憶體
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    //拖曳上傳
    useEffect(() => {
        const label = document.querySelector(".file-input");
        const input = document.querySelector("#file");
        const para = document.querySelector(".para");
        const avatar = document.querySelector(".avatar");

        // const dropZone = document.querySelector(".drop-zone");

        // if (avatar.src !== "") {
        //     label.classList.add("light-active");
        //     para.style.display = "none";
        // }

        input.addEventListener("change", (e) => {
            label.classList.add("light-active");
            para.style.display = "none";
        });

        // label.addEventListener("click", (e) => {
        //     input.click();
        // });
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="member-body"
            >
                <div className="member-title">會員資料</div>
                <div className="form-container">
                    <div className="left">
                        <Formik
                            initialValues={{
                                lastname: auth.m_last_name
                                    ? auth.m_last_name
                                    : "",
                                firstname: auth.m_first_name
                                    ? auth.m_first_name
                                    : "",
                                birthday: auth.m_birthday
                                    ? auth.m_birthday
                                    : "",
                                email: auth.m_email ? auth.m_email : "",
                                phone: auth.m_phone ? auth.m_phone : "",
                                address: auth.m_addr ? auth.m_addr : "",
                            }}
                            validationSchema={Yup.object({
                                lastname: Yup.string()
                                    .min(1, "至少需一個字")
                                    .max(15, "不可超過15字")
                                    .required("此欄位不可為空"),
                                firstname: Yup.string()
                                    .min(1, "至少需一個字")
                                    .max(15, "不可超過15字")
                                    .required("此欄位不可為空"),
                                birthday:
                                    Yup.string().required("此欄位不可為空"),
                                email: Yup.string()
                                    .email("請輸入有效的email格式")
                                    .required("此欄位不可為空"),
                                phone: Yup.string()
                                    .matches(
                                        /^09[0-9]{8}$/,
                                        "請輸入正確的手機格式"
                                    )
                                    .required("此欄位不可為空"),
                                address: Yup.string()
                                    .min(1, "至少需一個字")
                                    .max(50, "不可超過50字")
                                    .required("此欄位不可為空"),
                            })}
                            onSubmit={(values) => {
                                // console.log(values);
                                handleUpdate(values);
                            }}
                        >
                            {({
                                values,
                                setFieldValue,
                                handleChange,
                                handleBlur,
                            }) => (
                                <Form>
                                    <div className="name">
                                        <div>
                                            <div className="last-name">
                                                姓：
                                            </div>
                                            <div className="input_group">
                                                <Field
                                                    name="lastname"
                                                    type="text"
                                                    placeholder="姓"
                                                    value={values.lastname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <span className="error-msg">
                                                    <ErrorMessage name="lastname" />
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="last-name">
                                                名：
                                            </div>
                                            <div className="input_group">
                                                <Field
                                                    type="text"
                                                    name="firstname"
                                                    placeholder="名"
                                                    value={values.firstname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <span className="error-msg">
                                                    <ErrorMessage name="firstname" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="last-name">
                                            會員生日：
                                        </div>
                                        <div className="input_group">
                                            <Field
                                                name="birthday"
                                                type="date"
                                                value={values.birthday}
                                                onChange={handleChange}
                                            />
                                            <span className="error-msg">
                                                <ErrorMessage name="birthday" />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="last-name">
                                            電子郵件：
                                        </div>
                                        <div className="input_group">
                                            {auth.m_google_id ? (
                                                <>
                                                    {" "}
                                                    <Field
                                                        name="email"
                                                        type="email"
                                                        placeholder="電子郵件"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        disabled
                                                    />
                                                </>
                                            ) : (
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    placeholder="電子郵件"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                            )}

                                            <span className="error-msg">
                                                <ErrorMessage name="email" />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="last-name">
                                            行動電話：
                                        </div>
                                        <div className="input_group">
                                            <Field
                                                name="phone"
                                                type="text"
                                                placeholder="行動電話"
                                                value={values.phone}
                                                onChange={handleChange}
                                                autoComplete="on"
                                            />
                                            <span className="error-msg">
                                                <ErrorMessage name="phone" />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div>會員地址：</div>
                                        <TWZipCode
                                            fields={fields}
                                            setFields={setFields}
                                            onChange={handleChange}
                                        />
                                        <div className="input_group">
                                            <Field
                                                name="address"
                                                type="text"
                                                value={values.address}
                                                onChange={handleChange}
                                                placeholder="地址"
                                            />
                                            <span className="error-msg">
                                                <ErrorMessage name="address" />
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        style={{ marginRight: "20px" }}
                                        onClick={() => {
                                            setFieldValue(
                                                "address",
                                                "復興南路二段8號"
                                            );
                                            setFieldValue(
                                                "phone",
                                                "0987537212"
                                            );
                                            setFieldValue(
                                                "birthday",
                                                "1997-07-03"
                                            );
                                        }}
                                    >
                                        自動填入
                                    </button>
                                    <button type="submit">更新檔案</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="right">
                        <div className="member-title">上傳大頭貼：</div>
                        <div>
                            <label htmlFor="file" className="file-input">
                                <div className="drop-zone">
                                    <p className="para">請選擇檔案</p>
                                    {preview === "" ? (
                                        <>
                                            {auth.m_avatar === null ? (
                                                <>
                                                    <img
                                                        src="/member_img/kindpng_1300217.png"
                                                        className="avatar"
                                                        alt=""
                                                        style={{
                                                            opacity: "0.4",
                                                            filter: "invert(1)",
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <img
                                                    className="avatar"
                                                    src={auth.m_avatar}
                                                    alt=""
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <img
                                            className="avatar"
                                            src={preview}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    accept="image/*"
                                    onChange={changeHandler}
                                />
                            </label>
                            <button
                                className="avatar-check"
                                onClick={handleSubmission}
                            >
                                確定
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Info;
