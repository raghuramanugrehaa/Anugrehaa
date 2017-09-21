import React from "react";
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {FormControl, FormGroup,Button} from 'react-bootstrap';
import axios from "axios";
const queryString = require('query-string');
var ids="";
var url="";
var cname="";
var invoice_number="";
var invoice_date="";
var cuid="";
var balance_amount="";
var account_name="";
var raccnames = {};
var pay=0;
const jobtypes = [ 'ATM', 'CASH', 'CHEQUE','CREDIT CARD','DIRECT DEPOSIT','EFTPOS','OTHER' ];
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

function handleClick(e){
e.preventDefault();
console.log(pay);

axios.post('http://localhost:3001/media/48b58bb2-e017-4368-87c4-1fe44c1334ca/customerPayments',{DepositTo:"Account",PaymentMethod:"Cash",Account:{UID:"65118071-6650-400f-98e4-f88a7761d929"},Customer:{UID:cuid},Invoices:[{UID:ids,AmountApplied:pay,Type:"Invoice"}]})
  .then(function (response) {
    console.log(response);
     window.location.assign('/');
  })
  .catch(function (error) {
    console.log(error.response);
  });




}

function onAfterSaveCell(row,cellName,cellValue){
 pay+=parseInt(row.price);

}


class Sale extends React.Component {

    constructor(props) {
       super(props);
       const parsed = queryString.parse(this.props.location.search);

  ids=parsed.id;
  url= "http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices/"+ids;
  console.log(ids);
       this.state = {
         posts: [],
         account:[],
         salesheads:[],
         taxc:[],
         acco:[],


       };
    }

    componentDidMount() {
        axios.all([
        axios.get(url),
        axios.get('http://localhost:3001/sales/dependencies/48b58bb2-e017-4368-87c4-1fe44c1334ca/')
        ])
        .then(axios.spread((invoice,dependencies) => {
        var acc = invoice.data.Lines;
        var accnt =[];
        for (var k = 0; k < acc.length; k++) {


                accnt.push(acc[k]);
                console.log(JSON.stringify(acc[k].Account.Name))
                raccnames[acc[k].Description]=acc[k].Account.Name;

                }


          this.setState({account:accnt})


          var acc1 = dependencies.data.salesheads;
          var heads=[];
          for (var k = 0; k < acc1.length; k++) {
                          heads.push(acc1[k].Name);
                          }
          this.setState({salesheads:heads})

        var tax=dependencies.data.taxcodes;
        var tat=[];
        for (var k = 0; k < tax.length; k++) {
                tat.push(tax[k].Name);
            }
        this.setState({taxc:tat})

        var acnames = dependencies.data.Account;
        var acn=[];

  for (var k = 0; k < acnames.length; k++) {
                acn.push(acnames[k].Name);
            }
        this.setState({acco:acn})
        console.log(acn)
        console.log(dependencies.data)
        }))
        .catch(error => console.log(error));
    }



     cellButton2(cell, row, enumObject, rowIndex) {
                var oo={cell};
               //var pp=oo.cell;
var pp="hii";
console.log(oo)

                pp=raccnames[row.Description]
                	return (

row.type=pp


                  )
                  }

  render() {



    return (
 <div className="container">
 <div className="row">

           <div className="col-md-10">
                      <div className="text-right">
              <Button bsStyle="success" onClick={handleClick}>Submit</Button>
              </div>
              </div>
              </div>
              <br></br>
              <br></br>

     <BootstrapTable data={ this.state.account } cellEdit={ cellEditProp } insertRow={ true  } insertRow>
               <TableHeaderColumn width="300" dataField='Description' isKey={true} editable={{ type: 'select', options: {values: this.state.salesheads } } }  >Sale Heads</TableHeaderColumn>
               <TableHeaderColumn width="300" dataField='type'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.acco} } } >ACCOUNT NAME</TableHeaderColumn>
                <TableHeaderColumn width="300" dataField='Total' editable={true } dataAlign="Center">SALE AMOUNT</TableHeaderColumn>
                <TableHeaderColumn width="300" dataField='type1'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.taxc } } }>TAX TYPE</TableHeaderColumn>

           </BootstrapTable>
      </div>
    );
  }
}



export default Sale;