import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import './estyle.css';


const invoiceRegx = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/gm);
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate:"",
            expenseId:"",
            date: "",
            category: "",
            description: "",
            billNumber: Number,
            billValue: "",
            types:[],


            formErrors: {
                billNumber: Number,
                expenseId:"",
                date: "",
                category: "",
                description: "",
                billNumber: Number,
                billValue: "",

            }

        }
    }

    handleInputChange = (e) => {

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "expenseId":
                formErrors.expenseId =
                    value.length < 5 || value.length > 6
                    ? "Exp number should have charactor between 4 to 5"
                    : "";
                    break;
                case "date":
                    formErrors.date =
                        value.length < 5
                            ? "Minimum charactor length must be 5"
                            : "";
                    break;
               
                case "billNumber":
                    formErrors.billNumber =
                        value.length > 10 || value.length > 10
                            ? "Enter a valid mobile number"
                            : "";
                    break;
                default:
                    break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    setSelectedDate = (date) =>{
        this.setState({
            date : date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (formValid(this.state.formErrors)) {


            const { expenseId, date, category, description, billNumber, billValue } = this.state;

            const data = {
                expenseId:expenseId,
                date: date,
                category: category,
                description: description,
                billNumber: billNumber,
                billValue: billValue,

            }
            console.log(data)
            axios.post("http://localhost:8000/expense/add", data).then((res) => {
                if (res.data.success) {
                    toast(`New Expense Added `, {
                        type: toast.TYPE.SUCCESS,
                        autoClose: 4000
                    });
                    this.setState(
                        {
                            expenseId:"",
                            date: "",
                            category: "",
                            description: "",
                            billNumber: Number,
                            billValue: "",
                        }
                    )
                };
            });
        }
        else {
            toast(`You are Inserting a blank! `, {
                type: toast.TYPE.ERROR,
                autoClose: 4000
            });

        }
    };

    componentDidMount() {
        this.retrieveExpenseTypes();
      }
    
      retrieveExpenseTypes(){
        
            axios.get(`http://localhost:8000/expensetype`).then(res => {
              if (res.data.success) {
                this.setState({
                    types: res.data.existingExpenses
                });
        
              }

              console.log(this.state.types);
        
            });
          
      }

    render() {
        const { formErrors } = this.state;

        return (
            <div className="container containerTop">
            <div className="row">
              <div className="col position-relative link">
                <p><Link to="/get_Emp">Expense Management</Link> {'>'} Add New Expense</p>
              </div>
            </div>
            <div className="row">
              <div className="col-9 position-relative">
                <h1 className='display-5 fw-bold'>Add New Expense</h1>
                < ToastContainer />
              </div>
              <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>                
                <div className="row ">
                    <div className="col-3" />
                    <div className="col-6 shadowBox" >
                        <form className="needs-validation" noValidate >

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Expense ID</label>
                                <input type="text"
                                    className="form-control"
                                    name="expenseId"
                                    minLength="4"
                                    maxLength="6"
                                    placeholder="EXP001"
                                    value={this.state.expenseId}
                                    onChange={this.handleInputChange} />
                                {formErrors.expenseId.length < 4 || formErrors.expenseId.length > 6 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.expenseId}</span>
                                )}
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Date</label>
                               <div className="customDatePickerWidth">
                               <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={this.state.date}
                                    onChange={date =>this.setSelectedDate(date)}
                                    ></DatePicker>
                               </div>

                                {formErrors.date.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.date}</span>
                                )}

                            </div>

                                   
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Category</label>
                        
                                <select type="text"
                                    className="form-control"
                                    name="category"
                                    placeholder="Select Category"
    
                                    value={this.state.category}
                                    onChange={this.handleInputChange} >
                                    <option selected>Choose Type</option>

                                {this.state.types.map((type, index) => (
                                    
                                        <option values="{type.type}">{type.name}</option>
                                
                               
                                
                                ))}

                                </select>




                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Description</label>
                                <input type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Bill Number</label>
                                <input type="text"
                                    className="form-control"
                                    name="billNumber"
                                    placeholder="Enter Bill No"
                                    value={this.state.billNumber}
                                    onChange={this.handleInputChange} />

                                {formErrors.billNumber.length > 10 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.billNumber}</span>
                                )}

                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Bill Value</label>
                                <input type="number"
                                    className="form-control"
                                    name="billValue"
                                    placeholder="Enter Bill Value"
                                    value={this.state.billValue}
                                    onChange={this.handleInputChange} />
                                {formErrors.billValue.length > 3 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.billValue}</span>
                                )}
                            </div>

                          


                            <center>
                                <div class="d-grid gap-2 col-6 mx-auto  ">
                                    <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Add</button>
                                </div>
                            </center>
                        </form>
                    </div>
                    <div className="col-3" />
                </div>
            </div>

        );
    };
};