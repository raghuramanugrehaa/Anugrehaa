import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import axios from "axios";



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

class Newinvoice extends React.Component {



  constructor(props) {
     super(props);
     this.handleClick = this.handleClick.bind(this);
     url= "http://localhost:3001/sales/dependencies/48b58bb2-e017-4368-87c4-1fe44c1334ca/";
     this.state = {
       posts: [],
       accounts: [],
       salesheads:[]

     };
  }


 handleClick(){
//e.preventDefault();
var date = document.getElementById("date").value;
var customer=document.getElementById("customer").value;


console.log(Object.keys(checkHash).length)
if(customer=="")
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


var klk=Lines.details;
console.log("yes"+ customer);
console.log("no"+date);

axios.post('http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices',{Date:date,Customer:{UID:customer},Lines:klk})
  .then(function (response) {
   console.log(response);
     window.location.assign('/');

  })
  .catch(function (error) {
    console.log(error.response);
  });

}
}
}
}

  componentDidMount() {

       axios.get(url
     ).then(res => {
var arrTen = [];
var result=res.data.customer;
 for (var k = 0; k < result.length; k++) {
        arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
    }
       //  const posts = res.data.Items;
      console.log(res.data);
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
<div className="container">
<div className="form-inline">
<div className="row col-md-4">
<label for="customer">Select Store:</label>
     <select name="cars" id="customer" className="form-control">
                   {this.state.posts}

                 </select>
                 </div>
<div className="row col-md-4">

     <label for="date">Select Date:</label>
<input className="form-control" id="date" placeholder="Select Date" type="date" max={p}/>
</div>
<div className="row col-md-offset-8">
<Button bsStyle="success" onClick={this.handleClick}>Submit</Button>
</div>
</div>

                               <br></br>
                               <br></br>
<BootstrapTable data={ this.state.salesheads } cellEdit={ cellEditProp } insertRow={ false  }>
          <TableHeaderColumn width="300" dataField='Name' isKey={true} editable={false }  >Sale Heads</TableHeaderColumn>
          <TableHeaderColumn width="300" dataField='type'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.accounts } } }>ACCOUNT NAME</TableHeaderColumn>
           <TableHeaderColumn width="300" dataField='Price' editable={true } dataAlign="Center">SALE AMOUNT</TableHeaderColumn>


      </BootstrapTable>
</div>
    );
  }
}


export default Newinvoice;