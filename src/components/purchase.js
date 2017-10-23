import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from "axios";
import Loader from 'react-loader';
import { Link } from 'react-router-dom';


var p="/payment";

export  class Purchase extends Component {


///ajax  impeentation
constructor(props) {
   super(props);

   this.state = {
     posts: []
   };
}

componentDidMount() {
	this.setState ( { loaded: false});
   axios.get(`http://13.126.189.91:4000/purchase/e3152784-4811-4f2e-9a4f-884f3439db90/order`
   ).then(res => {

       const posts = res.data.Items;

       this.setState({posts});
	          this.setState  ({ loaded: true});
//console.log("checcd "+JSON.stringify(posts));
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
 <a><Link to={"/Editpurchase/?id="+pp} style={{color:'grey',cursor:'default','pointer-events':'none'}} ><input type="button" className="btn" value="EDIT"/></Link></a>
       )
       }
       else{
       return(
     //  <input type="button" value="Payment" className="btn btn-primary" onclick={"window.location.href=/payment/?id="+pp} />
 <a><Link to={"/Editpurchase/?id="+pp} ><input type="button" className="btn btn-info" value="Edit"/></Link></a>
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
<a><Link to={"/Purchasepayment/?id="+pp} style={{color:'grey',cursor:'default','pointer-events':'none'}} ><input type="button" className="btn" value="Payment"/></Link></a>
      )
      }
      else{
            var t=row.Supplier.Name;
      return(
    //  <input type="button" value="Payment" className="btn btn-primary" onclick={"window.location.href=/payment/?id="+pp} />
<a><Link to={"/Purchasepayment/?id="+pp+"&&name="+t} ><input type="button" className="btn btn-primary" value="Payment"/></Link></a>
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
              <a><Link to ={"/Newpurchase"} className ><input type="button"  className="btn btn-success col-md-offset-3" value="New Purchase"/></Link></a>
</div>
</div>
<div style={{"padding-bottom":"-150px"}}>


<BootstrapTable data={ this.state.posts } options={ options }     search  searchPlaceholder='search Purchase' pagination  striped hover condensed>
         <TableHeaderColumn width="9%"  dataAlign="center" dataField='Number' isKey={ true }>Invoice ID</TableHeaderColumn>
                  <TableHeaderColumn width="12%"  dataAlign="center" dataField='SupplierInvoiceNumber'>Supplier Invoice</TableHeaderColumn>

                   <TableHeaderColumn width="15%"  dataAlign="center" dataField='Supplier' dataFormat={this.cellButton2.bind(this)}>Supplier  Name</TableHeaderColumn>
                   <TableHeaderColumn  width="10%" dataAlign="center" dataField='TotalAmount'>Total Sales</TableHeaderColumn>
                    <TableHeaderColumn width="16%"  dataAlign="center" dataField='BalanceDueAmount'>Balance Due Amount</TableHeaderColumn>
                    <TableHeaderColumn  width="10%"  dataAlign="center" dataField='Status' >Status</TableHeaderColumn>
                   <TableHeaderColumn  width="16%" dataAlign="center" dataField='Date'> Invoice Date</TableHeaderColumn>
     <TableHeaderColumn  width="15%"  dataAlign="center" dataField='UID'dataFormat={this.cellButton.bind(this)}>Edit Purchase</TableHeaderColumn>
                        <TableHeaderColumn   width="10%" dataAlign="center" dataField='UID'dataFormat={this.cellButton1.bind(this)}>Payment </TableHeaderColumn>




      </BootstrapTable>
</div>
</div>
</Loader>


      );
    }
  }
  ReactDOM.render(
    <Purchase subreddit="reactjs"/>,
    document.getElementById('root')
  );
export default Purchase;