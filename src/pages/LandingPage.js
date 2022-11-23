import Landing from "./LandingPage2"
import "./Home/styles/landing.scss"
import { motion,
  useScroll,
  useTransform,
  MotionValue } from "framer-motion"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useBackground } from "../utils/useBackground"



function LandingIndex(props) {
    const { setBackground } = useBackground();
    
    //背景控制hook
    useEffect(() => {
        setBackground("indexBgw.svg");
    }, []);
    return (
    <>
        <div className="fullscreenLanding">
            <Landing/>
        </div>
    <div className="landingBg">
        <div className="try"></div>
        <div className="lt1">
            <motion.div
                initial={{ opacity: 0, y:200 }}
                whileInView={{ opacity: 1, y:0 }}
                transition={{
                delay: 0.2,
                default: { ease: "linear" },
                }}>
                <h5 className="p-lg-5 p-sm-4 landingTitle">WANT TO ESCAPE THE CITY ?</h5>
                <div id="scrolldown">
                    <a>
                        <span></span>Scroll
                    </a>
                </div>
            </motion.div>
        </div>
    <section>
    <div className="sc1">
        <img src="/landing_imgs/1-5.jpeg" alt=""/>
    </div>
        <div className="sc1">
            <motion.div
                    initial={{ opacity: 0, x:-500 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.8,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/1-4.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc1">
            <motion.div
                    initial={{ opacity: 0, x:-500 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.8,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/1-3.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc1">
            <motion.div
                    initial={{ opacity: 0, x:-500 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 1,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/1-2.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc1">
            <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 1.2,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/1-1.svg" alt=""/>
            </motion.div>
        </div>    
        <div className="sc1title">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.8,
                default: { ease: "linear" },
            }}>
                    <h4 className="lt2 ">LOOKING FOR</h4>
            </motion.div>
        </div>            
        <div className="sc1title">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.9,
                default: { ease: "linear" },
            }}>
            <span className="d-flex align-items-center"><h2 className="lt2">CAMPING</h2><h4 className="lt2">尋找露營之旅</h4></span>
            </motion.div>
        </div>
    </section>
    <section>
        <div className="sc2">
            <motion.div
                    initial={{ opacity: 0, x:-500 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.7,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/2-4.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc2">
            <motion.div
                    initial={{ opacity: 0, x:-500 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.7,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/2-3.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc2">
            <motion.div
                    initial={{ opacity: 0, x:-500 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.8,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/2-2.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc2">
            <motion.div
                    initial={{ opacity: 0, y: -500 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 1.2,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/2-1.svg" alt=""/>
            </motion.div>
        </div>    
        <div className="sc1title2">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.7,
                default: { ease: "linear" },
            }}>
                <h4 className="lt2 slth4-2">STICK TOGETHER</h4>
            </motion.div>
        </div>            
        <div className="sc1title2">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.8,
                default: { ease: "linear" },
            }}>
            <span className="d-flex align-items-center slth2-2"><h2 className="lt2">FRIENDSHIP</h2><h4 className="lt2">團結的考驗</h4></span>
            </motion.div>
        </div>
    </section>
    <section>
        <div className="sc3">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.9,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/3-3.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc3">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.9,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/3-2.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc3">
            <motion.div
                    initial={{ opacity: 0, y: 300 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 1.2,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/3-1.svg" alt=""/>
            </motion.div>
        </div>    
        <div className="sc1title3">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.7,
                default: { ease: "linear" },
            }}>
                <h4 className="lt2">ALONE WITH</h4>
            </motion.div>
        </div>            
        <div className="sc1title3">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.8,
                default: { ease: "linear" },
            }}>
            <span className="d-flex align-items-center"><h2 className="lt2">NATURE</h2><h4 className="lt2">與大自然約會</h4></span>
            </motion.div>
        </div>
    </section>
    <section>
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, y:-300 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 1.2,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-11.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, y: -300 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 1,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-10.svg" alt=""/>
            </motion.div>
        </div>    
    <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, y:-300 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 0.9,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-9.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.9,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-8.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, x: -300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.9,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-7.svg" alt=""/>
            </motion.div>
        </div>    
    <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.9,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-6.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.9,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-5.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, x: -300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.8,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-4.svg" alt=""/>
            </motion.div>
        </div>    
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.8,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-3.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, y:300 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 1.5,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-2.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc4">
            <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 0.7,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/4-1.svg" alt=""/>
            </motion.div>
        </div>    
        <div className="sc1title4">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.7,
                default: { ease: "linear" },
            }}>
                <h4 className="lt2">LOOK INTO</h4>
            </motion.div>
        </div>            
        <div className="sc1title4">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.7,
                default: { ease: "linear" },
            }}>
            <span className="d-flex align-items-center"><h2 className="lt2">THE SOUL</h2><h4 className="lt2">淨化心靈</h4></span>
            </motion.div>
        </div>
    </section>
    <section>
    <div className="sc5">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.8,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/5-4.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc5">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.8,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/5-3.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc5">
            <motion.div
                    initial={{ opacity: 0, x:-300 }}
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{
                    delay: 0.9,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/5-2.svg" alt=""/>
            </motion.div>
        </div>
        <div className="sc5">
            <motion.div
                    initial={{ opacity: 0, y: -300 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{
                    delay: 1.2,
                    default: { ease: "linear" },
                    duration: 2,
                    }}>
                    <img src="/landing_imgs/5-1.svg" alt=""/>
            </motion.div>
        </div>    
        <div className="sc1title5">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.5,
                default: { ease: "linear" },
            }}>
                <h4 className="lt2">CHASING LIBERTY</h4>
            </motion.div>
        </div>            
        <div className="sc1title5">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                delay: 0.7,
                default: { ease: "linear" },
            }}>
            <span className="d-flex align-items-center"><h2 className="lt2">LIKE THE WIND</h2><h4 className="lt2">追逐自由之風</h4></span>
            </motion.div>
        </div>
    </section>
        <Link to="/shuyoung" className="landingbtn btn_works">Entry</Link>
        
    </div>
    </>
    )
}
export default LandingIndex;