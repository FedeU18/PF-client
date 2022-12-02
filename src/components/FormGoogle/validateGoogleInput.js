export const validateGoogleInput = (inputName, text, setErrors, errors) => {
  if (inputName === "email") {
    const emailRegex = /^\w+([.-_+ñ]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (emailRegex.test(text)) {
      setErrors({ ...errors, emailErr: false });
    } else {
      setErrors({ ...errors, emailErr: true });
    }
  } else if (inputName === "name" || inputName === "lastname") {
    const expRegNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (expRegNombre.test(text)) {
      setErrors({ ...errors, [`${inputName}Err`]: false });
    } else {
      setErrors({ ...errors, [`${inputName}Err`]: true });
    }
  } else if (inputName === "password") {
    const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,20}$/;

    if (passwordRegex.test(text)) {
      setErrors({ ...errors, passwordErr: false });
    } else {
      setErrors({ ...errors, passwordErr: true });
    }
  } else if (inputName === "age") {
    const isNumber$ = parseInt(text);
    let data = !isNaN(isNumber$);

    if (typeof isNumber$ === "number" && data) {
      if (isNumber$ && isNumber$ < 100) {
        setErrors({ ...errors, ageErr: false });
      } else {
        setErrors({ ...errors, ageErr: true });
      }
    } else {
      setErrors({ ...errors, ageErr: true });
    }
  } else if (inputName === "username") {
    const validateUser = /^[a-zA-Z0-9_-]+$/;

    if (validateUser.test(text)) {
      setErrors({ ...errors, usernameErr: false });
    } else {
      setErrors({ ...errors, usernameErr: true });
    }
  }
};
