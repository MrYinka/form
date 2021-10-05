import React, { useState, useEffect } from "react";
import useInput from "../hooks/use-input";
import '../index.css';

const SimpleInput = (props) => {

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: invalidName,
        valueChangeHandler: nameChangeHandler,
        valueBlurHandler: nameInputBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');


    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);


    //Check for Entered Email
    const enteredEmailIsValid = enteredEmail.trim().includes('@');
    const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

    let formIsValid = false;

    if(enteredNameIsValid && enteredEmailIsValid){
        formIsValid = true;
    }



    const emailInputChangeHandler = event => {
        setEnteredEmail(event.target.value);
    }

    const emailInputBlurHandler = event => {
        setEnteredEmailTouched(true);
    }

    const submitHandler = event => {
        event.preventDefault();

        setEnteredEmailTouched(true);

        if(!enteredNameIsValid){
            return;
        }

        if(!enteredEmailIsValid){
            return;
        }

        console.log(enteredName);

        resetNameInput();

        setEnteredEmail('');
        setEnteredEmailTouched(false);
    };


    const nameInputClasses = invalidName ? 'form-control invalid' : 'form-control';
    const emailInputClasses = enteredEmailIsInvalid ? 'form-control invalid' : 'form-control';


  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
            type='text'
            id='name'
            onChange={nameChangeHandler}
            onBlur={nameInputBlurHandler}
            value={enteredName}
        />
      </div>
        <p>{invalidName && <p className="error-text">Name must not be empty</p>}</p>

        <div className={emailInputClasses}>
            <label htmlFor='email'>Your Email</label>
            <input
                type='email'
                id='email'
                onChange={emailInputChangeHandler}
                onBlur={emailInputBlurHandler}
                value={enteredEmail}
            />
        </div>
        <p>{enteredEmailIsInvalid && <p className="error-text">Enter a valid email</p>}</p>
      <div className="form-actions">
        <button disable={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
