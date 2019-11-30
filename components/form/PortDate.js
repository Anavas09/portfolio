import React, { Fragment, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { parseISO } from 'date-fns';
import { Button, FormGroup, Label } from 'reactstrap';
 
import "react-datepicker/dist/react-datepicker.css";

function PortDate(props) {
  const { actionType ,initialDate } = props;
  const propInitialDate = initialDate;
  const propActionType = actionType;

  const propDateValue = propInitialDate ? initialDate : new Date();
  const propIsHidden = propInitialDate ? false : true;

  const [isHidden, setIsHidden] = useState(propIsHidden);

  //const initialDatex = format(initialDate, 'MM/dd/yyyy')

  const [dateValue, setDateValue] = useState(propDateValue);

  useEffect(() => {
    if (initialDate && propActionType === 'Update') {
      setDateValue(parseISO(initialDate))
      setIsHidden(propIsHidden)
    }else{
      if(initialDate && propActionType === 'Create'){
        setDateValue(initialDate)
        setIsHidden(propIsHidden)
      }
    }
  }, [initialDate, propActionType]);

  const { canBeDisabled, field, form: { touched, errors }, label } = props;

  const setFieldValueAndTouched = (date, touched) => {
    const { setFieldValue, setFieldTouched } = props.form;
    const { name } = props.field;

    setFieldValue(name, date, true)
    setFieldTouched(name, touched, true)
  }

  const handleOnChange = (date) => {
    setDateValue(date);

    setFieldValueAndTouched(date, true)
  }

  const toggleDate = (date) => {
    setIsHidden(!isHidden)

    setFieldValueAndTouched(date, true)
  }

  // const renderLabel = () => {
  //   let datePicker;
  //   if (label === "Start Date"){
  //     datePicker = <DatePicker
  //                   selected={dateValue}
  //                   onChange={date => handleOnChange(date)}
  //                   dropDownMode="select"
  //                   maxDate={dateValue}
  //                   showMonthDropdown
  //                   showYearDropdown
  //                 />
  //   }else {
  //     datePicker = <DatePicker
  //                   selected={dateValue}
  //                   onChange={date => handleOnChange(date)}
  //                   dropDownMode="select"
  //                   showMonthDropdown
  //                   showYearDropdown
  //                 />
  //   }
  //   return datePicker
  // }

  return (
    <FormGroup>
      <Label>{label}</Label>
        <div className="input-group">
          {!isHidden &&
              <DatePicker
                selected={dateValue}
                onChange={date => handleOnChange(date)}
                dropDownMode="select"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
              />
          }
        </div>
        {canBeDisabled && !isHidden &&
          <Button
            onClick={() => toggleDate()}
            >Still Working Here
          </Button>
        }

        {canBeDisabled && isHidden &&
          <Fragment>
            <span>Still Working Here</span>
            <Button
              onClick={() => toggleDate(dateValue)}
              >Set End Date
            </Button>
          </Fragment>
        }

        {touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </FormGroup>
  );
};

export default PortDate;