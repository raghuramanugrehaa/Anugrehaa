import React from "react";
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {FormControl, FormGroup,Button} from 'react-bootstrap';
import axios from "axios";
const queryString = require('query-string');
var ids="";
var url="";
const jobtypes = [ 'USD', 'GBP', 'EUR' ];
const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

class Sale extends React.Component {


  constructor(props) {
     super(props);
     const parsed = queryString.parse(this.props.location.search);

ids=parsed.id;
url= "http://localhost:3001/sales/48b58bb2-e017-4368-87c4-1fe44c1334ca/invoices/"+ids;
console.log(ids);
     this.state = {
       posts: [],
       paramss:parsed.id
     };
  }

  componentDidMount() {

       axios.get(url
     ).then(res => {

       //  const posts = res.data.Items;
console.log(res.data);
        // this.setState({posts});
  //console.log("checcd "+JSON.stringify(this.state.posts));
       });
   }

  render() {

  var jobs = [{

             name: "ACCOUNT RECV",
             price: 14589
         },{

             name: "ACCOUNT SALES",
             price: 14758
         },{

                  name: "SHOP SALES (INCL GST)",
                  price: 96587
              },{

                       name: "FUEL SALE INC GST ",
                       price: 78456

                   },{

                            name: "LOTTO SALES ",
                            price: 25410
                        },{

                                 name: "FUEL SALES IN LTS",
                                 price: 50000
                             },
                             {

                               name: "LIQUOR SALES",
                               price: 50000
                                 },
                            {

                            name: "SHOP SALES (EXCL GST)",
                            price: 50000

                            }];


    return (
<div>

<div className="row">

<div className="row col-md-4">
     <select name="cars" className="form-control">
                   <option value="volvo">Volvo</option>
                   <option value="saab">Saab</option>
                   <option value="fiat">Fiat</option>
                   <option value="audi">Audi</option>
                 </select>

                 </div>
<div>
<input className="form-control col-md-12" type="date"/>
</div>
                 <div className="row-col-md-16">
                                       <div class="text-right">
                               <Button bsStyle="success">Submit</Button>
                               </div>
                               </div>

                               </div>
                               <br></br>
                               <br></br>
<BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ false  }>
          <TableHeaderColumn dataField='name' isKey={true} editable={false }>Sale Heads</TableHeaderColumn>
          <TableHeaderColumn dataField='type' editable={ { type: 'select', options: { values: jobtypes } } }>ACCOUNT NAME</TableHeaderColumn>
           <TableHeaderColumn dataField='price' editable={true }>SALE AMOUNT</TableHeaderColumn>
      </BootstrapTable>
</div>
    );
  }
}



export default Sale;