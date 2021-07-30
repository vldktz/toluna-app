import './css/Question.css';
import {useEffect, useState} from "react";

export function Question(props){
    const [question,setQuestion] = useState({text:'',imageURL:''});
    useEffect(() => {
        if(props.question)
            setQuestion(props.question)
    },[props.question])

    const onQuestionChange = (event) => setQuestion({...question,text: event.target.value})

    return (
        <div className="inner-wrapper" id="questions-wrapper">
            <div id='question-img-container'>
                <img src={question.imageURL} alt=''/>
            </div>
            <div className="hor-lines inner-title">Question</div>
            <div id="question-edit">
                <input type="text" value={question.text} onChange={onQuestionChange}/>
                <button>EDIT</button>
            </div>
        </div>
    )
}

