export const mainReducer = (state = {question: {}, answers: []}, action) => {
    switch (action.type) {
        case 'SET_QUESTION_ANSWERS': {
            return saveStateToLocalStorage( {...action.payload});
        }
        case 'EDIT_QUESTION': {
            return saveStateToLocalStorage({...state, question: action.payload});
        }
        case 'NEW_ANSWER': {
            let answers = state.answers;
            answers.push(action.payload);
            return saveStateToLocalStorage({...state, answers});
        }
        case 'EDIT_ANSWER': {
            let index = state.answers.findIndex(answer => answer.id === action.payload.id);
            if (index !== -1)
                state.answers[index] = action.payload;
            return saveStateToLocalStorage({...state});
        }
        case 'DELETE_ANSWER': {
            let index = state.answers.findIndex(answer => answer.id === action.payload.id);
            if (index !== -1)
                state.answers.splice(index, 1);
            return saveStateToLocalStorage({...state});
        }
        default:
            return {...state};
    }
}

const saveStateToLocalStorage = (state) => {
    localStorage.setItem('questionsAndAnswers', JSON.stringify(state));
    return state;
}
