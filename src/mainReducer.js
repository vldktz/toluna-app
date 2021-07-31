/**
 * main reducer function for the redux store
 * @param state
 * @param action
 * @return {{question: {}, answers: []}|*}
 */
export const mainReducer = (state = {question: {}, answers: []}, action) => {
    switch (action.type) {
        /**
         * set the questions and answers that received from external json file
         */
        case 'SET_QUESTION_ANSWERS': {
            return saveStateToLocalStorage( {...action.payload});
        }
        /**
         * save the edited question (only text)
         */
        case 'EDIT_QUESTION': {
            return saveStateToLocalStorage({...state, question: action.payload});
        }
        /**
         * add new answer to the answers array
         */
        case 'NEW_ANSWER': {
            let answers = state.answers;
            answers.push(action.payload);
            return saveStateToLocalStorage({...state, answers});
        }
        /**
         * save the edited answer (text and imageURL)
         */
        case 'EDIT_ANSWER': {
            let index = state.answers.findIndex(answer => answer.id === action.payload.id);
            if (index !== -1)
                state.answers[index] = action.payload;
            return saveStateToLocalStorage({...state});
        }
        /**
         * delete the answer from the answers array
         */
        case 'DELETE_ANSWER': {
            state.answers = state.answers.filter(answer => answer.id !== action.payload.id);
            return saveStateToLocalStorage({...state});
        }
        /**
         * default handlers
         */
        default:
            return {...state};
    }
}

/**
 * save the state to the local storage
 * @param state
 * @return {*}
 */
const saveStateToLocalStorage = (state) => {
    localStorage.setItem('questionsAndAnswers', JSON.stringify(state));
    return state;
}
