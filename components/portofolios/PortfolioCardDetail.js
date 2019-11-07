import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { format } from 'date-fns';

function PortfolioCardDetail(props) {
  const {
    openModal,
    portfolio,
    toggle
  } = props;

  const { company, description, endDate, location, position, startDate, title } = portfolio;

  return (
    <div>
      <Modal isOpen={openModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <p><b>Description: </b> {description} </p>
          <p><b>Company: </b> {company} </p>
          <p><b>Position: </b> {position} </p>
          <p><b>Location: </b> {location} </p>
          <p><b>Start Date: </b> {format(new Date(startDate), "MMMM yyyy")} </p>
          <p><b>End Date: </b> {endDate ? new Date(endDate).toLocaleDateString('en-US') : 'Still Working Here'} </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PortfolioCardDetail;