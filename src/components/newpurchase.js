import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';



var url="";
var accrecv;

var myHash = {};
var checkHash = {};
var taxhash={};
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
   console.log(taxcodes)
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

console.log(Object.keys(checkHash).length)
if(supplier=="")
{

alert("Select customer");

}
else{
 if (date=="")
 {
 alert("select date");
 }
 else{

 if(Object.keys(checkHash).length==0)
 {
 alert("enter sales");
 }


else{


//var data="{Date:"+date+",Customer:{UID:"+customer+"},"+accrecv+"}";

Object.keys(checkHash).forEach(function (key) {
    var value = checkHash[key]
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
}
}

  componentDidMount() {
  this.setState ( { loaded: false});
       axios.get(url
     ).then(res => {
		             this.setState  ({ loaded: true});
var arrTen = [];
 console.log("ji"+JSON.stringify(res.data));
var result=res.data.Suppliers;
 for (var k = 0; k < result.length; k++) {
        arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
    }
       //  const posts = res.data.Items;

       this.setState({posts: arrTen});
//account detail fetching
var acc=res.data.Account
var accnt=[];

for ( k = 0; k < acc.length; k++) {
        accnt.push(acc[k].Name);
        myHash[acc[k].Name]=[acc[k].UID];
        taxhash[acc[k].Name]=acc[k].TaxCodeUID
    }



this.setState({accounts:accnt})

var acc1=res.data.salesheads
var heads=[];

for ( k = 0; k < acc1.length; k++) {
        heads.push(acc1[k]);

    }



this.setState({salesheads:heads})






console.log("im hash table"+myHash)


                                     /* use key/value for intended purpose */



  });
 }

  render() {
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
<div className="row col-md-4">

     <label for="date">Select Date:</label>
<input className="form-control" id="date" placeholder="Select Date" type="date" max={p}/>
</div>
<div className="col-md-4">
    <input type="text" className="form-control"  id="SupplierInvoiceNumber"   placeholder="Supplier Invoice Number"/>
     </div>
<div className="row col-md-offset-8">
<Button bsStyle="success" onClick={this.handleClick}>Submit</Button>
</div>
</div>

                               <br></br>
                               <br></br>
<BootstrapTable data={ this.state.salesheads } cellEdit={ cellEditProp } insertRow={ false  }>
          <TableHeaderColumn width="30%" dataField='Name' isKey={true} editable={false }  >Sale Heads</TableHeaderColumn>
          <TableHeaderColumn width="30%" dataField='type'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.accounts } } }>ACCOUNT NAME</TableHeaderColumn>
           <TableHeaderColumn width="30%" dataField='Price' editable={true } dataAlign="Center"> ORDER AMOUNT</TableHeaderColumn>


      </BootstrapTable>
</div>
</Loader>

    );
  }
}


export default Newpurchase;