import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
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
  	return (


    <a class="btn btn-primary form-control" href={"/invoice/?id="+pp} role="button">EDIT</a>

    )
  }
  cellButton1(cell, row, enumObject, rowIndex) {
  var oo={cell};
  var pp=oo.cell;
    	return (

      	<a class="btn btn-primary" href={"/payment/?id="+pp} role="button"> PAYMENT</a>
      )
    }

    render() {
//console.log("ffinal "+this.state.posts);

      const selectRow = {
        mode: 'checkbox',
        showOnlySelected: true
      };
      const options = {
        toolBar: this.createCustomToolBar
      };


      return (


 //{this.state.posts.data.Items.map(post =>
       <BootstrapTable data={ this.state.posts }
          options={ options }

          selectRow={ selectRow }
          exportCSV
          search
          pagination>
          <TableHeaderColumn dataField='Number' isKey={ true }>Invoice ID</TableHeaderColumn>
          <TableHeaderColumn dataField='UID'>Store  Name</TableHeaderColumn>
          <TableHeaderColumn dataField='BalanceDueAmount'>Price</TableHeaderColumn>
          <TableHeaderColumn dataField='Status'>status</TableHeaderColumn>
          <TableHeaderColumn dataField='Date'>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='UID'dataFormat={this.cellButton.bind(this)}>EDIT INVOICE</TableHeaderColumn>
          <TableHeaderColumn dataField='UID'dataFormat={this.cellButton1.bind(this)}>PAYMENT </TableHeaderColumn>

        </BootstrapTable>

//)}


      );
    }
  }
  ReactDOM.render(
    <Home subreddit="reactjs"/>,
    document.getElementById('root')
  );
export default Home;