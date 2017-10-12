import React from "react";
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


const queryString = require('query-string');
var ids="";
var url="";
var cname="";
var invoice_number="";
var invoice_date="";
var cuid="";
var total_amount="";
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


axios.post('http://13.126.189.91:3001/media/e3152784-4811-4f2e-9a4f-884f3439db90/customerPayments',{DepositTo:"Account",PaymentMethod:type,Account:{UID:"ff5fccac-6897-425e-87fd-dbb474c542f4"},Customer:{UID:cuid},Invoices:[{UID:ids,AmountApplied:k,Type:"Invoice"}]})
  .then(function (response) {
    console.log(response);
    if(x==k)
    {
         window.location.assign('/');

    }
    else{
     window.location.assign('/payment?id='+ids);
     }
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
  url= "http://13.126.189.91:3001/sales/e3152784-4811-4f2e-9a4f-884f3439db90/invoices/"+ids;
  console.log(ids);
       this.state = {
         posts: [],
         cusname:"",
         innumber:"",
         indate:"",
         bamount:"",
         tamount:"",
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
		this.setState ( { loaded: false});

         axios.all([
                 axios.get(url),
                 axios.get('http://13.126.189.91:3001/sales/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/')
                 ]).then(axios.spread((invoice,dependencies) =>{
var data=invoice.data;
cname=data.Customer.Name;
console.log(cname);
invoice_number=data.Number;
invoice_date=data.Date;
total_amount=data.TotalAmount;
balance_amount=data.BalanceDueAmount;
this.setState({cusname:cname});
this.setState({innumber:invoice_number});
this.setState({indate:invoice_date});
this.setState({tamount:total_amount});
this.setState({bamount:balance_amount});
cuid=data.Customer.UID;
console.log(cuid);
 this.setState  ({ loaded: true});




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
	          <Loader loaded={this.state.loaded}>

 <div className="container">
 <div className="row">
    <div className="row col-md-10">
<label for="note">Sales Details:</label>
   <textarea id="note" className="form-control" style={{"height":"120px"} } value={"Customer Name:"+this.state.cusname+"\nInvoice Number:"+this.state.innumber+"\nInvoice Date:"+this.state.indate+"\nTotal Sales:"+this.state.tamount  +"\nBalance Amount:"+this.state.bamount} /><br></br>

       </div>

              </div>
              <br></br>
              <br></br>
<div className="form-inline">
     <div className="row col-md-4">
     <label for="paymentdetails">Payment Methods:</label>
          <select name="cars" id="paymentdetails" className="form-control">{this.state.payment} </select>
     </div>
     <div className="col-md-4">
    <input type="number" className="form-control"  id="Amount"   placeholder="Enter Sales"/>
     </div>
     <div className="col-md-4">
                                               <div className="text-right">
                                       <Button bsStyle="success" onClick={handleClick}>Submit</Button>
                                       </div>
                                       </div>
</div>

<BootstrapTable data={ this.state.account } >

                <TableHeaderColumn width="30%" dataField='Description' isKey={true}  editable={{ type: 'select', options: {values: this.state.salesheads } } }  >Payment Method</TableHeaderColumn>
               <TableHeaderColumn width="30%"  dataField='Account'  editable={ { type: 'select', options: {values: this.state.acco} } } >Date of Payment</TableHeaderColumn>
                <TableHeaderColumn width="30%" dataField='Total' editable={true } dataAlign="Center" >Amount Applied</TableHeaderColumn>
           </BootstrapTable>
      </div>
</Loader>
	  );
  }
}



export default Payment;