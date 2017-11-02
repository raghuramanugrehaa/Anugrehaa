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
var exclusive={};
var money_tax={};
var hashacct ={};
var hashitems={};
var myHash = {};
var checkHash = {};
var newhash={};
var taxhash={};
var termhash={};
var hashtax={};
var jobshash={};
var row_count=0;
var Lines = {
    details: []
};
var texclusive = {
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
//getting job
var juid=jobshash[row.type2];
var t=row.Price;
var tr=parseInt(money[row.Desc]);
sub_total=sub_total-tr;
sub_total=parseInt(row.Price)+sub_total;
document.getElementById('sub_total').value=sub_total;
money[row.Desc]=row.Price;
var mt;
if(row.type1=="GST"){
  mt=11;
}

else{
 mt=parseInt(newhash[row.type1]);
}

tax_total=parseInt(tax_total)-parseInt(money_tax[row.Desc])

if(newhash[row.type1]=="0"){
tax_total=parseInt(tax_total).toFixed(2);
money_tax[row.Desc]=0;
}
else{
tax_total=(parseInt(row.Price)/mt+parseInt(tax_total)).toFixed(2);
money_tax[row.Desc]=(parseInt(row.Price)/mt).toFixed(2);
}
document.getElementById('tax_per').value=tax_total;
document.getElementById('Total').value=parseFloat(tax_total)+parseInt(sub_total);
   var taxname= taxhash[row.type1];
   var taxcodes=taxname;

   var account_uid=myHash[row.type];
  // console.log(taxcodes)
   var gvf=""+account_uid

hashitems[row.Desc]={Description:row.Desc,Total:row.Price,Account:{UID:gvf},Job:{UID:juid},TaxCode:{UID:taxcodes}}


 //exclusive module
  var r=document.getElementById('check').checked;
  if(r==true){
  row.Price=parseInt(row.Price)+parseFloat(money_tax[row.Desc]);

  //exclusive[row.Desc]={Desc:row.Desc,Price:row.Price,type:row.type,type1:row.type1,type2:row.type2,}

  }
  else
  row.Price=row.Price;

   exclusive[row.Desc]={Desc:row.Desc,Price:t,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}


console.log("aftersavecell"+JSON.stringify(hashitems[row.name]))


}}

}
function onAfterInsertRow(row) {

//checbox odule Inclusive


//getting jobs
var juid=jobshash[row.type2];


var TUID=taxhash[row.type1];
//id_tax[row.Desc]=row.type1;
var t=row.Price;
money[row.Desc]=row.Price;

var mt=0;
if(row.type1=="GST"){
  mt=11;
}

else {
  mt=parseInt(newhash[row.type1]);
}
if(newhash[row.type1]=="0"){
tax_total=parseInt(tax_total).toFixed(2);
money_tax[row.Desc]=0;
}
else{
tax_total=(parseInt(row.Price)/mt+parseInt(tax_total)).toFixed(2);
money_tax[row.Desc]=(parseInt(row.Price)/mt).toFixed(2);
}
document.getElementById('tax_per').value=tax_total;
document.getElementById('Total').value=parseFloat(tax_total)+parseInt(row.Price);

//sub_total
sub_total=parseInt(row.Price)+parseInt(sub_total);
document.getElementById('sub_total').value=sub_total;

//var d=document.getElementById('check').value;
var accountname= myHash[row.type];
var taxcode=TUID;
row_count++;
hashitems[row.Desc]={Description:row.Desc,Total:row.Price,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Desc]));



  //exclusive module
  var r=document.getElementById('check').checked;
  if(r==true){
  row.Price=parseInt(row.Price)+parseFloat(money_tax[row.Desc]);

  //exclusive[row.Desc]={Desc:row.Desc,Price:row.Price,type:row.type,type1:row.type1,type2:row.type2,check:true,tax:money_tax[row.Desc]}

  }
  else
  row.Price=row.Price;



   exclusive[row.Desc]={Desc:row.Desc,Price:t,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}


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
delete exclusive[rowKeys];
row_count--;

}

const selectRowProp = {
  mode: 'checkbox'
};

class Newbill extends React.Component {



  constructor(props) {
     super(props);
     this.handleClick = this.handleClick.bind(this);
     this.handleClick1 = this.handleClick1.bind(this);
     this.handleChange = this.handleChange.bind(this);
     url= "http://13.126.134.204:4000/purchase/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/";
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

 handleClick1(){


var g=document.getElementById("check").checked;

texclusive.details=[];
Object.keys(exclusive).forEach(function (key) {
    var value = exclusive[key]
    if(g==true){
    var Q=parseInt(value.Price)+parseFloat(value.tax);
  texclusive.details.push({Desc:value.Desc,Price:Q,type:value.type,type1:value.type1,type2:value.type2})
  }
  else
  texclusive.details.push({Desc:value.Desc,Price:value.Price,type:value.type,type1:value.type1,type2:value.type2})
})
var e=texclusive.details;
console.log("konnect"+JSON.stringify(e));
this.setState({taxdata:e} );

 }
 handleClick(){
//e.preventDefault();
    Lines.details=[];
var date = document.getElementById("date").value;
var supplier=document.getElementById("supplier").value;
var supplierInvoiceNumber=document.getElementById("SupplierInvoiceNumber").value;

console.log("hiiiii"+date);
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
var mem= document.getElementById("Memo").value;
var ter=document.getElementById('Terms').value;
var ship=document.getElementById('ship').value;
var dev=document.getElementById("dev_status").value;
var addr = document.getElementById("note").value;
var fre_amount=document.getElementById('freight').value;
var fre_tax=document.getElementById("freight_code").value;
var del_status=document.getElementById('dev_status').value;
//var paid=document.getElementById('paid_due').value;
var pm_date = document.getElementById("promise_date").value;
var tttax=parseInt(document.getElementById('tax_per').value);
this.setState ( { loaded: false});
var klk=Lines.details;
console.log("yes"+ supplier);
console.log("no"+JSON.stringify(klk));
this.setState ( { loaded: true});
var g=document.getElementById("check").checked;

axios.post('http://13.126.134.204:4000/purchaseb/e3152784-4811-4f2e-9a4f-884f3439db90/bill',{Date:date,SupplierInvoiceNumber:supplierInvoiceNumber ,Supplier:{UID:supplier},Lines:klk,Freight:"0",FreightTaxCode:{UID:fre_tax }})
  .then(function (response) {
   console.log(response);
    window.location.assign('/bill');

  })
  .catch(function (error) {
    console.log(error.response);
  });

}
}

 handleChange(event) {
 console.log("ji"+event.target.key)

  var e = document.getElementById("supplier");
  var strUser = e.options[e.selectedIndex].text;
   console.log("hi"+event.target.value)
  var k=termhash[event.target.value]
  console.log("am"+strUser)
  document.getElementById('Terms').value=k;
  document.getElementById("Memo").value="purchase,"+strUser
  //this.setState({supterm: event.target.value});
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
var de=[];
var jobs=[];
var terms=[];
 //console.log("ji"+JSON.stringify(res.data));
var result=res.data.Suppliers;
 for (var k = 0; k < result.length; k++) {
        arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
                termhash[result[k].UID]=result[k].PaymentIsDue;
    }

var result1=res.data.Comments;
console.log("checkk"+result1);
for (var l =0;l < result1.length;l++){
 comment.push(<option key={result1[l].name} value={result1[l].name}> {result1[l].name} </option>);
}

var re=res.data.delivery_status;
console.log("checkk"+re);
for (var l =0;l < re.length;l++){
 de.push(<option key={re[l].value} value={re[l].value}> {re[l].name} </option>);
}


var job=res.data.Job;
console.log("lm"+JSON.stringify(job));
for (var l =0;l < job.length;l++){
 jobs.push(job[l].Name);
 jobshash[job[l].Name]= job[l].UID;

}


var result3=res.data.Shipping;
for(var l=0;l < result3.length;l++){
shipping.push(<option key={result3[l].name} value={result3[l].name}> {result3[l].name} </option>)
}
       //  const posts = res.data.Items;

       this.setState({posts: arrTen});
       this.setState({term:terms});
       this.setState({pots :comment});
       this.setState({ship:shipping,dstatus:de});
       this.setState({jobsb:jobs});
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
      <button type="button" className="btn btn-primary" style={ { 'margin-left': '10'} }  onClick={ openModal }>Add Item</button>
     );
 }
 createCustomDeleteButton = (onBtnClick) => {
     return (
            <button type="button" className="btn btn-warning" style={ { 'margin-left': '10'} }  onClick={ onBtnClick }>Delete Item</button>

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
<label for="customer" style={{ "height":"18","size":"30" }}>Select Supplier:</label>
     <select name="cars" id="supplier" className="form-control col-md-8"  style={{"height":"40","size":"30"}} onChange={this.handleChange} >
                   {this.state.posts}
                 </select>
                 </div>
<div className="row col-md-4" style={{'margin-left':'10'}}>

     <label for="date" maxlength="5"  style={{"height":"20"}}>Select Date:</label>
<input className="form-control" id="date" placeholder="Select Date" type="date" max={p}  style={{"height":"30"}}/>
</div>
<div className="col-md-4" style={{ 'margin-left':'-20'}} maxlength="5">
    <input type="text" className="form-control"  id="SupplierInvoiceNumber"   placeholder="Supplier Invoice Number"  style={{"height":"30"}}/>
     </div>
<div className="row col-md-offset-8" style={{ 'margin-left':'-20'}}>
<Button bsStyle="success" onClick={this.handleClick}  style={{"height":"40"}}>Submit</Button>
</div>
</div>
<br></br>
<div className="row">
<label for="note" style={{'padding-top':'10'}}>Ship To:</label>
    <textarea id="note" className="form-control col-md-3" style={{"height":"50px",'width':'10%'} } />
    <label for="Terms" style={{ 'margin-left':'20','padding-top':'10'}}>Terms:</label>
    <input type="text" disabled='disabled' className="col-md-2 form-control"   style={{'height':'30','padding-top':'10px','margin-left':'10'}} id="Terms"  />

<label style={{'margin-left':'20','padding-top':'10'}}><input type="checkbox" id="check" onClick={this.handleClick1}  />Tax Inclusive</label>
<label for="Journal Memo" style={{ 'margin-left':'20','padding-top':'10'}}>Journal Memo:</label>
<input type="text" className="col-md-2 form-control"   style={{'height':'30','padding-top':'10px','margin-left':'10'}} id="Memo"   placeholder="Purchase" />


</div>





                               <br></br>

<BootstrapTable maxHeight="200px" data={this.state.taxdata} cellEdit={ cellEditProp }  options={ options } selectRow={ selectRowProp } insertRow deleteRow >
          <TableHeaderColumn width="30%" height="1" dataField='Desc' isKey={true} editable={ true } placeholder="enter description" >Description</TableHeaderColumn>
          <TableHeaderColumn width="30%" dataField='type'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.accounts } } }>ACCOUNT NAME</TableHeaderColumn>
           <TableHeaderColumn width="30%" dataField='Price' editable={true } dataAlign="Center"> ORDER AMOUNT</TableHeaderColumn>
           <TableHeaderColumn width="30%" dataField='type2'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.jobsb } } }>JOB</TableHeaderColumn>
           <TableHeaderColumn width="30%" dataField='type1'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.txt } } }>TAX NAME</TableHeaderColumn>


</BootstrapTable>
<br></br>
<br></br>
<div className="row">

   <label for="customer">Comment:</label>
   <select name="cars" id="comment" className="form-control col-md-2" style={{ 'margin-left':'6%',"height":"40"}}  >
                      {this.state.pots}
   </select>
          <label for="customer" style={{ 'margin-left':'33%',"height":"30"}}>Sub Total:</label>
        <input type="text" className=" col-md-2 col-md-offset-7 form-control" disabled="disabled" style={{ 'margin-left':'10',"height":"30"}} id="sub_total"   placeholder="Sub  Total"/>

   </div>

<br/>
   <div className="row">
<label for="customer">Ship Via:</label>
<select name="cars" id="ship" className="form-control col-md-2"  style={{ 'margin-left':'7%',"height":"40"}}>
                   {this.state.ship}
</select>

<label for="freight" style={{ 'margin-left':'35%'}}>Freight:</label>
<input type="text" className="col-md-2 form-control"    id="freight"   placeholder="Freight" style={{"height":"30"}}/>
   <select name="cars" id="freight_code" className="form-control col-md-1" style={{"margin-left":"4%","height":"40"}} >
                      {this.state.fi}
   </select>

   </div>
   <br/>
<div className="row">

<label for="customer" >Promise date:</label>
<input className=" col-md-2 form-control" id="promise_date"  style={{ 'margin-left':'3%',"height":"30"}} placeholder="Select Date" type="date" min={p}/>

<label for="customer" style={{"margin-left":"38%","height":"30"}} >Tax:</label>
<input type="text"  disabled="disabled" className="col-md-2 form-control" style={{"margin-left":"10","height":"30"}}   id="tax_per"   placeholder="Tax"/>

</div>
<br/>

<div className="row">

<label for="customer">Bill Delivery Status:</label>
<select name="cars" id="dev_status" className="form-control col-md-2" style={{"height":"40"}}>
                   {this.state.dstatus}
</select>

<label for="customer" style={{"margin-left":"31%"}}>Total Amount:</label>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"10","height":"30"}} disabled="disabled"  id="Total"   placeholder="Total Amount"/>
</div>

</div>





</Loader>

    );
  }
}


export default Newbill;
