import React from "react";
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import axios from "axios";
var url="";
var accrecv;
var accrecv1;
var accsale;
var shpsaleg;
var fulsale;
var lotsale;
var fulsalel;
var lqrsale;
var shpsale;
var collectioin="";
const jobt = [ 'INR', 'DUL', 'DOLL' ];
var myHash = {};
var checkHash = {};
var acid={};
var tcid={};
var Lines = {
    details: []
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};
function handleClick(e){
e.preventDefault();
var date = document.getElementById("date").value;
var customer=document.getElementById("customer").value;
//var data="{Date:"+date+",Customer:{UID:"+customer+"},"+accrecv+"}";

Object.keys(checkHash).forEach(function (key) {
    var value = checkHash[key]
    var ll=value

    console.log("jhg"+value)
    Lines.details.push(ll)

    // iteration code
})


var klk=Lines.details;


axios.post('http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices',{Date:date,Customer:{UID:customer},Lines:klk})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error.response);
  });















}
function onAfterSaveCell(row,cellName,cellValue){
if(row.price!=="0")
{
console.log("i got price "+row.price)



if(typeof row.type != "undefined") {
console.log("i got the account")
    // obj is a valid variable, do something here.


if(typeof row.type1 != "undefined") {
console.log("i got the tax")
    // obj is a valid variable, do something here.




var gh={};
   var tax_uid=myHash[row.type1];

   var account_uid=myHash[row.type];
   console.log()


   var acf=""+tax_uid
   var gvf=""+account_uid

accrecv={Description:row.name,Total:row.price,Account:{UID:gvf},TaxCode:{UID:acf}}


checkHash[row.name]={}
checkHash[row.name]=accrecv




Object.keys(checkHash).forEach(function (key) {
   console.log("im in cheking hasg")

    // iteration code
})



}}}

 if('ACCOUNT SALES'==row.name){

 }
 else if('SHOP SALES (INCL GST)'==row.name){
 }
 else if('FUEL SALE INC GST'==row.name){
  }
 else if('LOTTO SALES'==row.name){
  }
 else if('FUEL SALES IN LTS'==row.name){
}
  else if('LIQUOR SALES'==row.name){
   }
  else if('SHOP SALES (EXCL GST)'==row.name){
   }








}

class Newinvoice extends React.Component {


  constructor(props) {
     super(props);
     url= "http://localhost:3001/sales/dependencies/48b58bb2-e017-4368-87c4-1fe44c1334ca/";
     this.state = {
       posts: [],
       accounts: []

     };
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

for (var k = 0; k < acc.length; k++) {
        accnt.push(acc[k].Name);
        myHash[acc[k].Name]=[acc[k].UID];
    }
this.setState({accounts:accnt})
console.log("im hash table"+myHash)


                                     /* use key/value for intended purpose */

var tax=res.data.taxcodes
var tat=[];
for (var k = 0; k < acc.length; k++) {
        tat.push(tax[k].Name);
        myHash[tax[k].Name]=[tax[k].UID];
    }
    var value = myHash["CAP"];
                                            console.log("checking"+value);
this.setState({taxc:tat})

  });
 }

  render() {

  var jobs = [{

             name: "ACCOUNT RECV",
             price: 0
         },{

             name: "ACCOUNT SALES",
             price: 0
         },{

                  name: "SHOP SALES (INCL GST)",
                  price: 0
              },{

                       name: "FUEL SALE INC GST ",
                       price: 0

                   },{

                            name: "LOTTO SALES ",
                            price: 0
                        },{

                                 name: "FUEL SALES IN LTS",
                                 price: 0
                             },
                             {

                               name: "LIQUOR SALES",
                               price: 0
                                 },
                            {

                          name: "SHOP SALES (EXCL GST)",
                            price: 0

                            }];


    return (
<div>

<div className="row">

<div className="row col-md-4">
     <select name="cars" id="customer" className="form-control">
                   {this.state.posts}

                 </select>

                 </div>
<div>
<input className="form-control col-md-12" id="date" type="date"/>
</div>
                 <div className="row-col-md-16">
                                       <div class="text-right">
                               <Button bsStyle="success" onClick={handleClick}>Submit</Button>
                               </div>
                 .              </div>

                               </div>
                               <br></br>
                               <br></br>
<BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ false  }>
          <TableHeaderColumn dataField='name' isKey={true} editable={false } >Sale Heads</TableHeaderColumn>
          <TableHeaderColumn dataField='type'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.accounts } } }>ACCOUNT NAME</TableHeaderColumn>
           <TableHeaderColumn dataField='price' editable={true } dataAlign="Center">SALE AMOUNT</TableHeaderColumn>
           <TableHeaderColumn dataField='type1'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.taxc } } }>TAX TYPE</TableHeaderColumn>

      </BootstrapTable>
</div>
    );
  }
}


export default Newinvoice;