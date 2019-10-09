import React from 'react';
import { Button } from 'reactstrap';
import { isBefore } from 'date-fns';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

function CreatePortfolioForm(props){

  const INITIAL_VALUES = {
    title: '',
    company: '',
    location: '',
    position: '',
    description: '', //TextArea
    startDate: '', //Date
    endDate: '' //Date
  }

  const validateInputs = (values) => {
    let errors = {};
    const before = isBefore(values.endDate, values.startDate);
    Object.keys(values).forEach((input) => {

      if(!values[input]){
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

  const { savePortfolio } = props;
  
  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        validate={validateInputs}
        onSubmit={savePortfolio}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="text"
              name="title"
              label="Title"
              component={PortInput}
            />
            
            <Field
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
              component={PortDate}
            />

            <Field
              name="endDate"
              label="End Date"
              canBeDisabled={true}
              component={PortDate}
            />

            <Button color="success" size="lg" type="submit" disabled={isSubmitting}>
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

//import  React, { useState } from 'react';
//
// function CreatePortfolioForm () {
//   const initialState = {
//     title: '',
//     description: 'Write Some Description',
//     language: ''
//   }

//   const [data, setData] = useState(initialState)

//   const handleOnChange = (e) => {
//     console.log(`${[e.target.name]}: ${e.target.value}`)
//     setData({
//       ...data,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     window.alert(`Ostia ${data.title}, ${data.description}, ${data.language}`)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Title:
//           <input type="text" name="title" value={data.title} onChange={handleOnChange} />
//         </label>
//       </div>

//       <div>
//         <label>
//           Description:
//           <textarea value={data.description} name="description" onChange={handleOnChange} />
//         </label>
//       </div>
      
//       <div>
//         <label>
//           Language:
//           <select value={data.language} name="language" onChange={handleOnChange}>
//             <option value="Javascript">Javascript</option>
//             <option value="C++">C++</option>
//             <option value="Dart">Dart</option>
//             <option value="Java">Java</option>
//           </select>
//         </label>
//       </div>
//       <input type="submit" value="Submit" />
//     </form>
//   );
// }

export default CreatePortfolioForm;