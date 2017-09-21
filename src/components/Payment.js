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
//console.log(document.getElementById('Amount').value);
var k=parseInt(document.getElementById('Amount').value);
console.log(k);
var x=parseInt(balance_amount);
console.log(x);
if(k==x)
{
axios.post('http://localhost:3001/media/48b58bb2-e017-4368-87c4-1fe44c1334ca/customerPayments',{DepositTo:"Account",PaymentMethod:"Cash",Account:{UID:"65118071-6650-400f-98e4-f88a7761d929"},Customer:{UID:cuid},Invoices:[{UID:ids,AmountApplied:k,Type:"Invoice"}]})
  .then(function (response) {
    console.log(response);
     window.location.assign('/');
  })
  .catch(function (error) {
    console.log(error.response);
  });

  }
  else
  {
  alert("Entered Amount does not match with Invoice Amount");

  }





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
 <div className="container">
 <div className="row">
    <div className="row col-md-10">

   <textarea id="note" className="form-control" style={{"height":"100px"} } value={"Customer Name:"+this.state.cusname+"\nInvoice Number:"+this.state.innumber+"\nInvoice Date:"+this.state.indate+"\nBalance Amount:"+this.state.bamount} /><br></br>

       </div>

              </div>
              <br></br>
              <br></br>
<div className="form-inline">
     <div className="row col-md-4">
          <select name="cars" className="form-control">
             <option value="CASH">CASH</option>
             <option value="CHEQUE">CHEQUE</option>
             <option value="EFTPOS">EFTPOS</option>
             <option value="MOTOR PASS">MOTOR PASS</option>
             <option value="MOTOR CHARGE">MOTOR CHARGE</option>
             <option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
                      </select>
     </div>
     <div className="col-md-2">
    <input type="text" className="form-control" id="Amount"  onchange="check()" placeholder="Enter Amount"/>
     </div>
     <div className="col-md-6">
                                               <div class="text-right">
                                       <Button bsStyle="success" onClick={handleClick}>Submit</Button>
                                       </div>
                                       </div>
</div>
      </div>
    );
  }
}



export default Payment;