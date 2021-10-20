import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== '';
const emailIsNotEmpty = value => value.includes('@');

const BasicForm = (props) => {

    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        valueChangeHandler: firstNameChangeHandler,
        valueBlurHandler: firstNameBlurHandler,
        reset: resetFirstName,
        hasError: firstNameError
    } = useInput(isNotEmpty);

    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        valueChangeHandler: lastNameChangeHandler,
        valueBlurHandler: lastNameBlurHandler,
        reset: resetLastName,
        hasError: lastNameError
    } = useInput(isNotEmpty);

    const {
        value: emailValue,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandler,
        reset: resetEmail,
        hasError: emailError
    } = useInput(emailIsNotEmpty);

    let formIsValid = false;

    if(firstNameIsValid && lastNameIsValid && emailIsValid){
        formIsValid = true;
    }

    const submitHandler = event => {
        event.preventDefault();

        if(!formIsValid){
            return;
        }

        console.log('Submitted.....');
        console.log(firstNameValue, lastNameValue, emailValue);

        resetFirstName();
        resetLastName();
        resetEmail();
    };

    const firstNameClasses = firstNameError ? 'form-control invalid' : 'form-control';
    const lastNameClasses = lastNameError ? 'form-control invalid' : 'form-control';
    const emailClasses = emailError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>

        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input
              type='text'
              id='name'
              value={firstNameValue}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
          />
            {firstNameError && <p className="error-text">Please enter a first name</p>}
        </div>

        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
              type='text'
              id='name'
              value={lastNameValue}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
          />
            {lastNameError && <p className="error-text">Please enter a last name</p>}
        </div>
        
      </div>

      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
            type='text'
            id='name'
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
        />
          {emailError && <p className="error-text">Please enter a valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
