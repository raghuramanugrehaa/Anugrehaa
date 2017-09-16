import React from "react";
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {FormControl, FormGroup,Button} from 'react-bootstrap';
import axios from "axios";
const queryString = require('query-string');
var ids="";
var url="";
var cname="";
var invoice_number="";
var invoice_date="";
var cuid="";
var balance_amount="";
var account_name="";
var pay=0;
const jobtypes = [ 'ATM', 'CASH', 'CHEQUE','CREDIT CARD','DIRECT DEPOSIT','EFTPOS','OTHER' ];
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

function handleClick(e){
e.preventDefault();
console.log(pay);

axios.post('http://localhost:3001/media/48b58bb2-e017-4368-87c4-1fe44c1334ca/customerPayments',{DepositTo:"Account",PaymentMethod:"Cash",Account:{UID:"65118071-6650-400f-98e4-f88a7761d929"},Customer:{UID:cuid},Invoices:[{UID:ids,AmountApplied:pay,Type:"Invoice"}]})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error.response);
  });




}

function onAfterSaveCell(row,cellName,cellValue){
 pay+=parseInt(row.price);

}


class Payment extends React.Component {

    constructor(props) {
       super(props);
       const parsed = queryString.parse(this.props.location.search);

  ids=parsed.id;
  url= "http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices/"+ids;
  console.log(ids);
       this.state = {
         posts: [],
         cusname:"",
         innumber:"",
         indate:"",
         bamount:"",

       };
    }

    componentDidMount() {

         axios.get(url
       ).then(res => {
var data=res.data;
cname=data.Customer.Name;
console.log(cname);
invoice_number=data.Number;
invoice_date=data.Date;
balance_amount=data.BalanceDueAmount;
this.setState({cusname:cname});
this.setState({innumber:invoice_number});
this.setState({indate:invoice_date});
this.setState({bamount:balance_amount});
cuid=data.Customer.UID;
console.log(cuid);

         //  const posts = res.data.Items;

          // this.setState({posts});
    //console.log("checcd "+JSON.stringify(this.state.posts));
         });
     }

  render() {

  var jobs = [{
             name: "CHEQUE",
             price: 0
             },{
             name: "CASH",
             price: 0
            },{
            name: "EFTPOS",
            price: 0
            },{
            name: "MOTOR PASS",
            price: 0
            },{
            name: "MOTOR CHARGE",
            price: 0
            },{
            name: "FLEET CARD",
            price: 0
            },{
            name: "AMERICAN EXPRESS",
            price: 0
            }];


    return (
 <div>
 <div className="row">
    <div className="row col-md-offset-6 col-md-8">
     <p>                     in     <b>Customer Name:</b> {this.state.cusname}<br /><b>Invoice Number:</b>{this.state.innumber}</p><br></br>

   <p>                     in     <b>Invoice Date:</b> {this.state.indate}</p>
     <p>                     in     <b>Balance Amount:</b> {this.state.bamount}</p>

       </div>
           <div className="col-xl-offset-16">
                      <div class="text-right">
              <Button bsStyle="success" onClick={handleClick}>Submit</Button>
              </div>
              </div>
              </div>
              <br></br>
              <br></br>

      <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ false  }>
          <TableHeaderColumn dataField='name' isKey={true} editable={false }>MEDIA TENDERS</TableHeaderColumn>
           <TableHeaderColumn dataField='type' editable={ { type: 'select', options: { values: jobtypes } } }>MEDIA COLLECTS</TableHeaderColumn>
           <TableHeaderColumn dataField='price' editable={true }>SETTLEMENT AMOUNT</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}



export default Payment;