import React from "react";
import {Button} from 'react-bootstrap';
import axios from "axios";
const queryString = require('query-string');
var ids="";
var url="";
var cname="";
var invoice_number="";
var invoice_date="";
var cuid="";
var balance_amount="";


function handleClick(e){
e.preventDefault();
//console.log(document.getElementById('Amount').value);
var k=document.getElementById('Amount').value;
console.log("yes"+k);

var type=document.getElementById('paymentdetails').value
console.log("Im type"+type);
var x=parseInt(balance_amount);
console.log(x);

if(k!="" && k!=0)
{
k=document.getElementById('Amount').value;
if(k>x)
{
alert("payment amount should not be more than Invoice due amount");
}
else
{


axios.post('http://localhost:3001/media/48b58bb2-e017-4368-87c4-1fe44c1334ca/customerPayments',{DepositTo:"Account",PaymentMethod:type,Account:{UID:"65118071-6650-400f-98e4-f88a7761d929"},Customer:{UID:cuid},Invoices:[{UID:ids,AmountApplied:k,Type:"Invoice"}]})
  .then(function (response) {
    console.log(response);
     window.location.assign('/payment?id='+ids);
  })
  .catch(function (error) {
    console.log(error.response);
  });

  }
  }

  else
  {
  alert("check the enterd amount");

  }





}





class Payment extends React.Component {

    constructor(props) {
       super(props);
       const parsed = queryString.parse(this.props.location.search);
this.onChange = this.onChange.bind(this)
  ids=parsed.id;
  url= "http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices/"+ids;
  console.log(ids);
       this.state = {
         posts: [],
         cusname:"",
         innumber:"",
         indate:"",
         bamount:"",
         payment:[]

       };
    }
  onChange(e){
      const re = /^[0-9\b]+$/;
      if (e.target.value == '' || re.test(e.target.value)) {
         this.setState({value: e.target.value})
      }
   }
    componentDidMount() {

         axios.all([
                 axios.get(url),
                 axios.get('http://localhost:3001/sales/dependencies/48b58bb2-e017-4368-87c4-1fe44c1334ca/')
                 ]).then(axios.spread((invoice,dependencies) =>{
var data=invoice.data;
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





    var arrTen = [];
    var result=dependencies.data.paymentmode;
     for (var k = 0; k < result.length; k++) {
            arrTen.push(<option key={result[k].Name} value={result[k].Name}> {result[k].Name} </option>);
        }
           //  const posts = res.data.Items;

           this.setState({payment: arrTen});


         //  const posts = res.data.Items;

          // this.setState({posts});
    //console.log("checcd "+JSON.stringify(this.state.posts));
         }));
     }

  render() {





    return (
 <div className="container">
 <div className="row">
    <div className="row col-md-10">
<label for="note">Sales Details:</label>
   <textarea id="note" className="form-control" style={{"height":"100px"} } value={"Customer Name:"+this.state.cusname+"\nInvoice Number:"+this.state.innumber+"\nInvoice Date:"+this.state.indate+"\nBalance Amount:"+this.state.bamount} /><br></br>

       </div>

              </div>
              <br></br>
              <br></br>
<div className="form-inline">
     <div className="row col-md-4">
     <label for="paymentdetails">Payment Methods:</label>
          <select name="cars" id="paymentdetails" className="form-control">
{this.state.payment}
                      </select>
     </div>
     <div className="col-md-2">
    <input type="number" className="form-control"  id="Amount"   placeholder="Enter Amount"/>
     </div>
     <div className="col-md-6">
                                               <div className="text-right">
                                       <Button bsStyle="success" onClick={handleClick}>Submit</Button>
                                       </div>
                                       </div>
</div>
      </div>
    );
  }
}



export default Payment;