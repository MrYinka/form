import {useReducer} from "react";


const initialInputState = {
    value: '',
    isTouched: false
}


const inputStateReducerFn = (prevState, action) => {

    if(action.type === 'INPUT_VALUE'){
        return {
            value: action.payload,
            isTouched: prevState.isTouched
        };
    }

    if(action.type === 'IS_BLUR'){
        return {
            value: prevState.value,
            isTouched: true
        };
    }

    if(action.type === 'RESET'){
        return initialInputState;
    }


    return initialInputState;

}

const useInput = (validateValue) => {

    // const [enteredValue, setEnteredValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    const [inputState, inputStateDispatchFn] = useReducer(inputStateReducerFn, initialInputState);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched; //Empty and Touched


    const valueChangeHandler = event => {
        // setEnteredValue(event.target.value);
        inputStateDispatchFn({
            type: 'INPUT_VALUE',
            payload: event.target.value
        })
    }

    const valueBlurHandler = event => {
        inputStateDispatchFn({
            type: 'IS_BLUR',
        })
    };


    const reset = () => {
        inputStateDispatchFn({
            type: 'RESET',
        })
    };


    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        valueBlurHandler,
        reset
    }
};



export default useInput;