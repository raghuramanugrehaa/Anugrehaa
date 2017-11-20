import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';

const queryString = require('query-string');
var tot=0;
var d0="";
var d1="";
var d2="";
var d3="";
var d4="";
var d5="";
var d6="";
var Lines = {
    details: []
};
var start;
var end;
var mdate;
var url="";
var accrecv;
var wage=[];
var r_data=[];
var mcat=[];
var myHash = {};
var catHash = {};
var checkHash={};
var tothash={};
var taxhash={};
var ids;
var Lines = {
    details: []
};
const cellEditProp = {
  mode: 'click',

  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

function getWeek(today){
  var result=[];
  var dayOfWeekStartingSundayZeroIndexBased = today.getDay(); // 0 : Sunday ,1 : Monday,2,3,4,5,6 : Saturday
  result.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+1));
  result.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+2));
  result.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+3));
  result.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+4));
  result.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+5));
  result.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+6));
  result.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+7));

 return result;
}



function onAfterInsertRow(row) {
var l=catHash[row.name];
if(row.day1==""){

row.day1=0;
}
if(row.day2==""){

row.day2=0;
}
if(row.day3=="")
{

row.day3=0;
}
if(row.day4=="")
{

row.day4=0;
}
if(row.day5=="")
{

row.day5=0;
}
if(row.day6=="")
{

row.day6=0;
}
if(row.day7=="")
{

row.day7=0;
}


if(row.day1>24){
alert("enter hours correctly");
row.day1=0;
}
if(row.day2>24){
alert("enter hours correctly");
row.day2=0;
}
if(row.day3>24)
{
alert("enter hours correctly");
row.day3=0;
}
if(row.day4>24)
{
alert("enter hours correctly");
row.day4=0;
}
if(row.day5>24)
{
alert("enter hours correctly");
row.day5=0;
}
if(row.day6>24)
{
alert("enter hours correctly");
row.day6=0;
}
if(row.day7>24)
{
alert("enter hours correctly");
row.day7=0;
}



row.Hours=parseInt(row.day1)+parseInt(row.day2)+parseInt(row.day3)+parseInt(row.day4)+parseInt(row.day5)+parseInt(row.day6)+parseInt(row.day7)
tot+=parseInt(row.Hours);
checkHash[row.name]={PayrollCategory:{UID:l},Entries:[{Date:d0,Hours:row.day1,Processed:false},{Date:d1,Hours:row.day2,Processed:false},{Date:d2,Hours:row.day3,Processed:false},{Date:d3,Hours:row.day4,Processed:false},{Date:d4,Hours:row.day5,Processed:false},{Date:d5,Hours:row.day6,Processed:false},{Date:d6,Hours:row.day7,Processed:false}]}
console.log("afterSaveCell"+JSON.stringify(checkHash[row.name]))
document.getElementById('total').value=tot;
tothash[row.name]=row.Hours;
}
function onAfterDeleteRow(rowKeys) {

for (var x=0;x<rowKeys.length;x++){
 // alert('The sale you are deleting is: ' + rowKeys);
delete checkHash[rowKeys[x]];
delete tothash[rowKeys[x]];

}
}

function onAfterSaveCell(row,cellName,cellValue){
  var l=catHash[row.name];
if(row.day1==""){

row.day1=0;
}
if(row.day2==""){

row.day2=0;
}
if(row.day3=="")
{

row.day3=0;
}
if(row.day4=="")
{

row.day4=0;
}
if(row.day5=="")
{

row.day5=0;
}
if(row.day6=="")
{

row.day6=0;
}
if(row.day7=="")
{

row.day7=0;
}


if(row.day1>24){
alert("enter hours correctly");
row.day1=0;
}
if(row.day2>24){
alert("enter hours correctly");
row.day2=0;
}
if(row.day3>24)
{
alert("enter hours correctly");
row.day3=0;
}
if(row.day4>24)
{
alert("enter hours correctly");
row.day4=0;
}
if(row.day5>24)
{
alert("enter hours correctly");
row.day5=0;
}
if(row.day6>24)
{
alert("enter hours correctly");
row.day6=0;
}
if(row.day7>24)
{
alert("enter hours correctly");
row.day7=0;
}

  row.Hours=parseInt(row.day1)+parseInt(row.day2)+parseInt(row.day3)+parseInt(row.day4)+parseInt(row.day5)+parseInt(row.day6)+parseInt(row.day7)
  checkHash[row.name]={PayrollCategory:{UID:l},Entries:[{Date:d0,Hours:row.day1,Processed:false},{Date:d1,Hours:row.day2,Processed:false},{Date:d2,Hours:row.day3,Processed:false},{Date:d3,Hours:row.day4,Processed:false},{Date:d4,Hours:row.day5,Processed:false},{Date:d5,Hours:row.day6,Processed:false},{Date:d6,Hours:row.day7,Processed:false}]}
  var x = row.Hours;
    console.log("iam" +x);
  console.log("afterSaveCell"+JSON.stringify(checkHash[row.name]))
var f = tothash[row.name];

 tot = parseInt(tot)-parseInt(f);
 tot+=parseInt(row.Hours);
 tothash[row.name]=row.Hours;
document.getElementById('total').value=tot;
}


//save
const selectRowProp = {
  mode: 'checkbox'
};
class Newinvoice extends React.Component {



  constructor(props) {
     super(props);
     this.handleClick = this.handleClick.bind(this);
       this.handleChange = this.handleChange.bind(this);
    const parsed = queryString.parse(this.props.location.search);
      ids=parsed.id;
      mdate=parsed.date;
     this.state = {
       posts: [],
       datem:"",
       accounts: [],
       salesheads:[]

     };
  }


 handleClick(e){
e.preventDefault();
//var R_date=document.getElementById('').v
Object.keys(checkHash).forEach(function (key) {
    var value = checkHash[key]
    var ll=value

  //  console.log("jhg"+value)
    Lines.details.push(ll)

    // iteration code
})


var klk=Lines.details;
axios.put('http://35.154.129.58:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet/'+ids,{Employee:{UID:ids},StartDate:d0,EndDate:d6,Lines:klk})
  .then(function (response) {
   console.log(response);
     window.location.assign('/payroll');
  })
  .catch(function (error) {
    console.log(error.response);
  });
}
handleChange(event) {
  // this.setState({datem: event.target.value});
   mdate= event.target.value;
   var week = getWeek(new Date(mdate));
   var f=week[0].getMonth()+1;
   d0=week[0].getFullYear()+"-"+f+"-"+week[0].getDate();
   f=week[1].getMonth()+1;
   d1=week[1].getFullYear()+"-"+f+"-"+week[1].getDate();
   f=week[2].getMonth()+1;
   d2=week[2].getFullYear()+"-"+f+"-"+week[2].getDate();
   f=week[3].getMonth()+1;
   d3=week[3].getFullYear()+"-"+f+"-"+week[3].getDate();
   f=week[4].getMonth()+1;
   d4=week[4].getFullYear()+"-"+f+"-"+week[4].getDate();
   f=week[5].getMonth()+1;
   d5=week[5].getFullYear()+"-"+f+"-"+week[5].getDate();
   f=week[6].getMonth()+1;
   d6=week[6].getFullYear()+"-"+f+"-"+week[6].getDate();

   this.setState({s1:week[0].getDate(),s2:week[1].getDate(),s3:week[2].getDate(),s4:week[3].getDate(),s5:week[4].getDate(),s6:week[5].getDate(),s7:week[6].getDate(),datem:mdate});


   this.setState ({ loaded: false});
        axios.all([

        axios.get('http://35.154.129.58:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet/'+ids+"?StartDate="+d0),
        axios.get('http://35.154.129.58:4001/timesheet/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90')
      ]).then(axios.spread((res,dep) =>{
                  this.setState  ({ loaded: true});
   console.log("data"+JSON.stringify(res));
   var name=res.data.Employee.Name;
   start=res.data.StartDate;
   end=res.data.EndDate;
   var we=res.data.Lines;

   for (var y=0;y<we.length;y++){
   var mm=we[y].Entries;
   checkHash[we[y].PayrollCategory.Name]={PayrollCategory:{UID:we[y].PayrollCategory.UID},Entries:[{Date:mm[0].Date,Hours:mm[0].Hours,Processed:mm[0].Processed},{Date:mm[1].Date,Hours:mm[1].Hours,Processed:mm[1].Processed},{Date:mm[2].Date,Hours:mm[2].Hours,Processed:mm[2].Processed},{Date:mm[3].Date,Hours:mm[3].Hours,Processed:mm[3].Processed},{Date:mm[4].Date,Hours:mm[4].Hours,Processed:mm[4].Processed},{Date:mm[5].Date,Hours:mm[5].Hours,Processed:mm[5].Processed},{Date:mm[6].Date,Hours:mm[6].Hours,Processed:mm[6].Processed}]}
   var ll=parseInt(mm[0].Hours)+parseInt(mm[1].Hours)+parseInt(mm[2].Hours)+parseInt(mm[3].Hours)+parseInt(mm[4].Hours)+parseInt(mm[5].Hours)+parseInt(mm[6].Hours)
   r_data.push({name:we[y].PayrollCategory.Name,day1:mm[0].Hours,day2:mm[1].Hours,day3:mm[2].Hours,day4:mm[3].Hours,day5:mm[4].Hours,day6:mm[5].Hours,day7:mm[6].Hours,Hours:ll})

   }
   this.setState({r_d:r_data});
r_data=[];
 }));


}

  componentDidMount() {
    var week = getWeek(new Date(mdate));
    console.log("KUCH"+week[6].getDate())
    var f=week[0].getMonth()+1;
    d0=week[0].getFullYear()+"-"+f+"-"+week[0].getDate();
  this.setState ({ loaded: false});
       axios.all([

       axios.get('http://35.154.129.58:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet/'+ids+"?StartDate="+d0),
       axios.get('http://35.154.129.58:4001/timesheet/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90')
     ]).then(axios.spread((res,dep) =>{
		             this.setState  ({ loaded: true});
console.log("data"+JSON.stringify(res));
var name=res.data.Employee.Name;
start=res.data.StartDate;
end=res.data.EndDate;



f=week[1].getMonth()+1;
d1=week[1].getFullYear()+"-"+f+"-"+week[1].getDate();
f=week[2].getMonth()+1;
d2=week[2].getFullYear()+"-"+f+"-"+week[2].getDate();
f=week[3].getMonth()+1;
d3=week[3].getFullYear()+"-"+f+"-"+week[3].getDate();
f=week[4].getMonth()+1;
d4=week[4].getFullYear()+"-"+f+"-"+week[4].getDate();
f=week[5].getMonth()+1;
d5=week[5].getFullYear()+"-"+f+"-"+week[5].getDate();
f=week[6].getMonth()+1;
d6=week[6].getFullYear()+"-"+f+"-"+week[6].getDate();


this.setState({name:name,s1:week[0].getDate(),s2:week[1].getDate(),s3:week[2].getDate(),s4:week[3].getDate(),s5:week[4].getDate(),s6:week[5].getDate(),s7:week[6].getDate(),datem:mdate});
//Already insertedd
var we=res.data.Lines;

for (var y=0;y<we.length;y++){
var mm=we[y].Entries;
checkHash[we[y].PayrollCategory.Name]={PayrollCategory:{UID:we[y].PayrollCategory.UID},Entries:[{Date:mm[0].Date,Hours:mm[0].Hours,Processed:mm[0].Processed},{Date:mm[1].Date,Hours:mm[1].Hours,Processed:mm[1].Processed},{Date:mm[2].Date,Hours:mm[2].Hours,Processed:mm[2].Processed},{Date:mm[3].Date,Hours:mm[3].Hours,Processed:mm[3].Processed},{Date:mm[4].Date,Hours:mm[4].Hours,Processed:mm[4].Processed},{Date:mm[5].Date,Hours:mm[5].Hours,Processed:mm[5].Processed},{Date:mm[6].Date,Hours:mm[6].Hours,Processed:mm[6].Processed}]}
var ll=parseInt(mm[0].Hours)+parseInt(mm[1].Hours)+parseInt(mm[2].Hours)+parseInt(mm[3].Hours)+parseInt(mm[4].Hours)+parseInt(mm[5].Hours)+parseInt(mm[6].Hours)
tot+=parseInt(ll);
console.log("iam tot "+tot);
console.log("ll "+ll)
r_data.push({name:we[y].PayrollCategory.Name,day1:mm[0].Hours,day2:mm[1].Hours,day3:mm[2].Hours,day4:mm[3].Hours,day5:mm[4].Hours,day6:mm[5].Hours,day7:mm[6].Hours,Hours:ll})
tothash[we[y].PayrollCategory.Name]=ll;

}

this.setState({r_d:r_data});




r_data=[];



document.getElementById('total').value=tot;
//filtering wage categories

var m=dep.data.employeePayrollDetails;
for(var i=0;i<m.length;i++){

if(ids==m[i].Employee.UID)
{

var ll=m[i].WageCategories;
wage=[];
mcat=[];
for(var k=0;k<ll.length;k++){

catHash[ll[k].Name]=ll[k].UID;

wage.push(ll[k].Name);
var er={name:ll[k].Name}
//mcat.push(er);

}


}

}
var r=new Date(start);
var n = r.getDate();
console.log("lo"+n)
this.setState({wage1:wage})
this.setState({day1:n})

  }));



 }


   createCustomInsertButton = (openModal) => {
     return (
      <button type="button" className="btn btn-primary" style={ { 'margin-left': '10'} }  onClick={ openModal}>Add Item</button>
     );
 }

  createCustomDeleteButton = (onBtnClick) => {
     return (
            <button type="button" className="btn btn-warning" style={ { 'margin-left': '10'} }  onClick={ onBtnClick }>Delete Item</button>

     );
   }

  render() {
    const options = {
      afterInsertRow: onAfterInsertRow,
      afterDeleteRow: onAfterDeleteRow,
             insertBtn:this.createCustomInsertButton,
        deleteBtn: this.createCustomDeleteButton

     }

    return (
	          <Loader loaded={this.state.loaded}>

<div className="container">
<div className="row">
<label for="note" style={{'padding-top':'20'}}>Employee Details:</label>
   <textarea id="note" className="form-control col-md-4" style={{"height":"60px","width":"100px"} } value={" Name:"+this.state.name} /><br></br>
                                                                                       <label for="date" style={{"margin-left":"8%",'padding-top':'10'}}>TimeSheet Start  Date:</label>
<input className="form-control col-md-2" id="datenow"  type="date"   style={{"margin-left":"10", 'height':'40'}} onChange={this.handleChange} value ={this.state.datem}/>

<div style={{'margin-left':'8%','padding-top':'10'}}>
<Button bsStyle="success" onClick={this.handleClick}>Save</Button>
     </div>
             </div>
                               <br></br>
                               <br></br>
<BootstrapTable data={this.state.r_d} cellEdit={ cellEditProp } deleteRow selectRow={ selectRowProp } options={ options } insertRow>
          <TableHeaderColumn width="60%" dataField='name' isKey={true} editable={ { type: 'select', options: {values: this.state.wage1} } } >Wage   Type</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day1' >Mon {this.state.s1}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day2' max='24' >Tue {this.state.s2}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day3' >Wed {this.state.s3}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day4' >Thu {this.state.s4}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day5' >Fri {this.state.s5}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day6' >Sat {this.state.s6}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day7' >Sun {this.state.s7}</TableHeaderColumn>
           <TableHeaderColumn width="40%" dataField='Hours' editable={true } dataAlign="Center">Total HRS </TableHeaderColumn>


      </BootstrapTable>

<br></br>
<br></br>
<div className="row">
<label for = "total" style={{'height':'40','padding-top':'10','margin-left':'66%'}} > Total Hours:</label>
< input type="number" className="col-md-2 form-control" style={{'height':'40','padding-top':'10','margin-left':'20'}} id="total" disabled="disable" />
</div>
</div>
</Loader>

    );
  }
}


export default Newinvoice;