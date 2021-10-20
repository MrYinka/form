import React from "react";
import useInput from "../hooks/use-input";
import '../index.css';

const SimpleInput = (props) => {

    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameInputError,
        valueChangeHandler: nameChangeHandler,
        valueBlurHandler: nameInputBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');


    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailInputError,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));


    let formIsValid = false;

    if(nameIsValid && emailIsValid ){
        formIsValid = true;
    }


    const submitHandler = event => {

        event.preventDefault();

        if(!nameIsValid){
            return;
        }

        if(!emailIsValid){
            return;
        }

        console.log(enteredName);

        resetNameInput();
        resetEmailInput();
    };


    const nameInputClasses = nameInputError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputError ? 'form-control invalid' : 'form-control';


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

        <p>{ nameInputError && <p className="error-text">Name must not be empty</p>}</p>

        <div className={emailInputClasses}>
            <label htmlFor='email'>Your Email</label>
            <input
                type='email'
                id='email'
                onChange={emailChangeHandler}
                onBlur={emailInputBlurHandler}
                value={enteredEmail}
            />
        </div>
        <p>{emailInputError && <p className="error-text">Enter a valid email</p>}</p>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
