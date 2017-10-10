import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from "axios";
import Loader from 'react-loader';

var p="/payment";

export  class Home extends Component {


///ajax  impeentation
constructor(props) {
   super(props);

   this.state = {
     posts: []
   };
}

componentDidMount() {
	this.setState ( { loaded: false});
   axios.get(`http://13.126.189.91:3001/sales/e3152784-4811-4f2e-9a4f-884f3439db90/invoices`
   ).then(res => {

       const posts = res.data.Items;

       this.setState({posts});
	          this.setState  ({ loaded: true});
//console.log("checcd "+JSON.stringify(this.state.posts));
     });
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
 if(x==="Credit" || x==="Closed"){
     	return (

 //<a href="index.html" style={{color:'grey',cursor:'default','pointer-events':'none'}}>PAYMENT</a>
 <a href={"/payment/?id="+pp} style={{color:'grey',cursor:'default','pointer-events':'none'}} ><input type="button" className="btn" value="EDIT"/></a>
       )
       }
       else{
       return(
     //  <input type="button" value="Payment" className="btn btn-primary" onclick={"window.location.href=/payment/?id="+pp} />
 <a href={"/invoice/?id="+pp} ><input type="button" className="btn btn-info" value="Edit"/></a>
    //   <a class="btn btn-primary" href={"/payment/?id="+pp} role="button"> PAYMENT</a>

       )

       }
  }
  cellButton1(cell, row, enumObject, rowIndex) {
  var oo={cell};
  var pp=oo.cell;
  var x=row.Status;
  if(x==="Credit" || x==="Closed"){
    	return (

//<a href="index.html" style={{color:'grey',cursor:'default','pointer-events':'none'}}>PAYMENT</a>
<a href={"/payment/?id="+pp} style={{color:'grey',cursor:'default','pointer-events':'none'}} ><input type="button" className="btn" value="Payment"/></a>
      )
      }
      else{
      return(
    //  <input type="button" value="Payment" className="btn btn-primary" onclick={"window.location.href=/payment/?id="+pp} />
<a href={"/payment/?id="+pp} ><input type="button" className="btn btn-primary" value="Payment"/></a>
   //   <a class="btn btn-primary" href={"/payment/?id="+pp} role="button"> PAYMENT</a>

      )

      }
    }

      cellButton2(cell, row, enumObject, rowIndex) {
            var oo={cell};
           var pp=oo.cell.Name;

            console.log("name is"+pp)
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
		  clearSearch: true,
        toolBar: this.createCustomToolBar,
         defaultSortName: 'Status',  // default sort column name
              defaultSortOrder: 'desc'  // default sort order
      };


      return (
	  	          <Loader loaded={this.state.loaded}>

<div className="column">


<div className="col-md-offset-6">
<div className="text-right">
              <a href={"/newinvoice"} className ><input type="button"  className="btn btn-success col-md-offset-3" value="New Invoice"/></a>
</div>
</div>
<div style={{"padding-bottom":"-150px"}}>


<BootstrapTable data={ this.state.posts } options={ options }     search  searchPlaceholder='search Invoice' pagination  striped hover condensed>
         <TableHeaderColumn width="9%"  dataAlign="center" dataField='Number' isKey={ true }>Invoice ID</TableHeaderColumn>
                   <TableHeaderColumn width="15%"  dataAlign="center" dataField='Customer' dataFormat={this.cellButton2.bind(this)}>Store  Name</TableHeaderColumn>
                   <TableHeaderColumn  width="10%" dataAlign="center" dataField='TotalAmount'>Total Sales</TableHeaderColumn>
                    <TableHeaderColumn width="16%"  dataAlign="center" dataField='BalanceDueAmount'>Balance Due Amount</TableHeaderColumn>
                    <TableHeaderColumn  width="10%"  dataAlign="center" dataField='Status' >Status</TableHeaderColumn>
                   <TableHeaderColumn  width="16%" dataAlign="center" dataField='Date'> Invoice Date</TableHeaderColumn>

                   <TableHeaderColumn  width="15%"  dataAlign="center" dataField='UID'dataFormat={this.cellButton.bind(this)}>Edit Invoice</TableHeaderColumn>
                   <TableHeaderColumn   width="10%" dataAlign="center" dataField='UID'dataFormat={this.cellButton1.bind(this)}>Payment </TableHeaderColumn>
      </BootstrapTable>
</div>
</div>
</Loader>


      );
    }
  }
  ReactDOM.render(
    <Home subreddit="reactjs"/>,
    document.getElementById('root')
  );
export default Home;