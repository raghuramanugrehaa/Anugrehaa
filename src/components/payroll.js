import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from "axios";
import Loader from 'react-loader';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
var sdate;
var edate;
var p="/payment";
var Lines = {
    details: []
};
function getWeek(today){
  var result;
  var dayOfWeekStartingSundayZeroIndexBased = today.getDay(); // 0 : Sunday ,1 : Monday,2,3,4,5,6 : Saturday
  result=new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+1);


 return result;
}
export  class Payroll extends Component {


///ajax  impeentation
constructor(props) {
   super(props);

   this.state = {
     posts: []
   };
    this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
}

handleClick(e){
e.preventDefault();
this.setState ( { loaded: false});
var R_date=document.getElementById('date').value;
var g=getWeek(new Date(R_date));
var f=g.getMonth()+1;
R_date=g.getDate()+"-"+f+"-"+g.getFullYear();
console.log("get"+g);
axios.get('http://13.126.134.204:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet?StartDate='+R_date
).then(res => {
  var data = res.data.Items;
var acc=[];
  for(var i=0;i<data.length;i++)
{
  var hr=0;
  var rm=data[i].Lines;
  if(rm.length>0){
     for(var r=0;r<rm.length;r++){
    			   var km=data[i].Lines[r].Entries;
    			    for(var j=0;j<km.length;j++){
    		     hr+=  data[i].Lines[r].Entries[j].Hours;
    	   }
}
  }

  var em={employee:data[i].Employee.Name,StartDate:data[i].StartDate,EndDate:data[i].EndDate,hour:hr,UID:data[i].Employee.UID};
var tem=data[i].StartDate.split("T");
var pem=data[i].EndDate.split("T");
sdate=tem[0];
edate=pem[0];

console.log("i am date"+sdate);
this.setState({stdate:sdate})
              this.setState({endate:edate});
  acc.push(em);
}
//  console.log("chek"+acc);
       this.setState  ({ loaded: true});
   this.setState({posts:acc});
this.setState({stdate:R_date});
});



}

handleChange(event) {
    this.setState({spdate: event.target.value});
  }
componentDidMount() {
	this.setState ( { loaded: false});
   axios.get(`http://13.126.134.204:4001/timesheet/e3152784-4811-4f2e-9a4f-884f3439db90/payroll/timesheet`
   ).then(res => {

       var data = res.data.Items;
var acc=[];
       for(var i=0;i<data.length;i++)
	   {
		   var hr=0;
		   var rm=data[i].Lines;
		   if(rm.length>0){
		   for(var r=0;r<rm.length;r++){
			   var km=data[i].Lines[r].Entries;
			    for(var j=0;j<km.length;j++){
		     hr+=  data[i].Lines[r].Entries[j].Hours;
	   }
		   }
}
		   var em={employee:data[i].Employee.Name,StartDate:data[i].StartDate,EndDate:data[i].EndDate,hour:hr,UID:data[i].Employee.UID};
var tem=data[i].StartDate.split("T");
var pem=data[i].EndDate.split("T");
sdate=tem[0];
edate=pem[0];

		   acc.push(em);
	   }
	 //  console.log("chek"+acc);
	          this.setState  ({ loaded: true});
			  this.setState({posts:acc});
			  this.setState({stdate:sdate});
			  			  this.setState({spdate:sdate});
              this.setState({endate:edate});

//console.log("checcd "+JSON.stringify(this.state.posts));
     });
//document.getElementById("Startdate").value=sdate;
 }



    createCustomToolBar = props => {
      return (

        <div style={ { margin: '19px' } }>
          { props.components.btnGroup }
          <div className='col-xs-9 col-sm-5 col-md-12 col-lg-10'>


            { props.components.searchPanel }

          </div>

        </div>


      );
    }


  cellButton(cell, row, enumObject, rowIndex) {
  var oo={cell};
  var pp=oo.cell;
    var x=row.Status;

return(
     //  <input type="button" value="Payment" className="btn btn-primary" onclick={"window.location.href=/payment/?id="+pp} />
 <a><Link to ={"/editpayroll/?id="+pp+"&date="+sdate} ><input type="button" className="btn btn-info" value="Edit"/></Link></a>
    //   <a class="btn btn-primary" href={"/payment/?id="+pp} role="button"> Delete</a>
)



  }
  cellButton1(cell, row, enumObject, rowIndex) {
  var oo={cell};
  var pp=oo.cell;
  var x=row.Status;
  if(x==="Credit" || x==="Closed"){
    	return (

//<a href="index.html" style={{color:'grey',cursor:'default','pointer-events':'none'}}>PAYMENT</a>
<a>< Link to={"/payment/?id="+pp} style={{color:'grey',cursor:'default','pointer-events':'none'}} ><input type="button" className="btn" value="Delete"/></Link></a>
      )
      }
      else{
      var t=row.Customer.Name;
      return(

    //  <input type="button" value="Payment" className="btn btn-primary" onclick={"window.location.href=/payment/?id="+pp} />
<a><Link to  ={"/payment/?id="+pp+"&&name="+t} ><input type="button" className="btn btn-primary" value="Delete"/></Link></a>
   //   <a class="btn btn-primary" href={"/payment/?id="+pp} role="button"> Delete</a>

      )

      }
    }

      cellButton2(cell, row, enumObject, rowIndex) {
            var oo={cell};
           var pp=oo.cell.Name;

           // console.log("name is"+pp)
            	return (


              <p>{pp}</p>

              )
            }

    render() {
//console.log("ffinal "+this.state.posts);

      const selectRow = {
        mode: 'checkbox',
        showOnlySelected: true
      };
      const options = {

       toolBar: this.createCustomToolBar,
         //defaultSortName: 'Status',  // default sort column name
           //   defaultSortOrder: 'desc'  // default sort order
      };


      return (
	  	          <Loader loaded={this.state.loaded}>
<div className="container">
<div className="row">
<label for="date" style={{"margin-left":"10%",'padding-top':'10'}}>Select Date:</label>
<input className="form-control col-md-2" id="date" placeholder="Select Date" type="date" max={p}  style={{"margin-left":"10"}} onChange={this.handleChange} value ={this.state.spdate}/>
<Button bsStyle="success" onClick={this.handleClick} style={{"margin-left":"40"}}>Get Details</Button>
<label for="dateshow" style={{"margin-left":"15%",'padding-top':'10'}}>Payroll for the week :{this.state.stdate}</label>
<label for="dateshow" style={{"margin-left":"10",'padding-top':'10'}}> To :{this.state.endate}</label>









</div>
<BootstrapTable  style={{"padding-top":"-5%"}} data={ this.state.posts } options={ options }     search  searchPlaceholder='Search by Employee ' pagination  striped hover condensed>
         <TableHeaderColumn width="15%"  dataAlign="center" dataField='employee' isKey={ true }>Employee</TableHeaderColumn>
				   <TableHeaderColumn width="10%"  dataAlign="center" dataField='hour'>Total Hours</TableHeaderColumn>
				   <TableHeaderColumn  width="10%"  dataAlign="center" dataField='UID' dataFormat={this.cellButton.bind(this)}>Edit </TableHeaderColumn>


      </BootstrapTable>

</div>
</Loader>


      );
    }
  }
  ReactDOM.render(
    <Payroll subreddit="reactjs"/>,
    document.getElementById('root')
  );
export default Payroll;
