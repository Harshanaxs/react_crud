import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const invoiceRegx = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/gm);
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empNo:"",
            name: "",
            email: "",
            nic: "",
            mobileNo: Number,
            designation: "",
            department: "",


            formErrors: {
                mobileNo: Number,
                empNo:"",
                name: "",
                email: "",
                nic: "",
                mobileNo: Number,
                designation: "",
                department: "",

            }

        }
    }

    handleInputChange = (e) => {

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "empNo":
                formErrors.empNo =
                    value.length < 5 || value.length > 6
                    ? "Emp number should have charactor between 4 to 5"
                    : "";
                    break;
                case "name":
                    formErrors.name =
                        value.length < 5
                            ? "Minimum charactor length must be 5"
                            : "";
                    break;
                case "email":
                    formErrors.email = invoiceRegx.test(value)
                        ? ""
                        : "Enter a valid email";
                    break;
                case "mobileNo":
                    formErrors.mobileNo =
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

    onSubmit = (e) => {
        e.preventDefault();

        if (formValid(this.state.formErrors)) {


            const { empNo, name, email, nic, mobileNo, designation, department } = this.state;

            const data = {
                empNo:empNo,
                name: name,
                email: email,
                nic: nic,
                mobileNo: mobileNo,
                designation: designation,
                department: department,

            }
            console.log(data)
            axios.post("http://localhost:8000/employee/add", data).then((res) => {
                if (res.data.success) {
                    toast(`New Employee Added `, {
                        type: toast.TYPE.SUCCESS,
                        autoClose: 4000
                    });
                    this.setState(
                        {
                            empNo:"",
                            name: "",
                            email: "",
                            nic: "",
                            mobileNo: Number,
                            designation: "",
                            department: "",
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
                <p><Link to="/get_Emp">Employee Management</Link> {'>'} Add New Employee</p>
              </div>
            </div>
            <div className="row">
              <div className="col-9 position-relative">
                <h1 className='display-5 fw-bold'>Add New Employee</h1>
                < ToastContainer />
              </div>
              <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>                
                <div className="row ">
                    <div className="col-3" />
                    <div className="col-6 shadowBox" >
                        <form className="needs-validation" noValidate >

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Employee No</label>
                                <input type="text"
                                    className="form-control"
                                    name="empNo"
                                    minLength="4"
                                    maxLength="6"
                                    placeholder="EMP001"
                                    value={this.state.empNo}
                                    onChange={this.handleInputChange} />
                                {formErrors.empNo.length < 4 || formErrors.empNo.length > 6 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.empNo}</span>
                                )}
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Employee Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Employee Name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />

                                {formErrors.name.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.name}</span>
                                )}

                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Email</label>
                                <input type="email"
                                    className={"form-control"}
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                                {formErrors.email.length > 0 && (
                                    <span style={{ color: 'red', fontWeight: 'bold' }} className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>NIC Number</label>
                                <input type="text"
                                    className="form-control"
                                    name="nic"
                                    placeholder="Enter NIC"
                                    value={this.state.nic}
                                    onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Mobile No</label>
                                <input type="number"
                                    className="form-control"
                                    name="mobileNo"
                                    placeholder="Enter MobileNo"
                                    value={this.state.mobileNo}
                                    onChange={this.handleInputChange} />

                                {formErrors.mobileNo.length > 10 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.mobileNo}</span>
                                )}

                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Designation</label>
                                <input type="text"
                                    className="form-control"
                                    name="designation"
                                    placeholder="Enter Designation"
                                    value={this.state.designation}
                                    onChange={this.handleInputChange} />
                                {formErrors.designation.length > 3 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.designation}</span>
                                )}
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Department</label>
                                <select type="text"
                                    className="form-control"
                                    name="department"
                                    placeholder="Select Department"

                                    value={this.state.department}
                                    onChange={this.handleInputChange} >
                                    <option selected>Choose Department</option>
                                    <option values="Marketing_Dep">Marketing Dep</option>
                                    <option values="Arrangments_Dep">Arrangments Dep</option>
                                    <option values="Finance_Dep">Finance Dep</option>
                                    <option values="Kitchen_Dep">Kitchen Dep</option>
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