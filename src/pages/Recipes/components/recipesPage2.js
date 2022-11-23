import React, { useState, useEffect } from "react";
import { useBackground } from "../../../utils/useBackground";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/footer";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../styles/global.scss";
import "../styles/index.scss";
import { stop } from "fontawesome";
// import { setMinutes, setSeconds } from "date-fns";
// import { setSeconds } from "date-fns";


function RecipesPage2(props) {
    //資料
    const [recipes, setRecipes] = useState([])
    const [tutorial, setTutorial] = useState([])
    //倒數計時
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(5)

    let timer;
    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds - 1)
            if (seconds === 0) {
                setMinutes(minutes - 1)
                setSeconds(59)
            }
        }, 1000)
        return () => clearInterval(timer)
    })

    const restart = () => {
        setMinutes(5)
        setSeconds(0)
    }

    const stop = () => {
        clearInterval(timer)
    }

    const step1 =()=> {
        setMinutes(5)
        setSeconds(0)
    }

    const step2 =()=> {
        setMinutes(7)
        setSeconds(0)
    }

    const step3 =()=> {
        setMinutes(5)
        setSeconds(0)
    }

    const step4 =()=> {
        setMinutes(4)
        setSeconds(0)
    }

    const step5 =()=> {
        setMinutes(3)
        setSeconds(0)
    }

    //sid
    const { sid } = useParams()
    const pageSid = +sid
    //頁籤
    const [togglestate, setTogglestate] = useState(1)

    const toggleTab = (index) => {
        setTogglestate(index);
    }

    // 來自useBackground 的設定
    const { setBackground } = useBackground();
    // 進入該頁設定背景
    useEffect(() => {
        setBackground("bg_1.svg");
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3700/recipes/api/get').then((response) => {
            setRecipes(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3700/recipes/api/tutorial').then((response) => {
            setTutorial(response.data);
            // console.log('11', response.data)
        })
    }, []);

    return (
        <>
            <div>
                <header>
                    <h4 className="text-center fw-bold title_color menu_content">
                        <Link to={`/shuyoung/recipes`}>
                            天菜大廚
                        </Link>
                    </h4>
                </header>
                {/* const setRecipes ={...V , quanity:1 
                localStorage.setItem("recipes",JSON.stringtify(setRecipes)) */}
                {/* <div>
                    {!!recipes && recipes.length ? recipes.filter((v, i) => {
                        return v.sid === pageSid
                    }).map((v, i) => {
                        return <>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                const setRecipes = { ...v, quanity: 1 };
                                localStorage.setItem("recipes", JSON.stringify(setRecipes))
                            }}>send storage</button>
                        </>
                    }) : null}
                </div> */}
                <section className="mb-5">
                    <div className="j_container">
                        {!!recipes && recipes.length ? recipes.filter((v, i) => {
                            return v.sid === pageSid
                        })
                            .map((v, i) => {
                                console.log(recipes.filter((v, i) => {
                                    return v.sid === pageSid
                                }))
                                return <>
                                    <div className="d-md-none text-center mt-5">
                                        <img className="col-10 recipe_picture rounded-circle" src={`/recipes_img/${v.res_img}`} alt="" />
                                    </div>
                                    <div className="glass mt-5 d-md-flex menu ">
                                        <div className="col-5 d-none d-md-block text-center ">
                                            <img className="col-12 recipe_picture rounded-circle position-relative" src={`/recipes_img/${v.res_img}`} alt="" />
                                        </div>
                                        <div className="col-md-7">
                                            <div className="w-75 m-auto border-bottom pt-3 pb-md-3">
                                                <div className="recipe_title mt-3 text-center">{v.res_name}</div>
                                                <div className="recipe_title ms-5 text-center"></div>
                                            </div>
                                            <div className="pb-3 d-md-flex justify-content-evenly align-items-center">
                                                <div className="recipe_line pe-md-5 ms-md-5">
                                                    <div className="d-flex justify-content-center m-3 pb-md-5">
                                                        <h5 className="recipe_material">材料:</h5>
                                                        <h5 className="recipe_material ingredient">
                                                            {v.ingredient}
                                                        </h5>
                                                    </div>
                                                    <div className="d-flex justify-content-center m-3 pt-md-5">
                                                        <h5 className="recipe_material">時間:</h5>
                                                        <h5 className="recipe_material">
                                                            {v.cook_time}
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="pt-md-5">
                                                    <div className="d-flex justify-content-center m-3">
                                                        <h5 className="recipe_material">建議人數:</h5>
                                                        <h5 className="recipe_material">
                                                            {v.serves}
                                                        </h5>
                                                    </div>
                                                    <div className="d-flex justify-content-center m-3">
                                                        <h5 className="recipe_material">鍋具:</h5>
                                                        <h5 className="recipe_material">
                                                            {v.tool}
                                                        </h5>
                                                    </div>
                                                    <div className="d-flex justify-content-center m-3">
                                                        <h5 className="recipe_material">葷/素：</h5>
                                                        <h5 className="recipe_material">
                                                            {v.recipe_type}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }) : null}
                    </div>
                </section>
                <section className="mb-5">
                    <div className="j_container pt-md-5">
                        <div className="glass step mb-md-3 text-center">
                            <div className="recipe_title border-bottom border-2 w-75 m-auto mb-3 pt-3 pb-md-5 pt-md-5 text-center">How To Do: </div>
                            <div className="border border-dark rounded-pill col-9 m-auto  d-md-none">
                                <div className="step_button m-auto text-center rounded-pill my-2 py-1 recipe_title" onClick={() => toggleTab(1)}>Step 1.</div>
                            </div>
                            <div className={togglestate === 1 ?"col-9 m-auto text-white text-center d-md-none" :"col-9 m-auto text-white text-center d-md-none content_page"}>
                                <div className="col-9 m-auto">準備章魚燒的餡料，將章魚切成自己喜歡的大小，高麗菜切末，青蔥切成蔥花。</div>
                                <div><img className="col-10" 
                                src={`/recipes_img/octopusball1.svg`}></img>
                                </div>
                            </div>
                            <div className="border border-dark rounded-pill col-9 m-auto  d-md-none">
                                <div className="step_button m-auto text-center rounded-pill my-2 py-1 recipe_title" onClick={() => toggleTab(2)}>Step 2.</div>
                            </div>
                            <div className={togglestate === 2 ?"col-9 m-auto text-white text-center d-md-none" :"col-9 m-auto text-white text-center d-md-none content_page"}>
                                <div className="col-9 m-auto">中小火預熱章魚燒烤盤並刷上油，將預拌好的麵糊用大湯匙舀入章魚燒盤。</div>
                                <div><img className="col-10" 
                                src={`/recipes_img/octopusball2.svg`}></img>
                                </div>
                            </div>
                            <div className="border border-dark rounded-pill col-9 m-auto  d-md-none">
                                <div className="step_button m-auto text-center rounded-pill my-2 py-1 recipe_title" onClick={() => toggleTab(3)}>Step 3.</div>
                            </div>
                            <div className={togglestate === 3 ?"col-9 m-auto text-white text-center d-md-none" :"col-9 m-auto text-white text-center d-md-none content_page"}>
                                <div className="col-9 m-auto">待麵糊稍微凝固後放入章魚，這樣章魚才會置中。</div>
                                <div><img className="col-10" 
                                src={`/recipes_img/octopusball3.svg`}></img>
                                </div>
                            </div>
                            <div className="border border-dark rounded-pill col-9 m-auto  d-md-none">
                                <div className="step_button m-auto text-center rounded-pill my-2 py-1 recipe_title" onClick={() => toggleTab(4)}>Step 4.</div>
                            </div>
                            <div className={togglestate === 4 ?"col-9 m-auto text-white text-center d-md-none" :"col-9 m-auto text-white text-center d-md-none content_page"}>
                                <div className="col-9 m-auto">撒上高麗菜末、蔥末、天婦羅花，最後再撒上一層麵糊，稍微煮一會兒至麵糊稍微變硬。</div>
                                <div><img className="col-10" 
                                src={`/recipes_img/octopusball4.svg`}></img>
                                </div>
                            </div>
                            <div className="border border-dark rounded-pill col-9 m-auto d-md-none">
                                <div className="step_button m-auto text-center rounded-pill my-2 py-1 recipe_title" onClick={() => toggleTab(5)}>Step 5.</div>
                            </div>
                            <div className={togglestate === 5 ?"col-9 m-auto pb-5 text-white text-center d-md-none" :"col-9 pb-5 m-auto text-white text-center d-md-none content_page"}>
                                <div className="col-9 m-auto">依照個人喜好抹上章魚燒醬、淋上美乃滋、海苔以及柴魚片後即可食用。</div>
                                <div><img className="col-10" 
                                src={`/recipes_img/octopusball5.svg`}></img>
                                </div>
                            </div>                            
                            <div className="d-none d-md-flex col-md-10 m-auto">
                                <div className="col-md-3 border-end border-2">
                                    <div className="step_button col-md-7 m-auto text-center rounded-pill border border-dark my-5 py-1 recipe_title" onClick={() => {toggleTab(1);step1()}}>Step 1.</div>
                                    <div className="step_button col-md-7 m-auto text-center rounded-pill border border-dark my-5 py-1 recipe_title" onClick={() => {toggleTab(2);step2()}}>Step 2.</div>
                                    <div className="step_button col-md-7 m-auto text-center rounded-pill border border-dark my-5 py-1 recipe_title" onClick={() => {toggleTab(3);step3()}}>Step 3.</div>
                                    <div className="step_button col-md-7 m-auto text-center rounded-pill border border-dark my-5 py-1 recipe_title" onClick={() => {toggleTab(4);step4()}}>Step 4.</div>
                                    <div className="step_button col-md-7 m-auto text-center rounded-pill border border-dark my-5 py-1 recipe_title" onClick={() => {toggleTab(5);step5()}}>Step 5.</div>
                                </div>
                                <div className="col-md-9">
                                    {!!tutorial && tutorial.length ? tutorial.filter((v, i) => {
                                        return v.sid === pageSid
                                    })
                                        .map((v, i) => {
                                            console.log('tur', tutorial)
                                            return <>
                                                <h5 className={togglestate === 1 ? "col-md-9 py-md-5 m-auto text-white" : "col-md-9 py-md-5 m-auto text-white content_page"}>{v.step1}</h5>
                                                <h5 className={togglestate === 2 ? "col-md-9 py-md-5 m-auto text-white" : "col-md-9 py-md-5 m-auto text-white content_page"}>{v.step2}</h5>
                                                <h5 className={togglestate === 3 ? "col-md-9 py-md-5 m-auto text-white" : "col-md-9 py-md-5 m-auto text-white content_page"}>{v.step3}</h5>
                                                <h5 className={togglestate === 4 ? "col-md-9 py-md-5 m-auto text-white" : "col-md-9 py-md-5 m-auto text-white content_page"}>{v.step4}</h5>
                                                <h5 className={togglestate === 5 ? "col-md-9 py-md-5 m-auto text-white" : "col-md-9 py-md-5 m-auto text-white content_page"}>{v.step5}</h5>
                                                <div className="d-flex">
                                                    <div className={togglestate === 1 ? "col-9 text-md-center" : "col-9 text-md-center content_page"}>
                                                        <img className="col-md-9 img_height" src={`/recipes_img/${v.step1_img}`} alt="" />
                                                    </div>
                                                    <div className={togglestate === 2 ? "col-9 text-md-center" : "col-9 text-md-center content_page"}>
                                                        <img className="col-md-9 img_height" src={`/recipes_img/${v.step2_img}`} alt="" />
                                                    </div>
                                                    <div className={togglestate === 3 ? "col-9 text-md-center" : "col-9 text-md-center content_page"}>
                                                        <img className="col-md-9 img_height" src={`/recipes_img/${v.step3_img}`} alt="" />
                                                    </div>
                                                    <div className={togglestate === 4 ? "col-9 text-md-center" : "col-9 text-md-center content_page"}>
                                                        <img className="col-md-9 img_height" src={`/recipes_img/${v.step4_img}`} alt="" />
                                                    </div>
                                                    <div className={togglestate === 5 ? "col-9 text-md-center" : "col-9 text-md-center content_page"}>
                                                        <img className="col-md-9 img_height" src={`/recipes_img/${v.step5_img}`} alt="" />
                                                    </div>
                                                    <div className="col-3 text-center">
                                                        <div className="recipe_title mt-5">大廚計時器</div>
                                                        <div className="col-md-8 m-auto text-center rounded-pill border border-dark my-4 recipe_title ">{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
                                                        <div className="d-flex mt-5 pt-5">
                                                            <div className="col-5 m-auto mt-5 rounded-pill fw-bold d-flex align-items-center justify-content-center btn_font_color menu_button" onClick={restart}>重新烹調</div>
                                                            <div className="col-5 m-auto mt-5 rounded-pill fw-bold d-flex align-items-center justify-content-center btn_font_color menu_button" onClick={stop}>稍做休息</div>
                                                        </div>
                                                        <h5 className="col-6 d-none m-auto mt-5 text-center text-white">price:300</h5>
                                                        <button className="col-6 d-none rounded-pill m-auto mt-2 py-2 text-white btn_bgc_color text-center" type="button" onClick="" >加入購物車</button>
                                                    </div>
                                                </div>
                                            </>
                                        }) : null}
                                </div>
                            </div>
                            <h5 className="d-none col-4 col-md-1 rounded-pill m-auto mb-3 py-2 text-white btn_bgc_color text-center">加入購物車</h5>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default RecipesPage2;
