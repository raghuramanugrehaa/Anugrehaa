import React from "react";
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var termhash={};
var acchash={};
var tothash={};
var p_data ={};
var id="";
var Lines = {
    details: []
};

const queryString = require('query-string');


const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell

};

function handleClick(e){
e.preventDefault();
var date = document.getElementById("date").value;
console.log("date"+date);
var amount = document.getElementById("Amount").value;
var sup = document.getElementById("supplier").value;
if (date==""){
alert("select date");
}
else if(amount == "" )
{
alert("Total Amount cannot be null ");
}
else
{
var tot=0;
Object.keys(tothash).forEach(function (key) {
tot += parseInt(tothash[key]);
console.log(tot);

})
if(tot<amount||tot>amount)
{
alert("check  Amount applied  ");
}
else{
Object.keys(p_data).forEach(function (key) {
    var value = p_data[key]
    var ll=value

    console.log("jhg"+value)
    Lines.details.push(ll)

    // iteration code
})

var klk=Lines.details;
    console.log(klk);
axios.post('http://35.154.129.58:4000/purchase/payment/e3152784-4811-4f2e-9a4f-884f3439db90/supplierPayments',{PayFrom:"Account",Account:{UID:"ff5fccac-6897-425e-87fd-dbb474c542f4"},Supplier:{UID:id},Date:date,Lines:klk})
  .then(function (response) {
   console.log(response);
     window.location.assign('/payments');
  })
  .catch(function (error) {
    console.log(error.response);
  });


}
}
}


function onAfterSaveCell(row,cellName,cellValue){
  var p = acchash[row.Number];
  if(row.Amount==""||row.Amount<0)
  row.Amount=0;
console.log(p);
p_data[row.Number]={Purchase:{UID:p},AmountApplied:row.Amount}
console.log(p_data[row.Number]);

tothash[row.Number]=row.Amount;


}
class Payments extends React.Component {


 constructor(props) {
     super(props);
          this.handleChange = this.handleChange.bind(this);
    this.state = {
       posts: [],



     };
  }
  handleChange(event) {
    // this.setState({datem: event.target.value});

 id = document.getElementById('supplier').value;
console.log("yes"+termhash[id]);
var r_data =[];
document.getElementById("payee").innerHTML=termhash[id];
document.getElementById("Memo").innerHTML="Payment;"+termhash[id];


          axios.get('http://35.154.129.58:4000/purchase/payment/e3152784-4811-4f2e-9a4f-884f3439db90/supplierPayments/'+id)

        .then(res =>{

     console.log("data"+JSON.stringify(res));
     var name=res.data.Items;




     for (var y=0;y<name.length;y++){

     r_data.push({UID:name[y].UID,Number:name[y].Number,SupplierInvoiceNumber:name[y].SupplierInvoiceNumber,Date:name[y].Date,BalanceDueAmount:name[y].BalanceDueAmount})
        acchash[name[y].Number]=name[y].UID
     }

     this.setState({r_d:r_data});
  r_data=[];
   });


  }




    componentDidMount() {
    this.setState ({ loaded: false});
    var arrTen = [];
      axios.get('http://35.154.129.58:4000/purchase/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/')
        .then(res => {
		             this.setState  ({ loaded: true});

               var result=res.data.Suppliers;
                for (var k = 0; k < result.length; k++) {
                  if(k==0){
                    arrTen.push(<option value="Select Supplier">Select Supplier  </option>);

                       arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
                               termhash[result[k].UID]=result[k].Name;


                             }
                             else{

                               arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
                                      termhash[result[k].UID]=result[k].Name;
                             }
                   }
this.setState({pos:arrTen})


        })
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
<label for="supplier" style={{'padding-top':'10'}}>Select Supplier: </label>
          <select  name="cars"  className="col-md-2 form-control" id="supplier" style={{'padding-left':'10'}}  onChange={this.handleChange}>
{this.state.pos}
</select>

<label for="date"  style={{'padding-top':'10', 'padding-left':'5%'}}>Payment date:</label>
     <input className="form-control col-md-2" id="date"  type="date"   style={{"height":"40"}}/>
<label for="cheque" style={{'padding-top':'10', 'padding-left':'5%'}}>Cheque No: </label>
    <input type="text" className="form-control col-md-2"  style={{'padding-left':'10','height':'40'}} id="cheque"   placeholder="Enter cheque No" />
<div style={{'margin-left':'40'}}>
 <Button bsStyle="success" onClick={handleClick} >Save</Button>
      </div>
</div>
<br></br>
<div className="form-inline">
     <label for="payee">Payee:</label>
<p id='payee' style={{'padding-top':'15','padding-left':'10'}}></p>
<label for="memo" style={{'padding-top':'10', 'padding-left':'15%'}}>Memo: </label>
<p id="Memo"style={{'padding-top':'20','padding-left':'10'}} > </p>

          <label for="Amount" style={{'padding-top':'10', 'padding-left':'10%'}} >Amount:</label>
              <input type="number" className="form-control col-md-2"  style={{'padding-left':'10'}} id="Amount"   placeholder="Enter Amount" />

</div>
<br></br>

<BootstrapTable   data={this.state.r_d} cellEdit={ cellEditProp }>

                <TableHeaderColumn width="30%" dataField='SupplierInvoiceNumber' isKey={true}  >Supplier Invoice Number</TableHeaderColumn>
                 <TableHeaderColumn width="30%"  dataField='Number'  editable={false }  >Number</TableHeaderColumn>
                 <TableHeaderColumn width="30%"  dataField='Date'  editable={false } >Date</TableHeaderColumn>
                 <TableHeaderColumn width="30%" dataField='BalanceDueAmount' editable={false } dataAlign="Center" >Amount</TableHeaderColumn>
                  <TableHeaderColumn width="30%" dataField='Amount2' editable={false } dataAlign="Center" >Discount</TableHeaderColumn>
                    <TableHeaderColumn width="30%" dataField='Amount1' editable={false } dataAlign="Center" >Total owed</TableHeaderColumn>
                <TableHeaderColumn width="30%" dataField='Amount' editable={true } dataAlign="Center" >Amount Applied</TableHeaderColumn>

           </BootstrapTable>

  <br></br>
<div className="row">
     <label for="Delivary" style={{'padding-top':'10'}} >Remittance Advice devilary status:</label>
<select  name="cars"  className="col-md-2 form-control" id="supplier" style={{'padding-left':'10'}} >
          <option>hii</option>
           <option>i</option>
</select>

     <label for="Total Applied" style={{'padding-left':'4%','padding-top':'10'}} >Total Applied:</label>
     <input type="number" className="form-control col-md-2"  style={{'padding-left':'10'}} id="Amount Applied"  disabled='disabled' />

          <label for="Finance " style={{'padding-left':'4%','padding-top':'10'}} >Finance Charge:</label>
               <input type="number" className="form-control col-md-2"  style={{'padding-left':'10'}} id='finance' placeholder="Enter Amount"   />
</div>
<br></br>
<div className="row">
          <label for="out balance " style={{'padding-left':'41%','padding-top':'10'}} >Out of Balance:</label>
                         <input type="number" className="form-control col-md-2"  style={{'padding-left':'10'}} id='out bal'  disabled='disabled'  />



          <label for="Total " style={{'padding-left':'4%','padding-top':'10'}} >Total Paid:</label>
                         <input type="number" className="form-control col-md-2"  style={{'padding-left':'20'}} id='total' disabled='disabled'   />




</div>
      </div>
      </Loader>
	  );
  }
}



export default Payments;