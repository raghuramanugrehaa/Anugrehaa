import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';

const queryString = require('query-string');
var start;
var end;
var url="";
var accrecv;
var wage=[];
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

function squash(arr){
    var tmp = [];
    for(var i = 0; i < arr.length; i++){
        if(tmp.indexOf(arr[i]) == -1){
        tmp.push(arr[i]);
        }
    }
    return tmp;
}

function onAfterSaveCell(row,cellName,cellValue){
var g=row.name+cellName

if(typeof row.cellName=="undefined"){
console.log("im un"+cellValue+" m "+cellName)
checkHash[g]=cellValue;
if(typeof row.Hours=="undefined")
row.Hours=parseInt(cellValue);
else
row.Hours=parseInt(cellValue)+parseInt(row.Hours);
}
else{
var kl=parseInt(checkHash[g]);
console.log("lop"+kl)
var t=parseInt(row.Hours)-kl;
row.Hours=t+parseInt(cellValue);
checkHash[g]=cellValue
}
}

class Newinvoice extends React.Component {



  constructor(props) {
     super(props);
     this.handleClick = this.handleClick.bind(this);
    const parsed = queryString.parse(this.props.location.search);
      ids=parsed.id;
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
if(customer==="")
{

alert("Select customer");

}
else{
 if (date==="")
 {
 alert("select date");
 }
 else{

 if(Object.keys(checkHash).length===0)
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
console.log("yes"+ customer);
console.log("no"+date);
this.setState ( { loaded: true});
axios.post('http://13.126.189.91:4001/sales/e3152784-4811-4f2e-9a4f-884f3439db90/invoices',{Date:date,Customer:{UID:customer},Lines:klk})
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
  this.setState ({ loaded: false});
       axios.all([

       axios.get('http://13.126.189.91:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet/'+ids),
       axios.get('http://13.126.189.91:4001/timesheet/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90')
     ]).then(axios.spread((res,dep) =>{
		             this.setState  ({ loaded: true});
console.log("data"+JSON.stringify(res));
var name=res.data.Employee.Name;
start=res.data.StartDate;
end=res.data.EndDate;

console.log("data"+start+" "+end)
this.setState({name:name,start:start,end:end});


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
mcat.push(er);

}


}

}
var r=new Date(start);
var n = r.getDate();
console.log("lo"+n)
this.setState({wage1:wage,mcat1:mcat})
this.setState({day1:n})

  }));



 }

  render() {


    return (
	          <Loader loaded={this.state.loaded}>

<div className="container">
 <div className="row">
 <label for="note" style={{'padding-top':'40'}}>Employee Details:</label>
    <textarea id="note" className="form-control col-md-4" style={{"height":"100px","width":"280"} } value={"Employee Name:"+this.state.name+"\nStart Date:"+this.state.start+"\nEndDate:"+this.state.end}/>

<div>
<table>
<tr>

</tr>
<tr>
<td>
 <div style={{'margin-left':'150','padding-top':'10'}}>
  <input className="form-control" id="datenow" type="date"   onChange={this.handleChange} value={this.state.datem}/>
 </div>
 </td>
 </tr>
 </table>
 </div>
</div>
                               <br></br>
                               <br></br>
<BootstrapTable data={ this.state.mcat1 } cellEdit={ cellEditProp }>
          <TableHeaderColumn width="60%" dataField='name' isKey={true} editable={ { type: 'select', options: {values: this.state.wage1} } } >Wage   Type</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day1' >Day {this.state.day1}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day2' >Day {this.state.day1+1}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day3' >Day {this.state.day1+2}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day4' >Day {this.state.day1+3}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day5' >Day {this.state.day1+4}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day6' >Day {this.state.day1+5}</TableHeaderColumn>
          <TableHeaderColumn width="20%" dataField='day7' >Day {this.state.day1+6}</TableHeaderColumn>
           <TableHeaderColumn width="30%" dataField='Hours' editable={true } dataAlign="Center">Total HRS</TableHeaderColumn>


      </BootstrapTable>
	  


</div>
</Loader>

    );
  }
}


export default Newinvoice;