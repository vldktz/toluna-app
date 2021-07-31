import './css/Question.css';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

export function Question(props){
    const dispatch = useDispatch();
    const [question,setQuestion] = useState({text:'',imageURL:''});
    useEffect(() => {
        if(props.question && Object.keys(props.question).length > 0)
            setQuestion(props.question)
    },[props.question])

    /**
     * question text change handler
     * @param event
     */
    const onQuestionChange = (event) => setQuestion({...question,text: event.target.value})

    /**
     * save question event handler
     * @return {{payload: {imageURL: string, text: string}, type: string}}
     */
    const saveQuestion = () => dispatch({type:'EDIT_QUESTION',payload: question});

    return (
        <div className="inner-wrapper" id="questions-wrapper">
            <div id='question-img-container'>
                <img src={question.imageURL} alt=''/>
            </div>
            <div className="hor-lines inner-title">Question</div>
            <div id="question-edit">
                <input type="text" value={question.text} onChange={onQuestionChange}/>
                <button onClick={saveQuestion}>EDIT</button>
            </div>
        </div>
    )
}

