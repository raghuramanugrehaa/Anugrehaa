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
sub_total=(parseFloat(sub_total)-parseFloat(money[row.Desc])).toFixed(2);
tax_total=(parseFloat(tax_total)-parseFloat(money_tax[row.Desc])).toFixed(2);

if(cellName=="type1"){

  var PR=parseFloat(money_tax[row.Desc])+parseFloat(money[row.Desc])


var tem=newhash[row.type1];
var tax_tem;
if(row.type1=="GST")
 tax_tem=(parseFloat(PR)/parseFloat(11)).toFixed(2);
else
var tax_tem=0



console.log(PR +" l "+tax_tem)
money_tax[row.Desc]=parseFloat(tax_tem);

tax_total=(parseFloat(tax_tem)+parseFloat(tax_total)).toFixed(2);

sub_total=((parseFloat(PR)-parseFloat(tax_tem))+parseFloat(sub_total)).toFixed(2);
document.getElementById("sub_total").value=sub_total;
document.getElementById("tax_per").value=tax_total;
document.getElementById("Total").value=(parseFloat(sub_total)+parseFloat(tax_total)).toFixed(2)



var juid=jobshash[row.type2];


var TUID=taxhash[row.type1];
//id_tax[row.Desc]=row.type1;

//var d=document.getElementById('check').value;
var accountname= myHash[row.type];
hashitems[row.Desc]={Description:row.Desc,Total:PR,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:TUID}}
  var r=document.getElementById('check').checked;
  var ff=(parseFloat(PR)-parseFloat(tax_tem)).toFixed(2);
  money[row.Desc]=ff;
   exclusive[row.Desc]={Desc:row.Desc,Price:ff,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}

  if(r==false){
   row.Price=(parseFloat(PR)-parseFloat(tax_tem)).toFixed(2);

}
else{
row.Price=PR;
 //  exclusive[row.Desc]={Desc:row.Desc,Price:row.Price,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}
}


}




if(cellName==="Price"){




var tem=newhash[row.type1];
var tax_tem;
if(row.type1=="GST")
var tax_tem=(parseFloat(row.Price)/parseFloat(11)).toFixed(2);
else
tax_tem=0



console.log(row.Price +" l "+tax_tem)
money_tax[row.Desc]=parseFloat(tax_tem);

tax_total=(parseFloat(tax_tem)+parseFloat(tax_total)).toFixed(2);
console.log("toto"+sub_total)

sub_total=((parseFloat(row.Price)-parseFloat(tax_tem))+parseFloat(sub_total)).toFixed(2);
document.getElementById("sub_total").value=sub_total;
document.getElementById("tax_per").value=tax_total;
document.getElementById("Total").value=(parseFloat(sub_total)+parseFloat(tax_total)).toFixed(2)



var juid=jobshash[row.type2];


var TUID=taxhash[row.type1];
//id_tax[row.Desc]=row.type1;

//var d=document.getElementById('check').value;
var accountname= myHash[row.type];
hashitems[row.Desc]={Description:row.Desc,Total:row.Price,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:TUID}}
  var r=document.getElementById('check').checked;
  var ff=(parseFloat(row.Price)-parseFloat(tax_tem)).toFixed(2);
  money[row.Desc]=ff;
   exclusive[row.Desc]={Desc:row.Desc,Price:ff,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}

  if(r==false){
   row.Price=(parseFloat(row.Price)-parseFloat(tax_tem)).toFixed(2);

}
else{
row.Price=row.Price;
 //  exclusive[row.Desc]={Desc:row.Desc,Price:row.Price,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}
}

}
else{

var juid=jobshash[row.type2];


var TUID=taxhash[row.type1];
//id_tax[row.Desc]=row.type1;

//var d=document.getElementById('check').value;
var accountname= myHash[row.type];
hashitems[row.Desc]={Description:row.Desc,Total:row.Price,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:TUID}}
}
console.log('onAftersavecell'+JSON.stringify(hashitems[row.Desc]));

}


function onAfterInsertRow(row) {

//checbox odule Inclusive

var tem=newhash[row.type1];
var tax_tem;
if(row.type1=="GST")
tax_tem=(parseFloat(row.Price)/parseFloat(11)).toFixed(2);
else
tax_tem=0;
console.log("tax"+tem+"fdv"+tax_tem);
money_tax[row.Desc]=tax_tem;
tax_total=(parseFloat(tax_tem)+parseFloat(tax_total)).toFixed(2);

console.log("iop"+tax_tem+" trax"+tax_total+" ")
sub_total=((parseFloat(row.Price)-parseFloat(tax_tem))+parseFloat(sub_total)).toFixed(2);
document.getElementById("sub_total").value=sub_total;
document.getElementById("tax_per").value=tax_total;
document.getElementById("Total").value=(parseFloat(sub_total)+parseFloat(tax_total)).toFixed(2)


//getting jobs
var juid=jobshash[row.type2];


var TUID=taxhash[row.type1];
//id_tax[row.Desc]=row.type1;


//var d=document.getElementById('check').value;
var accountname= myHash[row.type];

row_count++;
hashitems[row.Desc]={Description:row.Desc,Total:row.Price,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:TUID}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Desc]));



  //exclusive module
  var r=document.getElementById('check').checked;
  var ff=(parseFloat(row.Price)-parseFloat(tax_tem)).toFixed(2);
  money[row.Desc]=ff;
  exclusive[row.Desc]={Desc:row.Desc,Price:ff,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}


  if(r==false){
   row.Price=(parseFloat(row.Price)-parseFloat(tax_tem)).toFixed(2);


//exclusive[row.Desc]={Desc:row.Desc,Price:row.Price,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}

}
else{
row.Price=row.Price;


}




}

function onAfterDeleteRow(rowKeys) {
  for(var l=0;l<rowKeys.length;l++){
var tr=parseFloat(money[rowKeys[l]]);
sub_total=(parseFloat(sub_total)-parseFloat(tr)).toFixed(2);
document.getElementById('sub_total').value=sub_total;
money[rowKeys[l]]=0;
tax_total=(parseFloat(tax_total)-parseFloat(money_tax[rowKeys[l]])).toFixed(2);
money_tax[rowKeys[l]]=0;
document.getElementById('tax_per').value=parseFloat(tax_total).toFixed(2);
document.getElementById('Total').value=(parseFloat(tax_total)+parseFloat(sub_total)).toFixed(2);
  alert('The sale you are deleting is: ' + rowKeys);
delete hashitems[rowKeys[l]];
delete exclusive[rowKeys[l]];
row_count--;
}
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
    var Q=parseFloat(value.Price)+parseFloat(value.tax);
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

axios.post('http://13.126.134.204:4000/purchaseb/e3152784-4811-4f2e-9a4f-884f3439db90/bill',{Date:date,SupplierInvoiceNumber:supplierInvoiceNumber ,Supplier:{UID:supplier},Lines:klk,Freight:"0",FreightTaxCode:{UID:fre_tax },ShipToAddress:addr,Comment:com,ShippingMethod:ship,BillDeliveryStatus:"Print",PromisedDate:pm_date})
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
   if(k==0){
     arrTen.push(<option value="Select Supplier">Select Supplier  </option>);

        arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
                termhash[result[k].UID]=result[k].PaymentIsDue;
              }
              else{

                arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
                        termhash[result[k].UID]=result[k].PaymentIsDue;
              }
    }

var result1=res.data.Comments;
console.log("checkk"+result1);
for (var l =0;l < result1.length;l++){
  if(l==0){
  comment.push(<option value="Select Comment" >Select Comment </option>)
  comment.push(<option key={result1[l].name} value={result1[l].name}> {result1[l].name} </option>);

}
  else
 comment.push(<option key={result1[l].name} value={result1[l].name}> {result1[l].name} </option>);
}

var re=res.data.delivery_status;
console.log("checkk"+re);
for (var l =0;l < re.length;l++){
  if(l==0){
  de.push(<option value="Select Bill Devlivery Status " >Select Bill Devlivery Status  </option>)
    de.push(<option key={re[l].value} value={re[l].value}> {re[l].name} </option>);

}
  else
 de.push(<option key={re[l].value} value={re[l].value}> {re[l].name} </option>);
}
document.getElementById('check').checked="true"

var job=res.data.Job;
console.log("lm"+JSON.stringify(job));
for (var l =0;l < job.length;l++){
 jobs.push(job[l].Name);
 jobshash[job[l].Name]= job[l].UID;

}


var result3=res.data.Shipping;
for(var l=0;l < result3.length;l++){
  if(l==0){
  shipping.push(<option value="Select Shipping" >Select Shipping </option>)
  shipping.push(<option key={result3[l].name} value={result3[l].name}> {result3[l].name} </option>)

}
  else
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
  if(acc[k].Name!=""){
        accnt.push(acc[k].Name);
        myHash[acc[k].Name]=acc[k].UID;
       // console.log("Tax hash"+JSON.stringify(acc[k].TaxCodeUID));
}
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
    <label for="Terms" style={{ 'margin-left':'20','padding-top':'10'}} >Terms: </label>
    <input type="text" disabled='disabled' className="col-md-2 form-control"   style={{'height':'40','padding-top':'10px','margin-left':'10'}} id="Terms"  />

<label style={{'margin-left':'20','padding-top':'10'}}><input type="checkbox" id="check" onClick={this.handleClick1}  />Tax Inclusive</label>
<label for="Journal Memo" style={{ 'margin-left':'20','padding-top':'10'}}>Journal Memo:</label>
<input type="text" className="col-md-2 form-control"   style={{'height':'40','padding-top':'10px','margin-left':'10'}} id="Memo"   placeholder="Purchase" />


</div>





                               <br></br>

<BootstrapTable maxHeight="200px" data={this.state.taxdata} cellEdit={ cellEditProp }  options={ options } selectRow={ selectRowProp } insertRow deleteRow >
          <TableHeaderColumn width="30%" height="1" dataField='Desc' isKey={true} editable={ true } placeholder="enter description" >Description</TableHeaderColumn>
          <TableHeaderColumn width="30%" dataField='type'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.accounts } } }>ACCOUNT NAME</TableHeaderColumn>
           <TableHeaderColumn width="30%" dataField='Price' editable={true } dataAlign="Center"> BILL AMOUNT</TableHeaderColumn>
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
