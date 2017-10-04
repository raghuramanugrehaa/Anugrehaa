import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from "axios";

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
   axios.get(`http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices`
   ).then(res => {

       const posts = res.data.Items;

       this.setState({posts});
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
     //  <input type="button" value="Payment" className="btn btn-info" onclick={"window.location.href=/payment/?id="+pp} />
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
    //  <input type="button" value="Payment" className="btn btn-info" onclick={"window.location.href=/payment/?id="+pp} />
<a href={"/payment/?id="+pp} ><input type="button" className="btn btn-info" value="Payment"/></a>
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
        toolBar: this.createCustomToolBar,
         defaultSortName: 'Status',  // default sort column name
              defaultSortOrder: 'desc'  // default sort order
      };


      return (
<div className="column">


<div className="col-md-offset-6">
<div className="text-right">
              <a href={"/newinvoice"} className ><input type="button"  className="btn btn-success col-md-offset-3" value="New Invoice"/></a>
</div>
</div>
<div style={{"padding-bottom":"-150px"}}>


<BootstrapTable data={ this.state.posts } options={ options }     search  searchPlaceholder='search Invoice' pagination  striped hover condensed>
         <TableHeaderColumn width="120"  dataAlign="center" dataField='Number' isKey={ true }>Invoice ID</TableHeaderColumn>
                   <TableHeaderColumn width="200"  dataAlign="center" dataField='Customer' dataFormat={this.cellButton2.bind(this)}>Store  Name</TableHeaderColumn>
                   <TableHeaderColumn  width="140" dataAlign="center" dataField='TotalAmount'>Total Sales</TableHeaderColumn>
                    <TableHeaderColumn width="180"  dataAlign="center" dataField='BalanceDueAmount'>Balance Due Amount</TableHeaderColumn>
                    <TableHeaderColumn  width="100"  dataAlign="center" dataField='Status' >Status</TableHeaderColumn>
                   <TableHeaderColumn  width="180" dataAlign="center" dataField='Date'> Invoice Date</TableHeaderColumn>

                   <TableHeaderColumn  width="150"  dataAlign="center" dataField='UID'dataFormat={this.cellButton.bind(this)}>Edit Invoice</TableHeaderColumn>
                   <TableHeaderColumn   width="100" dataAlign="center" dataField='UID'dataFormat={this.cellButton1.bind(this)}>Payment </TableHeaderColumn>
      </BootstrapTable>
</div>
</div>

      );
    }
  }
  ReactDOM.render(
    <Home subreddit="reactjs"/>,
    document.getElementById('root')
  );
export default Home;