import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import './input.css';
import * as Yup from 'yup';

function Input() {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (values, { setSubmitting,resetForm }) => {
    console.log(values);
    try {
      const response = await fetch(
        'https://jn95vlruh0.execute-api.eu-west-1.amazonaws.com/prod/form',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: JSON.stringify({ id: values.email, ...values }),
          }), // Stringify the body
        }
      );

      if (response.ok) {
        setSubmissionStatus('success');
        resetForm();
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('error');
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <Form className="input-form">
          {/* Email Input */}
          <p>Sign up to hear about our upcoming experimental sessions!</p>
          <div>
            <label htmlFor="email">﹫📩:</label>
            <Field type="email" id="email" name="email" />

            {/* Submit Button */}
            <button
              className="input-button"
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              Sign up
            </button>
          </div>
          <ErrorMessage className="error-message" name="email" component="li" />
          {submissionStatus === 'success' && (
            <li className="Info">Email submitted successfully!</li>
          )}
          {submissionStatus === 'error' && (
            <li className="Info">Error submitting. Please try again later.</li>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default Input;