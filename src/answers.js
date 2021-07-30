import {useEffect, useState} from "react";
import './css/Answers.css';
import {Answer} from "./Answer";
import {AnswerEdit} from "./answerEdit";


export function Answers(props){
    const [answers,setAnswers] = useState([]);
    const [search,setSearch] = useState('');
    const [selectedAnswer,setSelectedAnswer] = useState({text:'',imageURL:''});

    useEffect(() => {
        if(props.answers) {
            setAnswers(props.answers);
        }
    },[props.answers])

    const onSearchChange = (event) => setSearch(event.target.value);
    const onSelectAnswer = (answer) => setSelectedAnswer(answer);

    return (
        <div id='answers-wrapper' className="inner-wrapper">
            <div className="hor-lines inner-title">Answers</div>
            <div id="answer-search">
                <input type="text" value={search} placeholder="Search answers" onChange={onSearchChange}/>
                <button>SEARCH</button>
            </div>
            <div id="title-wrapper">
                <div className="p-20 d-flex flex-column align-end justify-center">Image</div>
                <div className="p-20 d-flex flex-column align-start justify-center">Text</div>
            </div>
            <div id="options-wrapper" className="d-flex flex-column">
                {answers.filter(answer => answer.text.toLowerCase().includes(search.toLowerCase())).map((answer) => {
                    return <Answer selectAnswer={onSelectAnswer} key={answer.text} answer={answer}/>
                })}
            </div>

                <AnswerEdit selectedAnswer={selectedAnswer}/>

        </div>
    )
}
