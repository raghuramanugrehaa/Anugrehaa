import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sale from './sale';
import invoice from './editsale';
import payment from './Payment';
import newinvoice from './newsale';
import Purchase from './purchase';
import Newpurchase from './newpurchase';
import Editpurchase from './editpurchase';
import Purchasepayment from './purchasepayment';
import Billp from './billpurchase';
import Editbill from './editpurchasebill';
import Newbill from './newbill';
import Payroll from './payroll';
import editPayroll from './editpayroll';
import Multi from './mpayments';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
export class Main extends React.Component{

   render(){
   return(
  <main>
    <Switch>
      <Route exact path='/' component={Sale}/>
      <Route path='/invoice/' component={invoice}/>
      <Route path='/payment' component={payment}/>
      <Route path='/newinvoice' component={newinvoice}/>
      <Route exact path='/purchase' component={Purchase}/>
           <Route exact path='/bill' component={Billp}/>
        <Route exact path='/Newbill' component={Newbill}/>
        <Route exact path='/Editbill' component={Editbill}/>
      <Route exact path='/Newpurchase' component={Newpurchase}/>

      <Route exact path='/Editpurchase' component={Editpurchase}/>
      <Route exact path='/Purchasepayment' component={Purchasepayment}/>
	  <Route path='/Payroll' component={Payroll}/>
	  <Route path='/editPayroll' component={editPayroll}/>
	  	  <Route path='/payments' component={Multi}/>




    </Switch>
  </main>
);
}
}

export default Main;
