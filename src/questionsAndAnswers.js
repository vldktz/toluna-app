import axios from "axios";
import './css/QuestionsAndAnswers.css';
import logo from './assets/images/Toluna-Logo.png';
import {Question} from "./question"
import {Answers} from "./answers";


import {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";

const QuestionsAndAnswers = () => {
    const dispatch = useDispatch();
    const questionsAndAnswer = useSelector(state => state);

    useEffect(() => {
        axios.get('questionsAndAnswers.json', {
            headers: {}
        }).then(resp => {
            if (resp.status === 200) {
                //must have some unique id for all the ops in the app
                resp.data.answers.forEach((item,index) => item.id = index);
                dispatch({type: 'SET_QUESTION_ANSWERS', payload: resp.data})
            }
        }).catch(e => {
            console.log(e.message);
        })

    }, [])

    return (
        Object.keys(questionsAndAnswer)?.length === 0 ? '' :
            <div id="questionsAnswers-wrapper">
                <div id="inner-questionsAnswers-wrapper">
                    <div id="logo-wrapper"><img src={logo} alt=""/></div>
                    <Question question={questionsAndAnswer?.question}/>
                    <Answers answers={questionsAndAnswer?.answers}/>
                </div>
            </div>
    )
}
 export default connect()(QuestionsAndAnswers);
