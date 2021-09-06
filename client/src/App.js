import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './Components/NavBar/Navbar';

import Home from './Components/Employee/Home';
import AddEmployee from './Components/Employee/AddEmployee';
import UpdateEmployee from './Components/Employee/UpdateEmployee';


import AttendHome from './Components/EmployeeAttendance/AttendHome';
import SendEmail from './Components/EmployeeAttendance/SendEmail';


import ViewSuppliers from './Components/Supplier/ViewSuppliers';
import AddSupplier from './Components/Supplier/AddSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';
import AddExpense from './Components/Expenses/AddExpense'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Expenses from './Components/Expenses/expenses';
import UpdateExpense from './Components/Expenses/UpdateExpense';
import AddExpenseType from './Components/ExpensesType/AddExpenseType';
import AddExpenseTypes from './Components/ExpensesType/expensetype';



import "react-datepicker/dist/react-datepicker.css";




export default class App extends Component {
  render() {
    return (
      
      <BrowserRouter>

        <NavBar />
        
        <ToastContainer />
        <div className="container">

          {/*Employee*/}
          <Route path="/get_Emp" exact component={Home}></Route>
          <Route path="/emp_add" exact component={AddEmployee}></Route>
          <Route path="/emp_update/:id" exact component={UpdateEmployee}></Route>
         


           {/*Supplier*/}
          <Route path="/email" component={SendEmail}></Route>
          <Route exact path='/supplier'>
            <ViewSuppliers />
          </Route>
          <Route exact path='/add-new-supplier'>
            <AddSupplier />
          </Route>
          <Route exact path='/update-supplier/:id'>
            <UpdateSupplier />
          </Route>
         
          <Route path="/attend_home" component={AttendHome}></Route>
        {/* Expenses manager */}
        <Route exact path='/expenses'>

          <Expenses />
        </Route>
        <Route path='/expenses/add' component={AddExpense}></Route>
        <Route path='/expenses/update/:id' component={UpdateExpense}></Route>
        <Route path='/expensetype/add' component={AddExpenseType}></Route>
        <Route path='/expensetype' component={AddExpenseTypes}></Route>




       
        </div>
       
      
      </BrowserRouter>
      
    )
  }
}
