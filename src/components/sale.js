import React from "react";

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import {Button} from 'react-bootstrap';
import axios from "axios";
const queryString = require('query-string');
var ids="";
var url="";
var raccnames = {};

var hashacct ={};
var hashtax={};
var hashitems={};
var RV="";
var CV="";
var invoiceID="";
var row_count=0;
var Lines = {
    details: []
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell

};

const options = {
  afterInsertRow: onAfterInsertRow,
   afterDeleteRow: onAfterDeleteRow
     // A hook for after insert rows
};


function handleClick(e){
e.preventDefault();
//var date = document.getElementById("date").value;
console.log(Object.keys(hashitems).length);
console.log(row_count);
if(Object.keys(hashitems).length==row_count)
{

console.log(CV);
console.log("im final"+JSON.stringify(hashitems));
var date = document.getElementById("datenow").value;
Object.keys(hashitems).forEach(function (key) {
    var value = hashitems[key]
    var ll=value

    console.log("jhg"+value)
    Lines.details.push(ll)

    // iteration code
})


var klk=Lines.details;
console.log(klk);
console.log("yes"+CV);

axios.post('http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices',{UID:ids,Number:invoiceID,Date:date,Customer:{UID:CV},Lines:klk,RowVersion:RV})
  .then(function (response) {
   console.log(response);
     window.location.assign('/');
  })
  .catch(function (error) {
    console.log(error.response);
  });

}
else{
alert("enter sales correctly");
}
}



function onAfterSaveCell(row,cellName,cellValue){
if(row.Total!=="0")
{
console.log("i got price "+row.Total)



if(typeof row.type !== "undefined") {
console.log("i got the account")
    // obj is a valid variable, do something here.


if(typeof row.Description !== "undefined") {
console.log("i got the tax")

var TUID=hashtax[row.type];
var accountname= hashacct[row.type];
var taxcode=TUID.UID;

hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));

// pay+=parseInt(row.price);
}
}
}
}


function onAfterInsertRow(row) {
var TUID=hashtax[row.type];
var accountname= hashacct[row.type];
var taxcode=TUID.UID;

row_count++;

hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},TaxCode:{UID:taxcode}}
  console.log('onAfterInsertRow'+JSON.stringify(hashitems[row.Description]));

}
function onAfterDeleteRow(rowKeys) {


  alert('The sale you are deleting is: ' + rowKeys);
delete hashitems[rowKeys];
row_count--;

}



// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};


class Sale extends React.Component {

    constructor(props) {
       super(props);
       const parsed = queryString.parse(this.props.location.search);
          //document.getElementById("datenow").value = "2014-02-09";

  ids=parsed.id;
  url= "http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices/"+ids;
  console.log(ids);
       this.state = {
         posts: [],
         account:[],
         salesheads:[],
         taxc:[],
         acco:[],
         datem:""


       };
    }


    componentDidMount() {
   // document.getElementById("date").value = "2014-02-09";
        axios.all([
        axios.get(url),
        axios.get('http://localhost:3001/sales/dependencies/48b58bb2-e017-4368-87c4-1fe44c1334ca/')
        ])
        .then(axios.spread((invoice,dependencies) => {
        var acc = invoice.data.Lines;
        RV=invoice.data.RowVersion;
        CV=invoice.data.Customer.UID;
        invoiceID=invoice.data.Number;
        var da=invoice.data.Date;
         var res = da.split("T");

        this.setState({datem:res[0]})
        console.log(da);
row_count=acc.length;
//console.log("count of rows"+row_count)
       // document.getElementById('datenow').defaultValue='2017-02-03'
        var accnt =[];
        for (var k = 0; k < acc.length; k++) {


                accnt.push(acc[k]);
                console.log(JSON.stringify(acc[k].Account.Name))
                raccnames[acc[k].Description]=acc[k].Account.Name;

                }


          this.setState({account:accnt})


          var acc1 = dependencies.data.salesheads;
          var heads=[];
          for (k = 0; k < acc1.length; k++) {
                          heads.push(acc1[k].Name);
                          }
          this.setState({salesheads:heads})



        var acnames = dependencies.data.Account;
        var acn=[];

  for (k = 0; k < acnames.length; k++) {
                acn.push(acnames[k].Name);
            hashacct[acnames[k].Name]=acnames[k].UID
           hashtax[acnames[k].Name]=acnames[k].TaxCodeUID
            }

        this.setState({acco:acn})
        var g=hashtax['Freight Collected'];
        console.log("iam acouint "+g.UID)
        console.log(dependencies.data)
        }))
        .catch(error => console.log(error));
    }






  render() {


    return (

 <div className="container">
 <div className="row">
 <div>
 <input className="form-control col-md-12" id="datenow" type="date" value={this.state.datem}/>
 </div>
 <div className="col-md-8">
 <div className="text-right">
              <Button bsStyle="success" onClick={handleClick}>Save</Button>
              </div>
              </div>
              </div>

              <br></br>
              <br></br>

     <BootstrapTable data={ this.state.account } cellEdit={ cellEditProp } deleteRow={ true } selectRow={ selectRowProp } options={ options } insertRow deleteRow >
               <TableHeaderColumn width="300" dataField='Description' isKey={true} editable={{ type: 'select', options: {values: this.state.salesheads } } }  >Sale Heads</TableHeaderColumn>
               <TableHeaderColumn width="300"  dataField='type'  editable={ {defaultValue: 1 ,  type: 'select', options: {values: this.state.acco} } } >Account Name</TableHeaderColumn>
                <TableHeaderColumn width="300" dataField='Total' editable={true } dataAlign="Center">Sale Amount</TableHeaderColumn>


           </BootstrapTable>
      </div>
    );
  }
}



export default Sale;