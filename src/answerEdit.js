import plusIcon from "./assets/svg/plus-icon.svg";
import React, {useEffect, useRef, useState} from "react";
import './css/AnswerEdit.css';
import {useDispatch} from "react-redux";

export function AnswerEdit(props) {
    const [currentAnswer, setCurrentAnswer] = useState({text: '', imageURL: ''});
    const [canEdit,setCanEdit] = useState(false);
    const [isNewAnswer,setIsNewAnswer] = useState(false);
    const dispatch = useDispatch();
    let fileUpload = useRef(null);
    let timer;

    useEffect(() => {
        if (props.selectedAnswer && props.selectedAnswer.text.length > 0) {
            setCurrentAnswer(props.selectedAnswer);
            setCanEdit(true);
            setIsNewAnswer(false);
            setTime();
        }
    }, [props.selectedAnswer])

    /**
     * since no exit button was given in the mockup, I decided to give 10 sec for the update,
     * and if no action was taken, just fall back to the original state
     */
    const setTime = () => {
        clearTimeout(timer);
        setCanEdit(true);
        timer = setTimeout(() => {
            setCurrentAnswer({text: '', imageURL: ''});
            setCanEdit(false);
            clearTimeout(timer);
        }, 10000);

    }

    const newAnswer = () => {
        setIsNewAnswer(true);
        setCurrentAnswer({text: '', imageURL: ''});
        setTime();
    }
    const onTextChange = (event) => {
        setCurrentAnswer({...currentAnswer,text: event.target.value});
        setTime();
    }
    const cutText = (text) => text?.length > 15 ? `${text.slice(0, 15)}...` : text;
    const onFileUploadClick = () => {
        fileUpload.current.click();
        setTime();
    }
    const onSave = () => {
        setCanEdit(false);
        dispatch({type:isNewAnswer?'NEW_ANSWER':'EDIT_ANSWER',payload: currentAnswer});
        setCurrentAnswer({text:'',imageURL:''})
        clearTimeout(timer);
    }
    const uploadFile = (event) => {
        //this won't really work since i cant load local resources. some BE API needed here
        setCurrentAnswer({...currentAnswer,imageURL: event.target.value});
    }

    return (
        <div id="editAnswer-wrapper" className="d-flex align-center justify-center">
            {! canEdit?
                <div id="answer-new" className="action-btn d-flex align-center justify-center" onClick={newAnswer}>
                    <img src={plusIcon} alt="remove"/>
                </div>
                :
                <div id="edit-wrapper" className="d-flex">
                    <input type="file" className="d-none" ref={fileUpload} onChange={uploadFile}/>
                    <div id="file-btn">
                        <button onClick={onFileUploadClick}>Choose File</button>
                    </div>
                    <div id="file-text">
                        <span>{currentAnswer?.imageURL?.length > 0 ? cutText(currentAnswer.imageURL) : 'No file chosen'}</span>
                    </div>
                    <div id="answer-text">
                        <input  type="text" value={currentAnswer?.text} onChange={onTextChange}
                               placeholder="Answer text..."/>
                    </div>
                    <div id="save-btn">
                        <button onClick={onSave}>SAVE</button>
                    </div>
                </div>
            }
        </div>
    )
}
