import React from "react";
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {FormControl, FormGroup,Button} from 'react-bootstrap';

const jobtypes = [ 'USD', 'GBP', 'EUR' ];
const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

// validator function pass the user input value and should return true|false.
function jobNameValidator(value) {
  const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
  if (!value) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must be inserted';
    response.notification.title = 'Requested Value';
  } else if (value.length < 10) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must have 10+ characters';
    response.notification.title = 'Invalid Value';
  }
  return response;
}

function jobStatusValidator(value) {
  const nan = isNaN(parseInt(value, 10));
  if (nan) {
    return 'Job Status must be a integer!';
  }
  return true;
}

class Payment extends React.Component {

  invalidJobStatus = (cell, row) => {
    console.log(`${cell} at row id: ${row.id} fails on editing`);
    return 'invalid-jobstatus-class';
  }

  editingJobStatus = (cell, row) => {
    console.log(`${cell} at row id: ${row.id} in current editing`);
    return 'editing-jobstatus-class';
  }

  render() {

  var jobs = [{
             id: 123,
             name: "CHEQUE",
             price: 14589

         },{
             id: 345,
             name: "CASH",
             price: 14758

         },{
                  id: 698,
                  name: "EFTPOS",
                  price: 96587


              },{
                       id: 789,
                       name: "MOTOR PASS",
                       price: 78456


                   },{
                            id: 741,
                            name: "MOTOR CHARGE",
                            price: 25410

                        },{
                                 id: 145,
                                 name: "FLEET CARD",
                                 price: 50000

                             },
                             {
                                id: 145,
                                 name: "AMERICAN EXPRESS",
                                 price: 50000

                                  }];


    return (
 <div>
 <div className="row">
    <div className="row col-md-6">
     <FormControl
         disabled
         type="text"
         placeholder="Enter text"
         onChange={this.handleChange}
       />
       </div>
           <div className="col-xl-offset-16">
                      <div class="text-right">
              <Button bsStyle="success">Submit</Button>
              </div>
              </div>
              </div>
              <br></br>
              <br></br>

      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ false  }>
          <TableHeaderColumn dataField='id' isKey={ true }>Job ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' editable={false }>MEDIA TENDERS</TableHeaderColumn>
           <TableHeaderColumn dataField='type' editable={ { type: 'select', options: { values: jobtypes } } }>MEDIA COLLECTS</TableHeaderColumn>
           <TableHeaderColumn dataField='price' editable={true }>SETTLEMENT AMOUNT</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}



export default Payment;