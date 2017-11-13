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
if(row.day1=="")
row.day1=0;
if(row.day2=="")
row.day2=0;
if(row.day3=="")
row.day3=0;
if(row.day4=="")
row.day4=0;
if(row.day5=="")
row.day5=0;
if(row.day6=="")
row.day6=0;
if(row.day7=="")
row.day7=0;

row.Hours=parseInt(row.day1)+parseInt(row.day2)+parseInt(row.day3)+parseInt(row.day4)+parseInt(row.day5)+parseInt(row.day6)+parseInt(row.day7)

checkHash[row.name]={PayrollCategory:{UID:l},Entries:[{Date:d0,Hours:row.day1,Processed:false},{Date:d1,Hours:row.day2,Processed:false},{Date:d2,Hours:row.day3,Processed:false},{Date:d3,Hours:row.day4,Processed:false},{Date:d4,Hours:row.day5,Processed:false},{Date:d5,Hours:row.day6,Processed:false},{Date:d6,Hours:row.day7,Processed:false}]}
console.log("afterSaveCell"+JSON.stringify(checkHash[row.name]))


}
function onAfterDeleteRow(rowKeys) {


  alert('The sale you are deleting is: ' + rowKeys);
delete checkHash[rowKeys];


}

function onAfterSaveCell(row,cellName,cellValue){
  var l=catHash[row.name];
  if(row.day1=="")
  row.day1=0;
  if(row.day2=="")
  row.day2=0;
  if(row.day3=="")
  row.day3=0;
  if(row.day4=="")
  row.day4=0;
  if(row.day5=="")
  row.day5=0;
  if(row.day6=="")
  row.day6=0;
  if(row.day7=="")
  row.day7=0;

  row.Hours=parseInt(row.day1)+parseInt(row.day2)+parseInt(row.day3)+parseInt(row.day4)+parseInt(row.day5)+parseInt(row.day6)+parseInt(row.day7)
  checkHash[row.name]={PayrollCategory:{UID:l},Entries:[{Date:d0,Hours:row.day1,Processed:false},{Date:d1,Hours:row.day2,Processed:false},{Date:d2,Hours:row.day3,Processed:false},{Date:d3,Hours:row.day4,Processed:false},{Date:d4,Hours:row.day5,Processed:false},{Date:d5,Hours:row.day6,Processed:false},{Date:d6,Hours:row.day7,Processed:false}]}
  var x = row.Hours;
    console.log("iam" +x);
  console.log("afterSaveCell"+JSON.stringify(checkHash[row.name]))


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
axios.put('http://13.126.134.204:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet/'+ids,{Employee:{UID:ids},StartDate:d0,EndDate:d6,Lines:klk})
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

        axios.get('http://13.126.134.204:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet/'+ids+"?StartDate="+d0),
        axios.get('http://13.126.134.204:4001/timesheet/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90')
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

       axios.get('http://13.126.134.204:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet/'+ids+"?StartDate="+d0),
       axios.get('http://13.126.134.204:4001/timesheet/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90')
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

}
this.setState({r_d:r_data});
this.setState({tat:tot});


r_data=[];




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

  render() {
    const options = {
      afterInsertRow: onAfterInsertRow,
      afterDeleteRow: onAfterDeleteRow

     }

    return (
	          <Loader loaded={this.state.loaded}>

<div className="container">
<div className="row">
<label for="note" style={{'padding-top':'40'}}>Employee Details:</label>
   <textarea id="note" className="form-control col-md-4" style={{"height":"100px","width":"280"} } value={"Employee Name:"+this.state.name} /><br></br>
<div style={{'margin-left':'10%','padding-top':'40'}}>
 <input className="form-control" id="datenow" type="date"  onChange={this.handleChange} value={this.state.datem}/>

</div>


<div style={{'margin-left':'10%','padding-top':'40'}}>
<Button bsStyle="success" onClick={this.handleClick}>Save</Button>
     </div>
             </div>
                               <br></br>
                               <br></br>
<BootstrapTable data={this.state.r_d} cellEdit={ cellEditProp } deleteRow selectRow={ selectRowProp } options={ options } insertRow>
          <TableHeaderColumn width="60%" dataField='name' isKey={true} editable={ { type: 'select', options: {values: this.state.wage1} } } >Wage   Type</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day1' >Day {this.state.s1}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day2' >Day {this.state.s2}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day3' >Day {this.state.s3}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day4' >Day {this.state.s4}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day5' >Day {this.state.s5}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day6' >Day {this.state.s6}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day7' >Day {this.state.s7}</TableHeaderColumn>
           <TableHeaderColumn width="40%" dataField='Hours' editable={true } dataAlign="Center">Total HRS ({this.state.tat})</TableHeaderColumn>


      </BootstrapTable>



</div>
</Loader>

    );
  }
}


export default Newinvoice;