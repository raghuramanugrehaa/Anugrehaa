import React from "react";
import {Button} from 'react-bootstrap';
import axios from "axios";
import Loader from 'react-loader';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var termhash={};


const queryString = require('query-string');

class Payments extends React.Component {


 constructor(props) {
     super(props);
          this.handleChange = this.handleChange.bind(this);
    this.state = {
       posts: [],



     };
  }
  handleChange(event) {
    // this.setState({datem: event.target.value});

var id = document.getElementById('supplier').value;
var r_data =[];

     this.setState ({ loaded: false});


          axios.get('http://13.126.134.204:4000/purchase/payment/e3152784-4811-4f2e-9a4f-884f3439db90/supplierPayments/'+id)

        .then(res =>{
                    this.setState  ({ loaded: true});
     console.log("data"+JSON.stringify(res));
     var name=res.data.Items;




     for (var y=0;y<name.length;y++){
var kl=name[y].Lines;
for(var e=0;e<kl.length;kl++)
     r_data.push({Description:kl[e].Description,Total:kl[e].Total})

     }

     this.setState({r_d:r_data});
  r_data=[];
   });


  }

    componentDidMount() {
    this.setState ({ loaded: false});
    var arrTen = [];
      axios.get('http://13.126.134.204:4000/purchase/dependencies/e3152784-4811-4f2e-9a4f-884f3439db90/')
        .then(res => {
		             this.setState  ({ loaded: true});

               var result=res.data.Suppliers;
                for (var k = 0; k < result.length; k++) {
                  if(k==0){
                    arrTen.push(<option value="Select Supplier">Select Supplier  </option>);

                       arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
                              // termhash[result[k].UID]=result[k].PaymentIsDue;


                             }
                             else{

                               arrTen.push(<option key={result[k].UID} value={result[k].UID}> {result[k].Name} </option>);
                                     //  termhash[result[k].UID]=result[k].PaymentIsDue;
                             }
                   }
this.setState({pos:arrTen})


        })
}
  render() {


const options = {

         defaultSortName: 'Date',  // default sort column name
              defaultSortOrder: 'desc'  // default sort order
      };


    return (
	          <Loader loaded={this.state.loaded}>

 <div className="container">
 <div className="row">
<label for="supplier" style={{'padding-top':'10'}}>Select Supplier: </label>
          <select  name="cars"  className="col-md-2 form-control" id="supplier" style={{'padding-left':'10'}}  onChange={this.handleChange}>
{this.state.pos}
</select>

<label for="date"  style={{'padding-top':'10', 'padding-left':'5%'}}>Payment date:</label>
     <input className="form-control col-md-2" id="date"  type="date"   style={{"height":"40"}}/>
<label for="cheque" style={{'padding-top':'10', 'padding-left':'5%'}}>Cheque No: </label>
    <input type="text" className="form-control col-md-2"  style={{'padding-left':'10','height':'40'}} id="cheque"   placeholder="Enter cheque No" />
<div style={{'margin-left':'40'}}>
 <Button bsStyle="success" >Save</Button>
      </div>
</div>
<br></br>
<div className="form-inline">
     <label for="payee">Payee:</label>
<p id='payee'></p>
<label for="memo" style={{'padding-top':'10', 'padding-left':'15%'}}>Memo: </label>
<p id="Memo"> </p>

          <label for="Amount" style={{'padding-top':'10', 'padding-left':'25%'}} >Amount:</label>
              <input type="number" className="form-control col-md-2"  style={{'padding-left':'10'}} id="Amount"   placeholder="Enter Amount" />

</div>
<br></br>

<BootstrapTable   data={this.state.r_d}>

                <TableHeaderColumn width="30%" dataField='Description' isKey={true}  >Supplier Invoice Number</TableHeaderColumn>
                 <TableHeaderColumn width="30%"  dataField='Date'   >Date</TableHeaderColumn>
                 <TableHeaderColumn width="30%" dataField='Total' editable={true } dataAlign="Center" >Amount</TableHeaderColumn>
                  <TableHeaderColumn width="30%" dataField='Amount' editable={true } dataAlign="Center" >Discount</TableHeaderColumn>
                    <TableHeaderColumn width="30%" dataField='Amount' editable={true } dataAlign="Center" >Total owed</TableHeaderColumn>
                <TableHeaderColumn width="30%" dataField='Amount' editable={true } dataAlign="Center" >Amount Applied</TableHeaderColumn>

           </BootstrapTable>

  <br></br>
<div className="row">
     <label for="Delivary" style={{'padding-top':'10'}} >Remittance Advice devilary status:</label>
<select  name="cars"  className="col-md-2 form-control" id="supplier" style={{'padding-left':'10'}} >
          <option>hii</option>
           <option>i</option>
</select>

     <label for="Total Applied" style={{'padding-left':'4%','padding-top':'10'}} >Total Applied:</label>
     <input type="number" className="form-control col-md-2"  style={{'padding-left':'10'}} id="Amount Applied"  disabled='disabled' />

          <label for="Finance " style={{'padding-left':'4%','padding-top':'10'}} >Finance Charge:</label>
               <input type="number" className="form-control col-md-2"  style={{'padding-left':'10'}} id='finance' placeholder="Enter Amount"   />
</div>
<br></br>
<div className="row">
          <label for="out balance " style={{'padding-left':'41%','padding-top':'10'}} >Out of Balance:</label>
                         <input type="number" className="form-control col-md-2"  style={{'padding-left':'10'}} id='out bal'  disabled='disabled'  />



          <label for="Total " style={{'padding-left':'4%','padding-top':'10'}} >Total Paid:</label>
                         <input type="number" className="form-control col-md-2"  style={{'padding-left':'20'}} id='total' disabled='disabled'   />




</div>
      </div>
      </Loader>
	  );
  }
}



export default Payments;