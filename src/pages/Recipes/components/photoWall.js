import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/footer";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../styles/global.scss";
import "../styles/index.scss";

function PhotoWall(props) {
    return (
        <>
            <header>
                <h4 className="text-center fw-bold mb-5 title_color">大廚必比登</h4>
            </header>
            <section>
                <div className="d-none j_container d-flex justify-content-around text-center mb-5">
                    <div className="col-4 m-auto mt-2 rounded-pill fw-bold d-flex align-items-center justify-content-center btn_font_color menu_button">新增必比登</div>
                    <div className="col-4 m-auto mt-2 rounded-pill fw-bold d-flex align-items-center justify-content-center btn_font_color menu_button">編輯必比登</div>
                </div>
            </section>
            <section>
                <div className="j_container">
                    <div className="d-md-flex justify-content-md-between">
                        <div>
                            <div className="col-7 d-none d-md-block text-center m-auto">
                                <h4 className="recipe_title pb-3 border-bottom border-2 border-dark">#hash Tag</h4>
                            </div>            
                            <div className="d-flex flex-wrap col-10 col-md-7 m-auto">
                                <h4 className="px-3 py-2 recipe_title">#美食</h4>
                                <h4 className="px-3 py-2 recipe_title">#懶人</h4>
                                <h4 className="px-3 py-2 recipe_title">#親子</h4>
                                <h4 className="px-3 py-2 recipe_title">#男友力</h4>
                                <h4 className="px-3 py-2 recipe_title">#網美</h4>
                                <h4 className="px-2 py-2 recipe_title">#星空</h4>
                            </div>
                        </div>    
                        <div className="col-md-4 d-none d-md-block">
                            <h5 className="fw-bold title_color">搜尋</h5>
                            <input type="text" />
                        </div>
                    </div>    
                </div>
            </section>
            <section>
                <div className="j_container photowall">

                </div>
            </section>
        </>
    );
}

export default PhotoWall;