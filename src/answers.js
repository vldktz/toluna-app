import {useEffect, useState} from "react";
import './css/Answers.css';
import {Answer} from "./Answer";
import {AnswerEdit} from "./answerEdit";


export function Answers(props){
    const [answers,setAnswers] = useState([]);
    const [searchInput,setSearchInput] = useState('');
    const [searchValue,setSearchValue] = useState('');
    const [selectedAnswer,setSelectedAnswer] = useState({text:'',imageURL:''});

    useEffect(() => {
        if(props.answers) {
            setAnswers(props.answers);
        }
    },[props.answers])

    /**
     * search value change event handler
     * @param event
     */
    const onSearchChange = (event) => {
        setSearchInput(event.target.value)
    };

    /**
     * selected answer event handler
     * @param answer
     */
    const onSelectAnswer = (answer) => setSelectedAnswer(answer);

    /**
     * start filter button click event handler
     */
    const onStartFilter = () => setSearchValue(searchInput);

    return (
        <div id='answers-wrapper' className="inner-wrapper">
            <div className="hor-lines inner-title">Answers</div>
            <div id="answer-search">
                <input type="text" value={searchInput} placeholder="Search answers" onChange={onSearchChange}/>
                <button onClick={onStartFilter}>SEARCH</button>
            </div>
            <div id="title-wrapper">
                <div className="p-20 d-flex flex-column align-end justify-center">Image</div>
                <div className="p-20 d-flex flex-column align-start justify-center">Text</div>
            </div>
            <div id="options-wrapper" className="d-flex flex-column">
                {answers.filter(answer => answer.text.toLowerCase().includes(searchValue.toLowerCase())).map((answer) => {
                    return <Answer selectAnswer={onSelectAnswer} key={answer.id} answer={answer}/>
                })}
            </div>

                <AnswerEdit selectedAnswer={selectedAnswer}/>

        </div>
    )
}
