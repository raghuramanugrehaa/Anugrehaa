import React from "react";
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Dropdown from 'react-toolbox/lib/dropdown';
import {FormControl, FormGroup,Button} from 'react-bootstrap';

const countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];

class Demo extends React.Component {
  state = { value: 'ES-es' };

  handleChange = (value) => {
    this.setState({value: value});
  };

  render () {

    return (
    <div>
    <div className ="row">
    <div className="row col-md-6">
     <FormControl
         disabled
         type="text"
         placeholder="Enter text"
         onChange={this.handleChange}
       />
       </div>
        <div className="col-xl-16">
               <div class="text-right">
       <Button bsStyle="success">Success</Button>
       </div>
       </div>
       </div>
       <select name="cars">
         <option value="volvo">Volvo</option>
         <option value="saab">Saab</option>
         <option value="fiat">Fiat</option>
         <option value="audi">Audi</option>
       </select>
      <Dropdown
        auto
        onChange={this.handleChange}
        source={countries}
        value={this.state.value}
      />
      </div>
    );
  }
}
export default Demo;