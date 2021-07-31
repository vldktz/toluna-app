import {useEffect, useState} from "react";
import minusIcon from './assets/svg/minus-icon.svg';
import './css/Answer.css';
import {useDispatch} from "react-redux";

export function Answer(props) {
    const [answer, setAnswer] = useState({text:'',imageURL:''});
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.answer)
            setAnswer(props.answer);
    }, [props.answer]);

    const removeAnswer = (e) => {
        e.stopPropagation();
        dispatch({type:'DELETE_ANSWER',payload:answer});
    }

    return (
        <div className="option-wrapper d-flex align-center" onClick={e => props.selectAnswer(answer)}>
            <div className="answer-image d-flex flex-column align-end justify-center p-5">
                <div className="image" style={{backgroundImage: `url(${answer.imageURL})`}}/>
            </div>
            <div className="answer-text p-20 d-flex flex-column align-start justify-center">{answer.text}</div>
            <div className="answer-delete action-btn d-flex align-center justify-center" onClick={removeAnswer}>
                <img src={minusIcon} alt="remove"/>
            </div>
        </div>
    )
}
