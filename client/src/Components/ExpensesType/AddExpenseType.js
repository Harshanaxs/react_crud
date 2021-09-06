import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddExpenseType extends Component {
    constructor(props) {
        super(props);
        this.state = {
           name:"",
           type:"",


            formErrors: {
                name:"",
                type:"",

            }

        }
    }

    handleInputChange = (e) => {

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "name":
                formErrors.expenseId =
                     value.length < 2
                    ? "Name number should have charactor more than 3"
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


            const { name, type } = this.state;

            const data = {
                name:name,
                type: type,
                

            }
            console.log(data)
            axios.post("http://localhost:8000/expensetype/add", data).then((res) => {
                if (res.data.success) {
                    toast(`New Expense Type Added `, {
                        type: toast.TYPE.SUCCESS,
                        autoClose: 4000
                    });
                    this.setState(
                        {
                            name:"",
                            type: "",
                           
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
  

    render() {
        const { formErrors } = this.state;

        return (
            <div className="container containerTop">
            <div className="row">
              <div className="col position-relative link">
                <p><Link to="/get_Emp">Expense  Management</Link> {'>'} Add New Expense Type</p>
              </div>
            </div>
            <div className="row">
              <div className="col-9 position-relative">
                <h1 className='display-5 fw-bold'>Add New Expense Type</h1>
                < ToastContainer />
              </div>

              <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
              <div className="col-2 buttons">
                <Link to="/expensetype" type="button" class="btn button_add" ><i class="fas fa-bill"></i>&nbsp;&nbsp;Manage Expense Type</Link><br /><br />
              </div>
            </div>                
                <div className="row ">
                    <div className="col-3" />
                    <div className="col-6 shadowBox" >
                        <form className="needs-validation" noValidate >
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Expense Type"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />
                            </div>
                          

             
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Type</label>
                                <select type="text"
                                    className="form-control"
                                    name="type"
                                    placeholder="Select Type"

                                    value={this.state.category}
                                    onChange={this.handleInputChange} >
                                    <option selected>Choose Type</option>
                                    <option values="one_time">One Time</option>
                                    <option values="recurring">Recurring</option>
                                </select>

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