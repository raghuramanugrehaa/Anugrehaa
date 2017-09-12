import React from "react";
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
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

class Sale extends React.Component {

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
             name: "ACCOUNT RECV",
             price: 14589
         },{
             id: 345,
             name: "ACCOUNT SALES",
             price: 14758
         },{
                  id: 698,
                  name: "SHOP SALES (INCL GST)",
                  price: 96587
              },{
                       id: 789,
                       name: "FUEL SALE INC GST ",
                       price: 78456

                   },{
                            id: 741,
                            name: "LOTTO SALES ",
                            price: 25410
                        },{
                                 id: 145,
                                 name: "FUEL SALES IN LTS",
                                 price: 50000
                             },
                             {
                               id: 789,
                               name: "LIQUOR SALES",
                               price: 50000
                                 },
                            {
                              id: 785,
                            name: "SHOP SALES (EXCL GST)",
                            price: 50000

                            }];


    return (
<div>
<div className="row">

<div className="row col-md-4">
     <select name="cars" className="form-control">
                   <option value="volvo">Volvo</option>
                   <option value="saab">Saab</option>
                   <option value="fiat">Fiat</option>
                   <option value="audi">Audi</option>
                 </select>

                 </div>
<div>
<input className="form-control col-md-12" type="date"/>
</div>
                 <div className="row-col-md-16">
                                       <div class="text-right">
                               <Button bsStyle="success">Submit</Button>
                               </div>
                               </div>

                               </div>
                               <br></br>
                               <br></br>
<BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ false  }>
          <TableHeaderColumn dataField='id' isKey={ true }>Job ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' editable={false }>Sale Heads</TableHeaderColumn>
          <TableHeaderColumn dataField='type' editable={ { type: 'select', options: { values: jobtypes } } }>TAX Type</TableHeaderColumn>
           <TableHeaderColumn dataField='price' editable={true }>SALE AMOUNT</TableHeaderColumn>
      </BootstrapTable>
</div>
    );
  }
}



export default Sale;