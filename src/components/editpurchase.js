import React from "react";
import { BootstrapTable, TableHeaderColumn,InsertButton} from 'react-bootstrap-table';
import Loader from 'react-loader';
import { Button} from 'react-bootstrap';
import axios from "axios";
const queryString = require('query-string');
var ids="";
var exclusive={};

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
var texclusive = {
    details: []
};
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
//var date = document.getElementById("date").value;


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
var PI=document.getElementById('SupplierInvoiceNumber').value;
var tttax=parseInt(document.getElementById('tax_per').value);
axios.post('http://13.126.134.204:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order',{UID:ids,Number:invoiceID,Date:date,SupplierInvoiceNumber:PI ,Supplier:{UID:Supplier},Lines:klk,RowVersion:RV,Freight:fre_amount,FreightTaxCode:{UID:fre_tax},TotalTax : tttax,Comment:com,ShippingMethod:ship,OrderDeliveryStatus:del_status,AppliedToDate:12,PromisedDate:pm_date,ShipToAddress:addr,JournalMemo:mo,Terms:{PaymentIsDue:te}})
  .then(function (response) {
   console.log(response);
     window.location.assign('/purchase');
  })
  .catch(function (error) {
    console.log(error.response);
  });


}

function handleClick1(e){
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
axios.post('http://13.126.134.204:4000/purchaseb/e3152784-4811-4f2e-9a4f-884f3439db90/bill/'+ids,{Date:date,SupplierInvoiceNumber:SI ,Supplier:{UID:Supplier},Lines:klk,RowVersion:RV,Freight:fre_amount,FreightTaxCode:{UID:fre_tax},TotalTax : tttax,Comment:com,ShippingMethod:ship,OrderDeliveryStatus:del_status,AppliedToDate:12,PromisedDate:pm_date,ShipToAddress:addr,JournalMemo:mo,Terms:{PaymentIsDue:te},Order:{UID:ids,Number:invoiceID}})
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

sub_total=(parseFloat(sub_total)-parseFloat(money[row.Description])).toFixed(2);
tax_total=(parseFloat(tax_total)-parseFloat(money_tax[row.Description])).toFixed(2);

if(cellName=="tax"){

  var PR=parseFloat(money_tax[row.Description])+parseFloat(money[row.Description])


  var tem=newhash[row.tax];
  var tax_tem;
  if(row.tax=="GST")
  tax_tem=(parseFloat(PR)/parseFloat(11)).toFixed(2);
  else
  tax_tem=0;


//var tax_tem=(parseFloat(PR)/parseFloat(tem)).toFixed(2);
console.log(row.Total +" l "+tax_tem)
money_tax[row.Description]=parseFloat(tax_tem);

tax_total=(parseFloat(tax_tem)+parseFloat(tax_total)).toFixed(2);

sub_total=((parseFloat(PR)-parseFloat(tax_tem))+parseFloat(sub_total)).toFixed(2);
document.getElementById("sub_total").value=sub_total;
document.getElementById("tax_per").value=tax_total;
document.getElementById("Total").value=(parseFloat(sub_total)+parseFloat(tax_total)).toFixed(2)



var juid=jobshash[row.type2];


var TUID=taxhash[row.tax];
//id_tax[row.Desc]=row.type1;

//var d=document.getElementById('check').value;
var accountname= hashacct[row.Account];
hashitems[row.Description]={Description:row.Description,Total:PR,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:TUID}}
  var r=document.getElementById('check').checked;
  var ff=(parseFloat(PR)-parseFloat(tax_tem)).toFixed(2);
  money[row.Description]=ff;
   exclusive[row.Description]={Description:row.Description,Total:ff,tax:row.tax,Account:row.Account,type2:row.type2,rate:money_tax[row.Description]}

  if(r==false){
   row.Total=(parseFloat(PR)-parseFloat(tax_tem)).toFixed(2);

}
else{
row.Total=PR;
 //  exclusive[row.Desc]={Desc:row.Desc,Price:row.Price,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}
}


}




if(cellName==="Total"){



  var tem=newhash[row.tax];
  var tax_tem;
  if(row.tax=="GST")
  tax_tem=(parseFloat(row.Total)/parseFloat(11)).toFixed(2);
  else
  tax_tem=0;




console.log(row.Price +" l "+tax_tem)
money_tax[row.Description]=parseFloat(tax_tem);

tax_total=(parseFloat(tax_tem)+parseFloat(tax_total)).toFixed(2);

sub_total=((parseFloat(row.Total)-parseFloat(tax_tem))+parseFloat(sub_total)).toFixed(2);
document.getElementById("sub_total").value=sub_total;
document.getElementById("tax_per").value=tax_total;
document.getElementById("Total").value=(parseFloat(sub_total)+parseFloat(tax_total)).toFixed(2)



var juid=jobshash[row.type2];


var TUID=taxhash[row.tax];
//id_tax[row.Desc]=row.type1;

//var d=document.getElementById('check').value;
var accountname= hashacct[row.Account];
hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:TUID}}
  var r=document.getElementById('check').checked;
  var ff=(parseFloat(row.Total)-parseFloat(tax_tem)).toFixed(2);
  money[row.Description]=ff;
   exclusive[row.Description]={Description:row.Description,Total:ff,tax:row.tax,Account:row.Account,type2:row.type2,rate:money_tax[row.Description]}

  if(r==false){
   row.Total=(parseFloat(row.Total)-parseFloat(tax_tem)).toFixed(2);

}
else{
row.Total=row.Total;
 //  exclusive[row.Desc]={Desc:row.Desc,Price:row.Price,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}
}

}

}

function onAfterInsertRow(row) {


var tem=newhash[row.tax];
var tax_tem;
if(row.tax=="GST")
tax_tem=(parseFloat(row.Total)/parseFloat(11)).toFixed(2);
else
tax_tem=0;


console.log("tax"+tem+"fdv"+tax_tem);
money_tax[row.Description]=tax_tem;
tax_total=(parseFloat(tax_tem)+parseFloat(tax_total)).toFixed(2);

console.log("iop"+tax_tem+" trax"+tax_total+" ")
sub_total=((parseFloat(row.Total)-parseFloat(tax_tem))+parseFloat(sub_total)).toFixed(2);
document.getElementById("sub_total").value=sub_total;
document.getElementById("tax_per").value=tax_total;
document.getElementById("Total").value=(parseFloat(sub_total)+parseFloat(tax_total)).toFixed(2)


//getting jobs
var juid=jobshash[row.type2];


var TUID=taxhash[row.tax];
//id_tax[row.Desc]=row.type1;


//var d=document.getElementById('check').value;
var accountname= hashacct[row.Account];

row_count++;
hashitems[row.Description]={Description:row.Description,Total:row.Total,Account:{UID:accountname},Job:{UID:juid},TaxCode:{UID:TUID}}

  console.log('onAftersavecell'+JSON.stringify(hashitems[row.Description]));



  //exclusive module
  var r=document.getElementById('check').checked;
  var ff=(parseFloat(row.Total)-parseFloat(tax_tem)).toFixed(2);
  money[row.Description]=ff;
   exclusive[row.Description]={Description:row.Description,Total:ff,tax:row.tax,Account:row.Account,type2:row.type2,rate:money_tax[row.Description]}

  if(r==false){
   row.Total=(parseFloat(row.Total)-parseFloat(tax_tem)).toFixed(2);

}
else{
row.Total=row.Total;
 //  exclusive[row.Desc]={Desc:row.Desc,Price:row.Price,type:row.type,type1:row.type1,type2:row.type2,tax:money_tax[row.Desc]}
}



}
function onAfterDeleteRow(rowKeys) {
  for(var q=0;q<rowKeys.length;q++){
  var tr=(parseFloat(money[rowKeys[q]])-parseFloat(money_tax[rowKeys[q]])).toFixed(2);
  console.log("sub_total"+sub_total+"tax"+tr);
  sub_total=(parseFloat(sub_total)-parseFloat(tr)).toFixed(2);
  document.getElementById('sub_total').value=sub_total;
  money[rowKeys[q]]=0;
  tax_total=(parseFloat(tax_total)-parseFloat(money_tax[rowKeys[q]])).toFixed(2);
  money_tax[rowKeys[q]]=0;
  document.getElementById('tax_per').value=tax_total;
  document.getElementById('Total').value=parseFloat(tax_total)+parseFloat(sub_total);
    //alert('The sale you are deleting is: ' + rowKeys[q]);
  delete hashitems[rowKeys[q]];
  delete exclusive[rowKeys[q]];
  row_count--;
  }
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
        this.handleCheck = this.handleCheck.bind(this);


  ids=parsed.id;
  url= "http://13.126.134.204:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order/"+ids;
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
           <button type="button" className="btn btn-warning" style={ { 'margin-left': '10'} }  onClick={ onBtnClick }>Delete Item</button>

    );
  }

 handleChange(event) {
    this.setState({datem: event.target.value});
  }

  handleChange1(event) {
     this.setState({prom: event.target.value});
   }

handleCheck(event){
var inc=document.getElementById('check').checked;


  texclusive.details=[];
  Object.keys(exclusive).forEach(function (key) {
      var value = exclusive[key]
    //  console.log(value.Total);
      if(inc==true){
      //  inc=false

      var Q=parseFloat(value.Total)+parseFloat(value.rate);
      console.log("cpo"+value.Total+" fdv "+value.rate)
    texclusive.details.push({Description:value.Description,Total:Q,tax:value.tax,Account:value.Account,type2:value.type2,rate:value.rate})
    }
    else{
    //    this.setState({incl:true})
  //    inc=true
    texclusive.details.push({Description:value.Description,Total:value.Total,tax:value.tax,Account:value.Account,type2:value.type2,rate:value.rate})
  }
  })
  var e=texclusive.details;
  console.log("konnect"+JSON.stringify(e));
  this.setState({account:e} );








}
    componentDidMount() {

this.setState ( { loaded: false});
   // document.getElem  entById("date").value = "2014-02-09";
        axios.all([
        axios.get(url),
        axios.get('http://13.126.134.204:4000/purchase/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/')
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
//          inc=invoice.data.IsTaxInclusive;

         if(mm==null){
         //var resm = mm.split("T");
         this.setState({stotal:sub_total,totx:tax_total,balamount:yu,tmo:g,prom:null});
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
       document.getElementById('SupplierInvoiceNumber').value=SI;
       document.getElementById('Memo').value=memo;
       document.getElementById('note1').value=myadd;
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
var mt=acc[k].TaxCode.Code;
//console.log("got hit"+mt)
if(mt=="GST"){
mt=11;
money_tax[acc[k].Description]=(parseInt(acc[k].Total)/mt).toFixed(2);
console.log("got hit"+money_tax[acc[k].Description])

sub_total=(parseFloat(sub_total)-parseFloat(money_tax[acc[k].Description])).toFixed(2)
//money[acc[k].Description]=parseFloat(sub_total);
var tr=parseFloat(acc[k].Total)-parseFloat(money_tax[acc[k].Description])
var tr1=parseFloat(acc[k].Total);
var details={Description:acc[k].Description,Account:acc[k].Account.Name,type2:acc[k].Job.Number,Total:tr,tax:acc[k].TaxCode.Code}
exclusive[acc[k].Description]={Description:acc[k].Description,Account:acc[k].Account.Name,type2:acc[k].Job.Number,Total:tr,tax:acc[k].TaxCode.Code,rate:money_tax[acc[k].Description]};
hashitems[acc[k].Description]={Description:acc[k].Description,Total:tr1,Account:{UID:acc[k].Account.UID},Job:{UID:acc[k].Job.UID},TaxCode:{UID:acc[k].TaxCode.UID}}
                accnt.push(details);
                console.log(JSON.stringify(acc[k]))
                raccnames[acc[k].Description]=acc[k].Account.Name;
              }
else{
mt=newhash[mt];
 money_tax[acc[k].Description]=0;
 // money_tax[acc[k].Description]=(parseInt(acc[k].Total)/mt).toFixed(2);
       sub_total=parseFloat(sub_total)-parseFloat(money_tax[acc[k].Description])
var tr=parseFloat(acc[k].Total)-parseFloat(money_tax[acc[k].Description])
var details={Description:acc[k].Description,Account:acc[k].Account.Name,type2:acc[k].Job.Number,Total:tr,tax:acc[k].TaxCode.Code}
exclusive[acc[k].Description]={Description:acc[k].Description,Account:acc[k].Account.Name,type2:acc[k].Job.Number,Total:tr,tax:acc[k].TaxCode.Code,rate:newhash[acc[k].TaxCode.Code]};
hashitems[acc[k].Description]={Description:acc[k].Description,Total:tr,Account:{UID:acc[k].Account.UID},Job:{UID:acc[k].Job.UID},TaxCode:{UID:acc[k].TaxCode.UID}}
                accnt.push(details);
                console.log(JSON.stringify(acc[k]))
                raccnames[acc[k].Description]=acc[k].Account.Name;
//currencies.push(acc[k].Account.Name)
          }      }


          this.setState({account:accnt,stotal:sub_total})


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
    if(acnames[k].Name!=""){
                acn.push(acnames[k].Name);
                currencies.push(acnames[k].Name)
            hashacct[acnames[k].Name]=acnames[k].UID
           hashtax[acnames[k].Name]=acnames[k].TaxCodeUID
         }
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
document.getElementById("Total").value=g;
document.getElementById("sub_total").value=sub_total;
document.getElementById("tax_per").value=tax_total;
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
     <button type="button" className="btn btn-primary" style={ { 'margin-left': '10'} }  onClick={ openModal }>Add Item</button>
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
    <textarea id="note" className="form-control col-md-3" style={{'height':'100px','width':'150px'} } value={"Supplier Name:"+this.state.cusname+"\nPurchase Number:"+this.state.invoiceid+"\nInvoice Date:"+this.state.datem+"\nTotal Amount:"+this.state.tamount} /><br></br>

<div>
<table>
<tr>
         <label for="supinvoice" style={{'padding-top':'10','margin-left':'50'}} >Supplier Invoice Number:</label>
<td>
<div style={{"margin-left":"10","padding-top":"10"}}>
        <input type="text" className="form-control"  id="SupplierInvoiceNumber"   placeholder="Supplier Invoice Number" />
     </div>
     </td>
</tr>
<tr>
         <label for="date" style={{'padding-top':'10','margin-left':'50'}}>Select Date:</label>

<td>
 <div style={{'margin-left':'10','padding-top':'10'}}>

  <input className="form-control" id="datenow" type="date"  max={p} onChange={this.handleChange} value={this.state.datem}/>
 </div>
 </td>
 </tr>
 </table>
 </div>
 <div style={{'margin-left':'160','padding-top':'40'}}>
 <Button bsStyle="success" onClick={handleClick}>Save</Button>
      </div>
              </div>
<br></br>
<div className="row">
<label for="note" style={{'padding-top':'10'}}>Ship To:</label>
<textarea id="note1" className="form-control col-md-3" style={{"height":"50px","width":"15%"} }  />
<label for="Terms" style={{ 'margin-left':'20','padding-top':'10'}}>Terms:</label>
    <input type="text" className="col-md-2 form-control"   style={{'height':'40','padding-top':'10','margin-left':'10'}} id="Terms"    value={this.state.ter}placeholder="TERMS" />
    <label style={{'margin-left':'20','padding-top':'10'}}><input type="checkbox" id="check" onClick={this.handleCheck}  />Tax Inclusive</label>
<label for="Journal Memo" style={{ 'margin-left':'30','padding-top':'10'}}>Journal Memo:</label>
<input type="text" className="col-md-2 form-control"   style={{'height':'40','padding-top':'10','margin-left':'20'}} id="Memo"  />


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
        <input type="text" className=" col-md-2 col-md-offset-7 form-control" disabled="disabled"  style={{ 'margin-left':'10'}} id="sub_total"   placeholder="Sub  Total"/>

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
<input type="text"  disabled="disabled" className="col-md-2 form-control" style={{"margin-left":"10"}}   id="tax_per"   placeholder="Tax"/>

</div>
<br/>

<div className="row">

<label for="customer">Bill Delivery Status:</label>
<select name="cars" id="dev_status" className="form-control col-md-2">
                   {this.state.dstatus}
</select>

<label for="customer" style={{"margin-left":"26%"}}>Total Amount:</label>
<input type="text" className="col-md-2 form-control" style={{"margin-left":"10"}}  disabled="disabled"  id="Total"   placeholder="Total Amount"/>
 <Button bsStyle="warning" onClick={handleClick1} style={{"margin-left":"8%"}}>Change to Bill</Button>


</div>

      </div>
      </Loader>

    );
  }
}



export default Editpurchase;
