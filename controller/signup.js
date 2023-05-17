import '../styles/signup.css';

// Sign in / sign up form
const signUpForm = document.getElementById('signup--form');
const signInForm = document.getElementById('signin--form');

// Sign in / sign up link
const changeToSignIn = document.getElementById('existingAccount');
const changeToSignUp = document.getElementById('newAccount');

// Sign in / sign up button
const signUpBtn = document.getElementById('signup-button');

// All fields and form
const form = document.querySelector('.form--unhidden')
const fields = ["firstname", "lastname", "email", "password", "password-confirmation"]

// Sign in clicked, change to sign in
changeToSignIn.addEventListener("click", (e) => {
  e.preventDefault();

  hide(signUpForm);
  show(signInForm);
});

// Sign up clicked, change to sign up
changeToSignUp.addEventListener("click", (e) => {
  e.preventDefault();

  hide(signInForm);
  show(signUpForm);
});


// Hide function to hide specific form
const hide = (element) => {
  element.classList.add('form--hidden');
  element.classList.remove('form--unhidden');
}

// Show function to show specific form
const show = (element) => {
  element.classList.add('form--unhidden');
  element.classList.remove('form--hidden');
}

// Initialize function for sign up
signUpBtn.addEventListener("click", (e) => {
  validateOnEntry();
  validateOnSubmit();
})



const validateOnSubmit = () => {
  let self = this;
  this.form = form;
  this.fields = fields;

  this.form.addEventListener("submit", (e) => {
    e.preventDefault()
    self.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)
      self.validateFields(input)
    })
  })
}


const validateOnEntry = () => {
  let self = this

  this.fields.forEach(field => {
    const input = document.querySelector(`#${field}`)

    input.addEventListener('input', () => {
      self.validateFields(input)
    })
  })
}


const validateFields = (field) => {
  this.fields = field;

  // Check presence of values
  if (field.value.trim() === "") {
    this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error")
  } else {
    this.setStatus(field, null, "success")
  }

  // check for a valid email address
  if (field.type === "email") {
    const re = /\S+@\S+\.\S+/
    if (re.test(field.value)) {
      this.setStatus(field, null, "success")
    } else {
      this.setStatus(field, "Please enter valid email address", "error")
    }
  }

  // Password confirmation edge case
  if (field.id === "password_confirmation") {
    const passwordField = this.form.querySelector('#password')

    if (field.value.trim() == "") {
      this.setStatus(field, "Password confirmation required", "error")
    } else if (field.value != passwordField.value) {
      this.setStatus(field, "Password does not match", "error")
    } else {
      this.setStatus(field, null, "success")
    }
  }
}

const setStatus = (field, message, status) => {
  const successIcon = field.parentElement.querySelector('.icon-success')
  const errorIcon = field.parentElement.querySelector('.icon-error')
  const errorMessage = field.parentElement.querySelector('.error-message')

  if (status === "success") {
    if (errorIcon) { errorIcon.classList.add('hidden') }
    if (errorMessage) { errorMessage.innerText = "" }
    successIcon.classList.remove('hidden')
    field.classList.remove('input-error')
  }

  if (status === "error") {
    if (successIcon) { successIcon.classList.add('hidden') }
    field.parentElement.querySelector('.error-message').innerText = message
    errorIcon.classList.remove('hidden')
    field.classList.add('input-error')
  }
}


validator.initialize()


/*class FormValidator {



  constructor(form, fields) {
    this.form = form
    this.fields = fields
  }

  initialize() {
    this.validateOnEntry()
    this.validateOnSubmit()
  }

  validateOnSubmit() {
    let self = this

    this.form.addEventListener('submit', e => {
      e.preventDefault()
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        self.validateFields(input)
      })
    })
  }

  validateOnEntry() {
    let self = this
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)

      input.addEventListener('input', event => {
        self.validateFields(input)
      })
    })
  }

  validateFields(field) {

    // Check presence of values
    if (field.value.trim() === "") {
      this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error")
    } else {
      this.setStatus(field, null, "success")
    }

    // check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, null, "success")
      } else {
        this.setStatus(field, "Please enter valid email address", "error")
      }
    }

    // Password confirmation edge case
    if (field.id === "password_confirmation") {
      const passwordField = this.form.querySelector('#password')

      if (field.value.trim() == "") {
        this.setStatus(field, "Password confirmation required", "error")
      } else if (field.value != passwordField.value) {
        this.setStatus(field, "Password does not match", "error")
      } else {
        this.setStatus(field, null, "success")
      }
    }
  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector('.icon-success')
    const errorIcon = field.parentElement.querySelector('.icon-error')
    const errorMessage = field.parentElement.querySelector('.error-message')

    if (status === "success") {
      if (errorIcon) { errorIcon.classList.add('hidden') }
      if (errorMessage) { errorMessage.innerText = "" }
      successIcon.classList.remove('hidden')
      field.classList.remove('input-error')
    }

    if (status === "error") {
      if (successIcon) { successIcon.classList.add('hidden') }
      field.parentElement.querySelector('.error-message').innerText = message
      errorIcon.classList.remove('hidden')
      field.classList.add('input-error')
    }
  }
}

const form = document.querySelector('.form--unhidden')
const fields = ["firstname", "lastname", "email", "password", "password_confirmation"]

const validator = new FormValidator(form, fields)
validator.initialize()*/