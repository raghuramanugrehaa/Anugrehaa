import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';
import Modal from 'react-bootstrap-modal';

var sub_total=0;
var tax_total=0;
var url="";
var accrecv;
var money={};
var money_tax={};
var hashacct ={};
var hashitems={};
var myHash = {};
var checkHash = {};
var newhash={};
var taxhash={};
var hashtax={};
var row_count=0;
var Lines = {
    details: []
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

function onAfterSaveCell(row,cellName,cellValue){
//console.log("sixth senes"+JSON.stringify(taxhash))
if(row.Price!=="0")
{
//console.log("i got price "+row.Price)



if(typeof row.type !== "undefined") {
//console.log("i got the accou//nt")

//auto total call
var tr=parseInt(money[row.Desc]);
sub_total=sub_total-tr;
sub_total=parseInt(row.Price)+sub_total;
document.getElementById('sub_total').value=sub_total;
money[row.Desc]=row.Price;

//auto tax
var mt=parseInt(newhash[row.type1]);
tax_total=tax_total-parseInt(money_tax[row.Desc])
money_tax[row.Desc]=parseInt(row.Price)/mt;
tax_total=tax_total+parseInt(row.Price)/mt;
document.getElementById('tax_per').value=tax_total;
document.getElementById('Total').value=tax_total+sub_total;
   var taxname= taxhash[row.type1];
   var taxcodes=taxname;

   var account_uid=myHash[row.type];
  // console.log(taxcodes)
   var gvf=""+account_uid
if("ACCOUNT SALES"==row.Name)
{
accrecv={Description:row.Name,Total:-row.Price,Account:{UID:gvf},TaxCode:{UID:taxcodes}}
}
else
{
accrecv={Description:row.Name,Total:row.Price,Account:{UID:gvf},TaxCode:{UID:taxcodes}}
}

checkHash[row.Name]={}
checkHash[row.Name]=accrecv





}}

}
function onAfterInsertRow(row) {

var TUID=taxhash[row.type1];
money[row.Desc]=row.Price;
sub_total=parseInt(row.Price)+parseInt(sub_total);
document.getElementById('sub_total').value=sub_total;
var mt=parseInt(newhash[row.type1]);
tax_total=parseInt(row.Price)/mt+parseInt(tax_total);
money_tax[row.Desc]=parseInt(row.Price)/mt;
document.getElementById('tax_per').value=tax_total;
document.getElementById('Total').value=tax_total+sub_total;
var accountname= myHash[row.type];
var taxcode=TUID;
row_count++;
hashitems[row.Desc]={Description:row.Desc,Total:row.Price,Account:{UID:accountname},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Desc]));

}

function onAfterDeleteRow(rowKeys) {
var tr=parseInt(money[rowKeys]);
sub_total=sub_total-tr;
document.getElementById('sub_total').value=sub_total;
money[rowKeys]=0;
tax_total=tax_total-parseInt(money_tax[rowKeys])
money_tax[rowKeys]=0;
document.getElementById('tax_per').value=tax_total;
document.getElementById('Total').value=tax_total+sub_total;
  alert('The sale you are deleting is: ' + rowKeys);
delete hashitems[rowKeys];

row_count--;

}

const selectRowProp = {
  mode: 'checkbox'
};

class Newpurchase extends React.Component {



  constructor(props) {
     super(props);
     this.handleClick = this.handleClick.bind(this);
     url= "http://13.126.189.91:4000/purchase/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/";
     this.state = {
       posts: [],
       accounts: [],
       salesheads:[],
       txt:[],
       pots:[],
       fi:[],
       ship:[]


     };
  }


 handleClick(){
//e.preventDefault();
var date = document.getElementById("date").value;
var supplier=document.getElementById("supplier").value;
var supplierInvoiceNumber=document.getElementById("SupplierInvoiceNumber").value;

console.log(Object.keys(hashitems).length)

 if (date=="")
 {
 alert("select date");
 }



else{


//var data="{Date:"+date+",Customer:{UID:"+customer+"},"+accrecv+"}";

Object.keys(hashitems).forEach(function (key) {
    var value = hashitems[key]
    var ll=value

    console.log("jhg"+value)
    Lines.details.push(ll)

    // iteration code
})
var com=document.getElementById('comment').value;
var ship=document.getElementById('ship').value;
var fre_amount=document.getElementById('freight').value;
var fre_tax=document.getElementById("freight_code").value;
var del_status=document.getElementById('dev_status').value;
var paid=document.getElementById('paid_due').value;
var pm_date = document.getElementById("promise_date").value;
var tttax=parseInt(document.getElementById('tax_per').value);
this.setState ( { loaded: false});
var klk=Lines.details;
console.log("yes"+ supplier);
console.log("no"+date);
this.setState ( { loaded: true});
axios.post('http://13.126.189.91:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order',{Date:date,SupplierInvoiceNumber:supplierInvoiceNumber ,Supplier:{UID:supplier},IsTaxInclusive : true,Lines:klk,Freight:fre_amount,FreightTaxCode:{UID:fre_tax},TotalTax : tttax,Comment:com,ShippingMethod:ship,OrderDeliveryStatus:"Print",AppliedToDate:12,PromisedDate:pm_date})
  .then(function (response) {
  // console.log(response);
     window.location.assign('/purchase');

  })
  .catch(function (error) {
    console.log(error.response);
  });

}
}


  componentDidMount() {

  this.setState ( { loaded: false});
       axios.get(url
     ).then(res => {
		             this.setState  ({ loaded: true});
var arrTen = [];
var comment = [];
var shipping = [];
var taxc =[];
 //console.log("ji"+JSON.stringify(res.data));
var result=res.data.Suppliers;
 for (var k = 0; k < result.length; k++) {
        arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
    }

var result1=res.data.Comments;
console.log("checkk"+result1);
for (var l =0;l < result1.length;l++){
 comment.push(<option key={result1[l].name} value={result1[l].name}> {result1[l].name} </option>);
}

var result3=res.data.Shipping;
for(var l=0;l < result3.length;l++){
shipping.push(<option key={result3[l].name} value={result3[l].name}> {result3[l].name} </option>)
}
       //  const posts = res.data.Items;

       this.setState({posts: arrTen});
       this.setState({pots :comment});
       this.setState({ship:shipping});
//account detail fetching
var acc=res.data.Account
var tax=res.data.TaxCode
//console.log(JSON.stringify(acc))
var accnt=[];
var taxt=[];

for ( k = 0; k < acc.length; k++) {
        accnt.push(acc[k].Name);
        myHash[acc[k].Name]=acc[k].UID;
       // console.log("Tax hash"+JSON.stringify(acc[k].TaxCodeUID));

    }
    var fri=[];
for ( k = 0; k < tax.length; k++) {
        taxt.push(tax[k].Name);
        taxhash[tax[k].Name]=tax[k].UID;
        newhash[tax[k].Name]=tax[k].Rate;
 //taxc.push(<option key={result2[l].name} value={result1[l].name}> {result1[l].name} </option>);
        fri.push(<option key={tax[k].Name} value={tax[k].UID}>{tax[k].Name}</option>);
       // console.log("Tax hash"+JSON.stringify(acc[k].TaxCodeUID));

    }

this.setState({fi:fri})



//console.log("Tax hash"+taxhash);
this.setState({accounts:accnt})
this .setState({txt:taxt})
var acc1=res.data.salesheads
var heads=[];

for ( k = 0; k < acc1.length; k++) {
        heads.push(acc1[k]);

    }



this.setState({salesheads:heads})






//console.log("im hash table"+myHash)


                                     /* use key/value for intended purpose */



  });
 }

 createCustomInsertButton = (openModal) => {
     return (
      <button type="button" className="btn btn-primary" style={ { 'margin-left': '10'} }  onClick={ openModal }>New Sale</button>
     );
 }
 createCustomDeleteButton = (onBtnClick) => {
     return (
            <button type="button" className="btn btn-warning" style={ { 'margin-left': '10'} }  onClick={ onBtnClick }>Delete Sale</button>

     );
   }

  render() {

  const options = {
        afterInsertRow: onAfterInsertRow,
         afterDeleteRow: onAfterDeleteRow,
         insertBtn:this.createCustomInsertButton,
          deleteBtn: this.createCustomDeleteButton
           // A hook for after insert rows
      };
 var valu = new Date().toISOString();
              var re = valu.split("T");
              var p =re[0];

    return (
	          <Loader loaded={this.state.loaded}>

<div className="container">
<div className="form-inline">
<div className="row col-md-4">
<label for="customer">Select Supplier:</label>
     <select name="cars" id="supplier" className="form-control col-md-8">
                   {this.state.posts}

                 </select>
                 </div>
<div className="row col-md-4" style={{'margin-left':'10'}}>

     <label for="date">Select Date:</label>
<input className="form-control" id="date" placeholder="Select Date" type="date" max={p}/>
</div>
<div className="col-md-4" style={{ 'margin-left':'-20'}}>
    <input type="text" className="form-control"  id="SupplierInvoiceNumber"   placeholder="Supplier Invoice Number"/>
     </div>
<div className="row col-md-offset-8" style={{ 'margin-left':'-20'}}>
<Button bsStyle="success" onClick={this.handleClick}>Submit</Button>
</div>
</div>
<br></br>





<div className="checkbox" style={{"margin-left":"910"}}>
  <label><input type="checkbox" value=""/>Tax Inclusive</label>
</div>





                               <br></br>

<BootstrapTable maxHeight="200px" cellEdit={ cellEditProp }  options={ options } selectRow={ selectRowProp } insertRow deleteRow >
          <TableHeaderColumn width="30%" height="1" dataField='Desc' isKey={true} editable={ true } placeholder="enter description" >Description</TableHeaderColumn>
          <TableHeaderColumn width="30%" dataField='type'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.accounts } } }>ACCOUNT NAME</TableHeaderColumn>
           <TableHeaderColumn width="30%" dataField='Price' editable={true } dataAlign="Center"> ORDER AMOUNT</TableHeaderColumn>
           <TableHeaderColumn width="30%" dataField='type1'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.txt } } }>TAX NAME</TableHeaderColumn>


</BootstrapTable>
<br></br>
<br></br>
<div className="row">
   <label for="customer">Comment:</label>
   <select name="cars" id="comment" className="form-control col-md-2" style={{ 'margin-left':'10'}} >
                      {this.state.pots}
   </select>
          <label for="customer" style={{ 'margin-left':'10'}}>Sub Total:</label>
        <input type="text" className=" col-md-2 form-control" disabled="disabled" style={{ 'margin-left':'10'}} id="sub_total"   placeholder="Sub  Total"/>
   <label for="customer" style={{ 'margin-left':'10'}}>Freight:</label>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"10"}}   id="freight"   placeholder="Freight"/>
   <select name="cars" id="freight_code" className="form-control col-md-2" style={{"margin-left":"100"}} >
                      {this.state.fi}
   </select>
   </div>
   <br></br>
<div className="row">
<label for="customer">Ship Via:</label>
<select name="cars" id="ship" className="form-control col-md-2"  style={{ 'margin-left':'10'}}>
                   {this.state.ship}
</select>
<label for="customer" style={{"margin-left":"10"}} >Tax:</label>
<input type="text"  disabled="disabled" className="col-md-2 form-control" style={{"margin-left":"10"}}   id="tax_per"   placeholder="Tax"/>
<label for="customer" style={{"margin-left":"20"}} >Promise date:</label>
<input className=" col-md-2 form-control" id="promise_date"  style={{ 'margin-left':'15'}} placeholder="Select Date" type="date" min={p}/>
<label for="customer" style={{"margin-left":"10"}}>Total Amount:</label>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"10"}} disabled="disabled"  id="Total"   placeholder="Total Amount"/>
</div>
<br></br>
<div className="row">
<label for="customer">Bill Delivery Status:</label>
<select name="cars" id="dev_status" className="form-control col-md-2">
                   <option value="to be printed">to be printed</option>
</select>
<label for="customer" style={{"margin-left":"30"}} >Paid Today:</label>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"10"}}   id="paid_due"   placeholder="Paid Today"/>
<label for="customer" style={{"margin-left":"30"}} >Balance Due Amount:</label>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"10"}}   id="Bal_amount"   placeholder="Balance Due Amount"/>
</div>
</div>
</Loader>

    );
  }
}


export default Newpurchase;
