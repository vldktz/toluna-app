import axios from "axios";
import './css/QuestionsAndAnswers.css';
import logo from './assets/images/Toluna-Logo.png';
import {Question} from "./question"
import {Answers} from "./answers";


import {useEffect, useState} from "react";

export function QuestionsAndAnswers() {
    const [questionsAndAnswer, setQuestionsAndAnswer] = useState([])

    useEffect(() => {

        axios.get('questionsAndAnswers.json', {
            headers: {}
        }).then(resp => {
            if (resp.status === 200) {
                localStorage.setItem('questionsAndAnswers', JSON.stringify(resp.data));
                setQuestionsAndAnswer(resp.data)
            }
        }).catch(e => {
            console.log(e.message);
        })

    }, [])

    return (
        questionsAndAnswer.length === 0 ? '' :
            <div id="questionsAnswers-wrapper">
                <div id="inner-questionsAnswers-wrapper">
                    <div id="logo-wrapper"><img src={logo} alt=""/></div>
                    <Question question={questionsAndAnswer.question}/>
                    <Answers answers={questionsAndAnswer.answers}/>
                </div>
            </div>
    )
}

