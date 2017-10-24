import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';
import Modal from 'react-bootstrap-modal';


var url="";
var accrecv;
var hashacct ={};
var hashitems={};
var myHash = {};
var checkHash = {};
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
console.log("sixth senes"+JSON.stringify(taxhash))
if(row.Price!=="0")
{
console.log("i got price "+row.Price)



if(typeof row.type !== "undefined") {
console.log("i got the account")

   var taxname= taxhash[row.type];
   var taxcodes=taxname.UID;

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

var TUID=taxhash[row.type];

var accountname= myHash[row.type];
console.log("inter"+accountname);
var taxcode=TUID.UID;
row_count++;
hashitems[row.Desc]={Description:row.Desc,Total:row.Price,Account:{UID:accountname},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Desc]));

}

function onAfterDeleteRow(rowKeys) {


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
       salesheads:[]

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

this.setState ( { loaded: false});
var klk=Lines.details;
console.log("yes"+ supplier);
console.log("no"+date);
this.setState ( { loaded: true});
axios.post('http://13.126.189.91:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order',{Date:date,SupplierInvoiceNumber:supplierInvoiceNumber ,Supplier:{UID:supplier},Lines:klk})
  .then(function (response) {
   console.log(response);
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
 //console.log("ji"+JSON.stringify(res.data));
var result=res.data.Suppliers;
 for (var k = 0; k < result.length; k++) {
        arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
    }
       //  const posts = res.data.Items;

       this.setState({posts: arrTen});
//account detail fetching
var acc=res.data.Account
console.log(JSON.stringify(acc))
var accnt=[];

for ( k = 0; k < acc.length; k++) {
        accnt.push(acc[k].Name);
        myHash[acc[k].Name]=acc[k].UID;
        taxhash[acc[k].Name]=acc[k].TaxCodeUID
       // console.log("Tax hash"+JSON.stringify(acc[k].TaxCodeUID));

    }


//console.log("Tax hash"+taxhash);
this.setState({accounts:accnt})

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
</BootstrapTable>
<br></br>
<div className="col-md-2" style={{ 'margin-left':'870'}}>
    <input type="text" className="form-control"  id="SupplierInvoiceNumber"   placeholder="Sub  Total"/>
     </div>
<br></br>

<div className="row">
<label for="customer">Comment:</label>
<select name="cars" id="supplier" className="form-control col-md-3">
                   {this.state.posts}
</select>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"300"}}   id="SupplierInvoiceNumber"   placeholder="Freight"/>
<select name="cars" id="supplier" className="form-control col-md-2" style={{"margin-left":"30"}} >
                   {this.state.posts}
</select>
</div>
<br></br>
<div className="row">
<label for="customer">Ship Via:</label>
<select name="cars" id="supplier" className="form-control col-md-3">
                   {this.state.posts}
</select>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"530"}}   id="SupplierInvoiceNumber"   placeholder="Tax"/>
</div>
<br></br>
<div className="row">
<label for="customer">Promise date:</label>
<input className=" col-md-2 form-control" id="date" placeholder="Select Date" type="date" min={p}/>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"590"}}   id="SupplierInvoiceNumber"   placeholder="Total Amount"/>
</div>
<br></br>
<div className="row">
<label for="customer">Bill Delivery Status:</label>
<select name="cars" id="supplier" className="form-control col-md-3">
                   {this.state.posts}
</select>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"220"}}   id="SupplierInvoiceNumber"   placeholder="Paid Today"/>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"50"}}   id="SupplierInvoiceNumber"   placeholder="Balance Due Amount"/>
</div>

</div>
</Loader>

    );
  }
}


export default Newpurchase;