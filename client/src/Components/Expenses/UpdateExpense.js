import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";



export default class UpdateExpense extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            startDate:"",
            category: "",
            description: "",
            billNumber: Number,
            billValue: "",
            expenseId:"",
            date: "",
        }
    }

 

    handleInputChange = (e) => {

        const { name, value } = e.target;
        
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {

        e.preventDefault();

        const id = this.props.match.params.id;
        const { expenseId, date, category, description, billNumber, billValue } = this.state;

        const data = {
            expenseId:expenseId,
            date: date,
            category: category,
            description: description,
            billNumber: billNumber,
            designation: billValue,
        }
        console.log(data)
        axios.put(`http://localhost:8000/expense/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast(`Employee Updated`, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
                this.setState(
                    {
                        expenseId: "",
                        date: "",
                        category: "",
                        description: "",
                        billNumber: Number,
                        billValue: "",
                    }
                )
            };
        });

    };
    componentDidMount() {
        console.log(this.props);
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/expense/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    expenseId: res.data.expense.expenseId,
                    date: res.data.expense.date,
                    category: res.data.expense.category,
                    description: res.data.expense.description,
                    billNumber: res.data.expense.billNumber,
                    billValue: res.data.expense.billValue,
                });
                console.log(this.state.expense);
            }
        })
    }




    render() {

        return (

            <div className="container containerTop">
            <div className="row">
                <div className="col position-relative link">
                    <p><Link to="/expenses">Expense Management</Link> {'>'} Update Expense</p>
                </div>
            </div>
            <div className="row">
                <div className="col-9 position-relative">
                    <h2>Update Expense</h2>
                    < ToastContainer />
                </div>
                <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>
            <div className="row">
                <div className="col-3" />
                <div className="col-6 shadowBox" >
                    <form className="needs-validation" noValidate>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Expense ID</label>
                            <input type="text"
                                disabled="true"
                                className="form-control"
                                minLength="4"
                                maxLength="6"
                                name="expenseId"
                                placeholder="Enter Employee Number"
                                value={this.state.expenseId}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Date</label>
                            <input type="text"
                                className="form-control"
                                name="date"
                                placeholder="DD/MM/YY"
                                value={this.state.date}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Category</label>
                            <input type="text"
                                className="form-control"
                                name="category"
                                placeholder="Enter category"
                                value={this.state.category}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Description</label>
                            <input type="text"
                                className="form-control"
                                name="description"
                                placeholder="Enter Description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Bill Number</label>
                            <input type="text"
                                maxLength="10"
                                minLength="10"
                                className="form-control"
                                name="billNumber"
                                placeholder="billNumber"
                                value={this.state.billNumber}
                                onChange={this.handleInputChange}
                                required />
                        </div>
                      

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Value</label>
                            <input type="text"
                                className="form-control"
                                name="billValue"
                                placeholder="Enter Value"
                                value={this.state.billValue}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        

                            <center>
                                <div class="d-grid gap-2 col-6 mx-auto">
                                    <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Update</button>
                                </div>
                            </center>
                        </form>
                    </div>

                </div>
                <div className="col-3" />
            </div>

        )
    }
}