import React from "react";
import { BootstrapTable, TableHeaderColumn,InsertButton} from 'react-bootstrap-table';
import Loader from 'react-loader';
import { Button} from 'react-bootstrap';
import axios from "axios";
const queryString = require('query-string');
var ids="";
var url="";
var raccnames = {};
var total_amount="";
var hashacct ={};
var hashtax={};
var hashitems={};
var RV="";
var SI="";
var Supplier="";
var invoiceID="";
var invoiceid="";
var row_count=0;
var da="";
var currencies = [ ];
var cname="";


const products = [];

var Lines = {
    details: []
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell

};


function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: {
        amount: 2100 + i,
        currency: currencies[i % currencies.length]
      },
      //regions: regions.slice(0, (i % regions.length) + 1)
    });
  }
}

addProducts(5);

function handleClick(e){
e.preventDefault();
//var date = document.getElementById("date").value;
console.log(Object.keys(hashitems).length);
console.log(row_count);
if(Object.keys(hashitems).length==row_count)
{

console.log(Supplier);
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
console.log("yes"+Supplier);

axios.post('http://13.126.189.91:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order',{UID:ids,Number:invoiceID,Date:date,SupplierInvoiceNumber:SI ,Supplier:{UID:Supplier},Lines:klk,RowVersion:RV})
  .then(function (response) {
   console.log(response);
     window.location.assign('/purchase');
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
console.log(row)

var TUID=hashtax[row.Account];
var accountname= hashacct[row.Account];
var taxcode=TUID.UID;
if("ACCOUNT SALES"==row.Description)
{
if(row.Total<0){
hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},TaxCode:{UID:taxcode}}
 console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));
}
else{
hashitems[row.Description]={Description:row.Description,Total:-row.Total,Account:{UID:accountname},TaxCode:{UID:taxcode}}
 console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));
}

}
else
{
hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));

}
// pay+=parseInt(row.price);


}



function onAfterInsertRow(row) {
var TUID=hashtax[row.Account];
var accountname= hashacct[row.Account];
var taxcode=TUID.UID;
row_count++;
if("ACCOUNT SALES"==row.Description)
{
hashitems[row.Description]={Description:row.Description,Total:-row.Total,Account:{UID:accountname},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));
}
else
{
hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));

}

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

class PriceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = { amount: props.defaultValue.amount, currency: props.defaultValue.currency };
  }
  focus() {
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate({ amount: this.state.amount, currency: this.state.currency });
  }
  render() {
    return (
      <span>
        <input
          ref='inputRef'
          className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
          style={ { display: 'inline', width: '50%' } }
          type='text'
          value={ this.state.amount }
          onKeyDown={ this.props.onKeyDown }
          onChange={ (ev) => { this.setState({ amount: parseInt(ev.currentTarget.value, 10) }); } } />
        <select
          value={ this.state.currency }
          onKeyDown={ this.props.onKeyDown }
          onChange={ (ev) => { this.setState({ currency: ev.currentTarget.value }); } } >
          { currencies.map(currency => (<option key={ currency } value={ currency }>{ currency }</option>)) }
        </select>
        <button
          className='btn btn-info btn-xs textarea-save-btn'
          onClick={ this.updateData }>
          save
        </button>
      </span>
    );
  }
}

function priceFormatter(cell, row) {

   var oo={cell};
                     var pp=oo.cell.Name;

                      console.log("name is"+pp)

                      return pp||cell.currency ;
}

const createPriceEditor = (onUpdate, props) => (<PriceEditor onUpdate={ onUpdate } {...props}/>);




class Editpurchase extends React.Component {

    constructor(props) {
       super(props);
       const parsed = queryString.parse(this.props.location.search);
          //document.getElementById("datenow").value = "2014-02-09";

    this.handleChange = this.handleChange.bind(this);


  ids=parsed.id;
  url= "http://13.126.189.91:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order/"+ids;
  console.log(ids);
       this.state = {
         posts: [],
         account:[],
         salesheads:[],
         taxc:[],
         acco:[],
         datem:"",
         value:"",
         va:"",
         cusname:"",
         si:"",
		 invoiceid:"",
		 tamount:"",
         };
       }

 createCustomDeleteButton = (onBtnClick) => {
    return (
           <button type="button" className="btn btn-warning" style={ { 'margin-left': '10'} }  onClick={ onBtnClick }>Delete Sale</button>

    );
  }

 handleChange(event) {
    this.setState({datem: event.target.value});
  }




    componentDidMount() {

this.setState ( { loaded: false});
   // document.getElem  entById("date").value = "2014-02-09";
        axios.all([
        axios.get(url),
        axios.get('http://13.126.189.91:4000/purchase/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/')
        ])
        .then(axios.spread((invoice,dependencies) => {
        var acc = invoice.data.Lines;
        RV=invoice.data.RowVersion;
        SI=invoice.data.SupplierInvoiceNumber;
console.log("invocice "+SI)
        cname=invoice.data.Supplier.Name;
        Supplier=invoice.data.Supplier.UID;
        invoiceID=invoice.data.Number;
         da=invoice.data.Date;
		 total_amount=invoice.data.TotalAmount;
         var res = da.split("T");
        this.setState({datem:res[0]});
        this.setState({cusname:cname});
        this.setState({si:SI});
		this.setState({invoiceid:invoiceID});
		this.setState({tamount:total_amount});
        console.log("iam date"+res[0]);
        da=res[0];
 this.setState  ({ loaded: true});
row_count=acc.length;
//console.log("count of rows"+row_count)
       // document.getElementById('datenow').defaultValue='2017-02-03'
        var accnt =[];
        for (var k = 0; k < acc.length; k++) {

var details={Description:acc[k].Description,Account:acc[k].Account.Name,Total:acc[k].Total}
hashitems[acc[k].Description]={Description:acc[k].Description,Total:acc[k].Total,Account:{UID:acc[k].Account.UID},TaxCode:{UID:acc[k].TaxCode.UID}}
                accnt.push(details);
                console.log(JSON.stringify(acc[k]))
                raccnames[acc[k].Description]=acc[k].Account.Name;
//currencies.push(acc[k].Account.Name)
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
                currencies.push(acnames[k].Name)
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


  cellButton(cell, row, enumObject, rowIndex) {
         var oo={cell};
                   var pp=oo.cell.Name;

                    console.log("name is"+pp)
                    return pp;
            }


  createCustomInsertButton = (openModal) => {
    return (
     <button type="button" className="btn btn-primary" style={ { 'margin-left': '10'} }  onClick={ openModal }>New Sale</button>
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

                                       console.log("hello"+re[0]);


var link= da
console.log("ftr "+typeof(da))
    return (

 <Loader loaded={this.state.loaded}>

 <div className="container">
 <div className="row">
 <label for="note" style={{'padding-top':'40'}}>Invoice Details:</label>
    <textarea id="note" className="form-control col-md-4" style={{"height":"100px","width":"280"} } value={"Customer Name:"+this.state.cusname+"\nInvoice Number:"+this.state.invoiceid+"\nInvoice Date:"+this.state.datem+"\nTotal Amount:"+this.state.tamount} /><br></br>

<div>
<table>
<tr>
<td>
<div style={{"margin-left":"150","padding-top":"10"}}>
    <input type="text" className="form-control"  id="SupplierInvoiceNumber"   placeholder="Supplier Invoice Number" value={this.state.si}/>
     </div>
     </td>
</tr>
<tr>
<td>
 <div style={{'margin-left':'150','padding-top':'10'}}>
  <input className="form-control" id="datenow" type="date"  max={p} onChange={this.handleChange} value={this.state.datem}/>
 </div>
 </td>
 </tr>
 </table>
 </div>
 <div style={{'margin-left':'200','padding-top':'40'}}>
 <Button bsStyle="success" onClick={handleClick}>Save</Button>
      </div>
              </div>


              <br></br>
              <br></br>

     <BootstrapTable data={ this.state.account } cellEdit={ cellEditProp } deleteRow selectRow={ selectRowProp } options={ options } insertRow deleteRow >

   <TableHeaderColumn width="30%" dataField='Description' isKey={true}  editable={true }  placeholder="enter description" >Description</TableHeaderColumn>
               <TableHeaderColumn width="30%"  dataField='Account'  editable={ { type: 'select', options: {values: this.state.acco} } } >Account Name</TableHeaderColumn>
                <TableHeaderColumn width="30%" dataField='Total' editable={true } dataAlign="Center" >ORDER  Amount</TableHeaderColumn>
           </BootstrapTable>
      </div>
      </Loader>

    );
  }
}



export default Editpurchase;