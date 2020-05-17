import React from 'react';
import './App.css';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const initialContacts = [{ name: 'John Doe', email: 'john@doe.com' }];

function App({ isSubmitting, errors, status }) {
  const [contacts, setContacts] = React.useState(initialContacts);
  React.useEffect(() => {
    status && setContacts(contacts => [...contacts, status]);
  }, [status]);

  return (
    <div className='App'>
      <h1>Contacts</h1>
      <Form>
        <Input name='name' placeholder='John Doe' labelText='Name' />
        <Input
          name='email'
          placeholder='email@gmail.com'
          labelText='Email'
          type='email'
        />
        <button
          type='submit'
          disabled={isSubmitting || Object.keys(errors).length}>
          Submit
        </button>
      </Form>
      <Contacts contacts={contacts} />
    </div>
  );
}

const Input = ({ name, placeholder, labelText, type }) => (
  <>
    <label htmlFor={name} aria-labelledby={name}>
      {labelText}
      <Field type={type || 'text'} name={name} placeholder={placeholder} />
    </label>
    <ErrorMessage name={name}>
      {err => <div className='error'>{err}</div>}
    </ErrorMessage>
  </>
);

const Contacts = ({ contacts }) =>
  contacts.map(({ name, email }, idx) => (
    <div key={idx}>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  ));

const formikOptions = {
  mapPropsToValues() {
    return {
      name: '',
      email: ''
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, 'Names must be between 2 and 20 characters.')
      .max(20, 'Names must be between 2 and 20 characters.')
      .required('Name is required.'),
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required.')
  }),
  handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
    setStatus(values);
    resetForm();
    setSubmitting(false);
  }
};

export default withFormik(formikOptions)(App);