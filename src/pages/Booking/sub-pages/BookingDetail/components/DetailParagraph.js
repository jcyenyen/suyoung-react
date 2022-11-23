import React, { useEffect } from "react";
import {
    ScrollMotionContainer,
    ScrollMotionItem,
} from "../../../components/scrollMotion";

function DetailParagraph(props) {
    const { ruleList } = props;

    useEffect(() => {
        if (ruleList.length === 0) return;
        // gsap 特效
    }, [ruleList]);

    if (ruleList.length === 0) return;
    return (
        <>
            
            <div className="room_detail_paragraph">
                
                <ScrollMotionContainer element="div" className="detail_paragraph_title">
                    <ScrollMotionItem element="h1" className="project-text">
                        NOTICE
                    </ScrollMotionItem>
                </ScrollMotionContainer>
                <ScrollMotionContainer element="div" className="description">
                    <ScrollMotionItem element="h4" className="project-text">
                        營業時間
                    </ScrollMotionItem>
                    <ScrollMotionItem element="p" className="project-text">
                        check-in : {ruleList[0].check_in}
                    </ScrollMotionItem>
                    <ScrollMotionItem element="p" className="project-text">
                        check-in : {ruleList[0].check_out}
                    </ScrollMotionItem>
                    <ScrollMotionItem element="p" className="project-text">
                        Business-time : {ruleList[0].Business_hour}
                    </ScrollMotionItem>
                </ScrollMotionContainer>

                <ScrollMotionContainer element="div" className="description">
                    <ScrollMotionItem element="h4" className="project-text">
                        Check-in Roles
                    </ScrollMotionItem>
                    <ScrollMotionItem element="p" className="project-text">
                        {ruleList[0].Checkin_Roles}
                    </ScrollMotionItem>
                </ScrollMotionContainer>

                <ScrollMotionContainer element="div" className="description">
                    <ScrollMotionItem element="h4" className="project-text">
                        Pets-Roles
                    </ScrollMotionItem>
                    <ScrollMotionItem element="p" className="project-text">
                        {ruleList[0].Pets_Roles}
                    </ScrollMotionItem>
                </ScrollMotionContainer>

                <ScrollMotionContainer element="div" className="description">
                    <ScrollMotionItem element="h4" className="project-text">
                        Room Info
                    </ScrollMotionItem>
                    <ScrollMotionItem element="p" className="project-text">
                        {ruleList[0].hotel_Info}
                    </ScrollMotionItem>
                </ScrollMotionContainer>

                <ScrollMotionContainer element="div" className="description">
                    <ScrollMotionItem element="h4" className="project-text">
                        Precautions
                    </ScrollMotionItem>
                    <ScrollMotionItem element="p" className="project-text">
                        {ruleList[0].Precautions}
                    </ScrollMotionItem>
                </ScrollMotionContainer>
            </div>
        </>
    );
}

export default DetailParagraph;
