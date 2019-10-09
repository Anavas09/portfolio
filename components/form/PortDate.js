import React, { Fragment, useState } from 'react';
import DatePicker from "react-datepicker";
import { Button, FormGroup, Label } from 'reactstrap';
 
import "react-datepicker/dist/react-datepicker.css";

function PortDate(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [isHidden, setIsHidden] = useState(false);

  const { canBeDisabled, field, form: { touched, errors }, label } = props;

  const setFieldValueAndTouched = (date, touched) => {
    const { setFieldValue, setFieldTouched } = props.form;
    const { name } = props.field;

    setFieldValue(name, date, true)
    setFieldTouched(name, touched, true)
  }

  const handleOnChange = (date) => {
    setStartDate(date);

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
  //                   selected={startDate}
  //                   onChange={date => handleOnChange(date)}
  //                   dropDownMode="select"
  //                   maxDate={startDate}
  //                   showMonthDropdown
  //                   showYearDropdown
  //                 />
  //   }else {
  //     datePicker = <DatePicker
  //                   selected={startDate}
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
                selected={startDate}
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
              onClick={() => toggleDate(startDate)}
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