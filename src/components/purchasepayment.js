import React from "react";
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


const queryString = require('query-string');
var ids="";
var nameid="";
var url="";
var cname="";
var invoice_number="";
var invoice_date="";
var cuid="";
var total_amount="";
var balance_amount="";
var SI="";


function handleClick(e){
e.preventDefault();
//console.log(document.getElementById('Amount').value);
var k=document.getElementById('Amount').value;
console.log("yes"+k);
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


axios.post('http://35.154.129.58:4000/purchase/payment/e3152784-4811-4f2e-9a4f-884f3439db90/supplierPayments',{PayFrom:"Account",Account:{UID:"ff5fccac-6897-425e-87fd-dbb474c542f4"},Supplier:{UID:cuid},Lines:[{Type:"order",Purchase:{UID:ids},AmountApplied:k}]})
  .then(function (response) {
    console.log(response);
    if(x==k)
    {
         window.location.assign('/purchase');

    }
    else{
     window.location.assign('/Purchasepayment?id='+ids+'&&name='+nameid);
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
   nameid=parsed.name;
  console.log("second "+nameid);
  url= "http://35.154.129.58:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order/"+ids;
  console.log(ids);
       this.state = {
         posts: [],
         cusname:"",
         innumber:"",
         indate:"",
         bamount:"",
         tamount:"",
         si:"",
         payment:[],
         hist:[]

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
                 axios.get('http://35.154.129.58:4000/purchase/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/'),
                 axios.get('http://35.154.129.58:4000/purchase/payment/e3152784-4811-4f2e-9a4f-884f3439db90/supplierPayments/'+nameid+'/'+ids)
                 ]).then(axios.spread((invoice,dependencies,history) =>{
var data=invoice.data;
var data1=history.data.history;
cname=data.Supplier.Name;
console.log(cname);
invoice_number=data.Number;
SI=invoice.data.SupplierInvoiceNumber;
console.log("am sup id"+SI);
invoice_date=data.Date;
total_amount=data.TotalAmount;
balance_amount=data.BalanceDueAmount;
this.setState({cusname:cname});
this.setState({innumber:invoice_number});
this.setState({indate:invoice_date});
this.setState({si:SI});
this.setState({tamount:total_amount});
this.setState({bamount:balance_amount});
this.setState({hist:data1});
cuid=data.Supplier.UID;
console.log(cuid);
 this.setState  ({ loaded: true});
        //  const posts = res.data.Items;

          // this.setState({posts});
    //console.log("checcd "+JSON.stringify(this.state.posts));
         }));
     }

  render() {


const options = {

         defaultSortName: 'Date',  // default sort column name
              defaultSortOrder: 'desc'  // default sort order
      };


    return (
	          <Loader loaded={this.state.loaded}>

 <div className="container">
 <div className="row">
    <div className="row col-md-10">
<label for="note">Sales Details:</label>
   <textarea id="note" className="form-control" style={{"height":"140px"} } value={"Supplier Name:"+this.state.cusname+"\nInvoice Number:"+this.state.innumber+"\nSupplierInvoiceNumber:"+this.state.si+"\nInvoice Date:"+this.state.indate+"\nTotal Sales:"+this.state.tamount  +"\nBalance Amount:"+this.state.bamount} /><br></br>

       </div>

              </div>
              <br></br>
              <br></br>
<div className="form-inline">
     <div className="col-md-4" style={{'padding-top':'20'}}>
    <input type="number" className="form-control"  id="Amount"   placeholder="Enter Sales" />
     </div>
     <div className="col-md-3" style={{'padding-top':'30'}}>
                                               <div className="text-right">
                                       <Button bsStyle="success" onClick={handleClick}>Submit</Button>
                                       </div>
                                       </div>
</div>
<br></br>
<br></br>
<BootstrapTable data={ this.state.hist } >

                <TableHeaderColumn width="30%" dataField='Number' isKey={true}   >Payment Method</TableHeaderColumn>
               <TableHeaderColumn width="30%"  dataField='Date'   >Date of Payment</TableHeaderColumn>
                <TableHeaderColumn width="30%" dataField='Amount' editable={true } dataAlign="Center" >Amount Applied</TableHeaderColumn>
           </BootstrapTable>


      </div>
</Loader>
	  );
  }
}



export default Payment;