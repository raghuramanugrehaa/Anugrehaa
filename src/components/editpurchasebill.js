import React from "react";
import { BootstrapTable, TableHeaderColumn,InsertButton} from 'react-bootstrap-table';
import Loader from 'react-loader';
import { Button} from 'react-bootstrap';
import axios from "axios";
const queryString = require('query-string');
var ids="";
var sub_total=0;
var tax_total=0;
var money={};
var money_tax={};
var url="";
var raccnames = {};
var total_amount="";
var hashacct ={};
var hashtax={};
var hashitems={};
var RV="";
var SI="";
var Supplier="";
var newhash={};
var taxhash={};
var termhash={};
var jobshash={};
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
var addr = document.getElementById("note1").value;
var dev=document.getElementById("dev_status").value;
var mo= document.getElementById("Memo").value;
var te =document.getElementById("Terms").value;
var ds=document.getElementById("dev_status").value;


console.log("am addr"+addr);
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
var com=document.getElementById('comment').value;
var ship=document.getElementById('ship').value;
var fre_amount=document.getElementById('freight').value;
var fre_tax=document.getElementById("freight_code").value;
var del_status=document.getElementById('dev_status').value;
//var paid=document.getElementById('paid_due').value;
console.log(del_status);
var pm_date = document.getElementById("promise_date").value;
var tttax=parseInt(document.getElementById('tax_per').value);
axios.post('http://13.127.4.251:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order',{UID:ids,Number:invoiceID,Date:date,SupplierInvoiceNumber:SI ,Supplier:{UID:Supplier},Lines:klk,RowVersion:RV,Freight:fre_amount,FreightTaxCode:{UID:fre_tax},TotalTax : tttax,Comment:com,ShippingMethod:ship,OrderDeliveryStatus:del_status,AppliedToDate:12,PromisedDate:pm_date,ShipToAddress:addr,JournalMemo:mo,Terms:{PaymentIsDue:te}})
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
var juid=jobshash[row.type2];
  //  document.getElementById('sub_total').value="1";
var TUID=hashtax[row.Account];
var accountname= hashacct[row.Account];
var TUID=taxhash[row.tax];
var taxcode=TUID;

//auto call of amount
var tr=parseInt(money[row.Description]);
sub_total=sub_total-tr;
sub_total=parseInt(row.Total)+sub_total;
document.getElementById('sub_total').value=sub_total;
money[row.Desc]=row.Total;

//auto call of tax
var mt=parseInt(newhash[row.tax]);
tax_total=tax_total-parseInt(money_tax[row.Description])
money_tax[row.Description]=parseInt(row.Total)/mt;
tax_total=tax_total+parseInt(row.Total)/mt;
document.getElementById('tax_per').value=tax_total;
document.getElementById('Total').value=tax_total+sub_total;




hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:taxcode}}
 console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));





// pay+=parseInt(row.price);


}



function onAfterInsertRow(row) {
var TUID=taxhash[row.tax];
var accountname= hashacct[row.Account];
var juid=jobshash[row.type2];
var taxcode=TUID;
row_count++;

//auto call total
money[row.Description]=row.Total;
sub_total=parseInt(row.Total)+parseInt(sub_total);
document.getElementById('sub_total').value=sub_total;
document.getElementById('Total').value=tax_total+sub_total;
var dev=document.getElementById("dev_status").value;


//auto call tax
var mt=parseInt(newhash[row.tax]);
mt=parseInt(row.Total)/parseInt(mt);
money_tax[row.Desc]=mt;
tax_total=mt+tax_total;
document.getElementById('tax_per').value=tax_total;
document.getElementById('Total').value=tax_total+sub_total;




if("ACCOUNT SALES"==row.Description)
{
hashitems[row.Description]={Description:row.Description,Total:-row.Total,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));
}
else
{
hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},TaxCode:{UID:taxcode}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));

}

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
row_count--;

}



// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};




class Editpurchase extends React.Component {

    constructor(props) {
       super(props);
       const parsed = queryString.parse(this.props.location.search);
          //document.getElementById("datenow").value = "2014-02-09";

    this.handleChange = this.handleChange.bind(this);
      this.handleChange1 = this.handleChange1.bind(this);


  ids=parsed.id;
  url= "http://13.127.4.251:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order/"+ids;
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
           <button type="button" className="btn btn-warning" style={ { 'margin-left': '10'} }  onClick={ onBtnClick }>Delete Purchase</button>

    );
  }

 handleChange(event) {
    this.setState({datem: event.target.value});
  }

  handleChange1(event) {
     this.setState({prom: event.target.value});
   }
    componentDidMount() {

this.setState ( { loaded: false});
   // document.getElem  entById("date").value = "2014-02-09";
        axios.all([
        axios.get(url),
        axios.get('http://13.127.4.251:4000/purchase/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/')
        ])
        .then(axios.spread((invoice,dependencies) => {
        var acc = invoice.data.Lines;
        var myadd = invoice.data.ShipToAddress;
        console.log("myadd"+myadd);
        RV=invoice.data.RowVersion;
        SI=invoice.data.SupplierInvoiceNumber;
console.log("invocice "+JSON.stringify(invoice))
        cname=invoice.data.Supplier.Name;
        Supplier=invoice.data.Supplier.UID;
        invoiceID=invoice.data.Number;
         da=invoice.data.Date;
         sub_total=invoice.data.BalanceDueAmount;
         tax_total=invoice.data.TotalTax;
         var g=invoice.data.TotalAmount;
         var term=invoice.data.Terms.PaymentIsDue;
         var memo=invoice.data.JournalMemo;
         console.log("iam"+memo);
         var yu=invoice.data.BalanceDueAmount;
         var mm=invoice.data.PromisedDate;
         if(mm==null){
         //var resm = mm.split("T");
         this.setState({stotal:sub_total,totx:tax_total,balamount:yu,tmo:g+tax_total,prom:null});
        }
        else{
        var resm = mm.split("T");
                 this.setState({stotal:sub_total,totx:tax_total,balamount:yu,tmo:g+tax_total,prom:resm[0]});

        }
            //    document.getElementById('sub_total').value="1s";
        // document.getElementById('Total').value=tax_total+sub_total;
		 total_amount=invoice.data.TotalAmount;
         var res = da.split("T");
        this.setState({datem:res[0]});
        this.setState({mem:memo});
        this.setState({ter:term});
        this.setState({cusname:cname});
        this.setState({si:SI});
		this.setState({invoiceid:invoiceID});
		this.setState({tamount:total_amount});
		this.setState({adds:myadd});
        console.log("iam date"+res[0]);
        da=res[0];
 this.setState  ({ loaded: true});
row_count=acc.length;
var taxt=[];
//console.log("count of rows"+row_count)
       // document.getElementById('datenow').defaultValue='2017-02-03'
    var tax=dependencies.data.TaxCode
       var fri=[];
      for ( k = 0; k < tax.length; k++) {
              taxt.push(tax[k].Name);
              taxhash[tax[k].Name]=tax[k].UID;
              newhash[tax[k].Name]=tax[k].Rate;
       //taxc.push(<option key={result2[l].name} value={result1[l].name}> {result1[l].name} </option>);
              fri.push(<option key={tax[k].Name} value={tax[k].UID}>{tax[k].Name}</option>);
             // console.log("Tax hash"+JSON.stringify(acc[k].TaxCodeUID));

          }
        var comment = [];
        var shipping = [];
        var accnt =[];
        var jobs=[];
        var de=[];

        for (var k = 0; k < acc.length; k++) {
money[acc[k].Description]=acc[k].Total;
var mt=parseInt(newhash[acc[k].TaxCode.Code]);
money_tax[acc[k].Description]=parseInt(acc[k].Total)/mt;

var details={Description:acc[k].Description,Account:acc[k].Account.Name,type2:acc[k].Job.Number,Total:acc[k].Total,tax:acc[k].TaxCode.Code}
hashitems[acc[k].Description]={Description:acc[k].Description,Total:acc[k].Total,Account:{UID:acc[k].Account.UID},Job:{UID:acc[k].Job.UID},TaxCode:{UID:acc[k].TaxCode.UID}}
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

var cm=invoice.data.Comment;
var sp=invoice.data.ShippingMethod;
var ds=invoice.data.OrderDeliveryStatus;
        var acn=[];


  for (k = 0; k < acnames.length; k++) {
                acn.push(acnames[k].Name);
                currencies.push(acnames[k].Name)
            hashacct[acnames[k].Name]=acnames[k].UID
           hashtax[acnames[k].Name]=acnames[k].TaxCodeUID
            }
var re=dependencies.data.delivery_status;
console.log("checkk"+re);
for (var l =0;l < re.length;l++){
if(ds==re[l].value){
console.log("matched"+ds)
 de.push(<option key={re[l].value} value={re[l].value} selected="selected"> {re[l].name} </option>);
}
else{
 de.push(<option key={re[l].value} value={re[l].value}> {re[l].name} </option>);

}
}
var result1=dependencies.data.Comments;
console.log("checkk"+result1);
for (var l =0;l < result1.length;l++){
  if(cm==result1[l].name)
 comment.push(<option key={result1[l].name} value={result1[l].name} selected="selected"> {result1[l].name} </option>);
 else
  comment.push(<option key={result1[l].name} value={result1[l].name}> {result1[l].name} </option>);
}
var job=dependencies.data.Job;
console.log("lm"+JSON.stringify(job));
for (var l =0;l < job.length;l++){
 jobs.push(job[l].Name);
 jobshash[job[l].Name]= job[l].UID;

}

var result3=dependencies.data.Shipping;
console.log("shj"+sp);
for(var l=0;l < result3.length;l++){
  //console.log("shj  "+sp+" kndfvs  "+result3[l].name);
  if(sp==result3[l].name){
  //  console.log("shj  "+sp+" kndfvs  "+result3[l].name);
 shipping.push(<option key={result3[l].name} value={result3[l].name} selected="selected"> {result3[l].name} </option>);}
 else
shipping.push(<option key={result3[l].name} value={result3[l].name}> {result3[l].name} </option>)
}


this.setState({fi:fri})
this.setState({dstatus:de});
        this.setState({acco:acn});
        this.setState({pots :comment});
        this .setState({txt:taxt})
        this.setState({ship:shipping});
               this.setState({jobsb:jobs});
        var g=hashtax['Freight Collected'];
      //  console.log("iam acouint "+g.UID)
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
     <button type="button" className="btn btn-primary" style={ { 'margin-left': '10'} }  onClick={ openModal }>New Purchase</button>
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
 <label for="note" style={{'padding-top':'40'}}>Purchase Details:</label>
    <textarea id="note" className="form-control col-md-4" style={{"height":"100px","width":"280"} } value={"Supplier Name:"+this.state.cusname+"\nPurchase Number:"+this.state.invoiceid+"\nInvoice Date:"+this.state.datem+"\nTotal Amount:"+this.state.tamount} /><br></br>

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
<div className="row">
<label for="note" style={{'padding-top':'10'}}>Ship To:</label>
<textarea id="note1" className="form-control col-md-2" style={{"height":"50px","width":"10%"} } value={this.state.adds} />
<label for="Terms" style={{ 'margin-left':'20','padding-top':'10'}}>Terms:</label>
    <input type="text" className="col-md-2 form-control"   style={{'height':'30','padding-top':'10px','margin-left':'10'}} id="Terms"    value={this.state.ter}placeholder="TERMS" />
<label style={{'margin-left':'40','padding-top':'10'}}><input type="checkbox" checked />Tax Inclusive</label>
<label for="Journal Memo" style={{ 'margin-left':'50','padding-top':'10'}}>Journal Memo:</label>
<input type="text" className="col-md-2 form-control"   style={{'height':'30','padding-top':'10px','margin-left':'10'}} id="Memo"  value={this.state.mem} />


</div>

              <br></br>
<BootstrapTable data={ this.state.account }  maxHeight="200px" cellEdit={ cellEditProp } deleteRow selectRow={ selectRowProp } options={ options } insertRow deleteRow >

   <TableHeaderColumn width="30%" dataField='Description' isKey={true}  editable={true }  placeholder="enter description" >Description</TableHeaderColumn>
               <TableHeaderColumn width="30%"  dataField='Account'  editable={ { type: 'select', options: {values: this.state.acco} } } >Account Name</TableHeaderColumn>
                <TableHeaderColumn width="30%" dataField='Total' editable={true } dataAlign="Center" >ORDER  Amount</TableHeaderColumn>
                                <TableHeaderColumn width="30%" dataField='type2'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.jobsb} } }>JOB</TableHeaderColumn>
                      <TableHeaderColumn width="30%" dataField='tax'dataAlign="Center" editable={ { type: 'select', options: {values: this.state.txt } } }>TAX NAME</TableHeaderColumn>

           </BootstrapTable>
           <br></br>
<div className="row">

   <label for="customer">Comment:</label>
   <select name="cars" id="comment" className="form-control col-md-2" style={{ 'margin-left':'6%'}} >
                      {this.state.pots}
   </select>
          <label for="customer" style={{ 'margin-left':'29%'}}>Sub Total:</label>
        <input type="text" className=" col-md-2 col-md-offset-7 form-control" disabled="disabled" value={this.state.stotal} style={{ 'margin-left':'10'}} id="sub_total"   placeholder="Sub  Total"/>

   </div>

<br/>
   <div className="row">
<label for="customer">Ship Via:</label>
<select name="cars" id="ship" className="form-control col-md-2"  style={{ 'margin-left':'7%'}}>
                   {this.state.ship}
</select>

<label for="freight" style={{ 'margin-left':'31%'}}>Freight:</label>
<input type="text" className="col-md-2 form-control"    id="freight"   placeholder="Freight"/>
   <select name="cars" id="freight_code" className="form-control col-md-1" style={{"margin-left":"4%"}} >
                      {this.state.fi}
   </select>

   </div>
   <br/>
<div className="row">

<label for="customer" >Promise date:</label>
<input className=" col-md-2 form-control" id="promise_date"  style={{ 'margin-left':'3%'}} onChange={this.handleChange1} value={this.state.prom} placeholder="Select Date" type="date" min={p}/>

<label for="customer" style={{"margin-left":"33%"}} >Tax:</label>
<input type="text"  disabled="disabled" className="col-md-2 form-control" style={{"margin-left":"10"}}  value={this.state.totx} id="tax_per"   placeholder="Tax"/>

</div>
<br/>

<div className="row">

<label for="customer">Bill Delivery Status:</label>
<select name="cars" id="dev_status" className="form-control col-md-2">
                   {this.state.dstatus}
</select>

<label for="customer" style={{"margin-left":"26%"}}>Total Amount:</label>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"10"}} value={this.state.tmo} disabled="disabled"  id="Total"   placeholder="Total Amount"/>


</div>

      </div>
      </Loader>

    );
  }
}



export default Editpurchase;