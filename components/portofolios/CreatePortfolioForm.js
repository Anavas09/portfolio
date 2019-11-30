import React, { useEffect } from 'react';
import { Alert, Button } from 'reactstrap';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '', //TextArea
  startDate: '', //Date
  endDate: '' //Date
}

function CreatePortfolioForm({ action, error, handleSubmit, initialValues }){

  let initialValuesN = INITIAL_VALUES;

  useEffect(() => {
    if (initialValues) {
      if (initialValues.title){
        initialValuesN.title = initialValues.title
        initialValuesN.company = initialValues.company
        initialValuesN.location = initialValues.location
        initialValuesN.position = initialValues.position
        initialValuesN.description = initialValues.description
        //initialValuesN = initialValues
      }
    }
  }, [initialValues]);

  const sD = () => {
    if (initialValues){
      if (initialValues.startDate){
        return initialValues.startDate
      }else {
        return null;
      }
    }else{
      return
    }
  }

  const eD = () => {
    if (initialValues){
      if (initialValues.endDate){
        return initialValues.endDate
      }else {
        return null;
      }
    }else{
      return
    }
  }

  const actionType = (action) => {
    return action;
  }

  const validateInputs = (values) => {
    let errors = {};
    const before = isBefore(values.endDate, values.startDate);

    Object.keys(values).forEach((input) => {

      if(!values[input] && input !== 'endDate'){
        errors[input] = `Field ${input} is required!`;
      }

      const startDate = values.startDate;
      const endDate = values.endDate;

      if(startDate && endDate && before){
        errors.endDate = 'End Date cannot be before Start Date';
      }
    })

    return errors;
  }
  
  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={initialValuesN}
        validate={validateInputs}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              id="titleId"
              type="text"
              name="title"
              label="Title"
              component={PortInput}
            />
            
            <Field
              id="textId"
              type="text"
              name="company"
              label="Company"
              component={PortInput}
            />
            
            <Field
              type="text"
              name="location"
              label="Location"
              component={PortInput}
            />

            <Field
              type="text"
              name="position"
              label="Position"
              component={PortInput}
            />

            <Field
              type="textarea"
              name="description"
              label="Description"
              component={PortInput}
            />

            <Field
              name="startDate"
              label="Start Date"
              initialDate={sD()}
              actionType={actionType(action)}
              component={PortDate}
            />

            <Field
              name="endDate"
              label="End Date"
              initialDate={eD()}
              actionType={actionType(action)}
              canBeDisabled={true}
              component={PortDate}
            />
            
            { error && 
              (
                <Alert color="danger">
                  {error}
                </Alert>
              )
            }

            <Button color="success" size="lg" type="submit" disabled={isSubmitting}>
              {action}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default CreatePortfolioForm;