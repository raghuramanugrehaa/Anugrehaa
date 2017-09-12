import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from "axios";



export  class Home extends Component {


///ajax  impeentation
constructor(props) {
   super(props);

   this.state = {
     posts: []
   };
}

componentDidMount() {
   axios.get(`http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Sale/Invoice/Service`,{headers: {
        "Authorization" : "Basic QWRtaW5pc3RyYXRvcjo=",
        "x-myobapi-version":"v2"
      }
    }).then(res => {

       const posts = res.data.Items;

       this.setState({posts});
//  console.log("checcd "+JSON.stringify(this.state.posts));
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
  	return (
    	<button type="button" className="form-control   btn btn-primary"
     >
      	EDIT
      </button>
    )
  }
  cellButton1(cell, row, enumObject, rowIndex) {
    	return (
      	<button type="button" className="form-control   btn btn-primary">
PAYMENT
        </button>
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
          insertRow
          exportCSV
          search
          deleteRow
          pagination>
          <TableHeaderColumn dataField='Number' isKey={ true }>Invoice ID</TableHeaderColumn>
          <TableHeaderColumn dataField='UID'>Customer Name</TableHeaderColumn>
          <TableHeaderColumn dataField='TotalAmount'>Price</TableHeaderColumn>
          <TableHeaderColumn dataField='Status'>status</TableHeaderColumn>
          <TableHeaderColumn dataField='Date'>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='button'dataFormat={this.cellButton.bind(this)}>EDIT INVOICE</TableHeaderColumn>
          <TableHeaderColumn dataField='button'dataFormat={this.cellButton1.bind(this)}>PAYMENT </TableHeaderColumn>




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