import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



export default class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empNo:"",
            name: "",
            email: "",
            nic: "",
            mobileNo: Number,
            designation: "",

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
        const { empNo, name, email, nic, mobileNo, designation, department } = this.state;

        const data = {
            empNo:empNo,
            name: name,
            email: email,
            nic: nic,
            mobileNo: mobileNo,
            designation: designation,
            department: department
        }
        console.log(data)
        axios.put(`http://localhost:8000/employee/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast(`Employee Updated`, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
                this.setState(
                    {
                        empNo: "",
                        name: "",
                        email: "",
                        nic: "",
                        mobileNo: Number,
                        designation: "",
                        department: ""
                    }
                )
            };
        });

    };
    componentDidMount() {
        console.log(this.props);
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/employee/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    empNo: res.data.employee.empNo,
                    name: res.data.employee.name,
                    email: res.data.employee.email,
                    nic: res.data.employee.nic,
                    mobileNo: res.data.employee.mobileNo,
                    designation: res.data.employee.designation,
                    department: res.data.employee.department,
                });
                console.log(this.state.employee);
            }
        })
    }




    render() {
        return (
            <div className="container containerTop">
            <div className="row">
                <div className="col position-relative link">
                    <p><Link to="/get_Emp">Employee Management</Link> {'>'} Update Employee</p>
                </div>
            </div>
            <div className="row">
                <div className="col-9 position-relative">
                    <h2>Update Employee</h2>
                    < ToastContainer />
                </div>
                <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>
            <div className="row">
                <div className="col-3" />
                <div className="col-6 shadowBox" >
                    <form className="needs-validation" noValidate>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Employee No</label>
                            <input type="text"
                                className="form-control"
                                minLength="4"
                                maxLength="6"
                                name="empNo"
                                placeholder="Enter Employee Number"
                                value={this.state.empNo}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Employee Name</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter Employee Name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Email</label>
                            <input type="text"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>NIC</label>
                            <input type="text"
                                className="form-control"
                                name="nic"
                                placeholder="Enter NIC"
                                value={this.state.nic}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Mobile No</label>
                            <input type="text"
                                maxLength="10"
                                minLength="10"
                                className="form-control"
                                name="mobileNo"
                                placeholder="mobileNo"
                                value={this.state.mobileNo}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Designation</label>
                            <input type="text"
                                className="form-control"
                                name="designation"
                                placeholder="Enter Payment Date"
                                value={this.state.designation}
                                onChange={this.handleInputChange}
                                required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Department</label>
                            <select type="text"
                                className="form-control"
                                name="department"
                                placeholder="Select Department"

                                value={this.state.department}
                                onChange={this.handleInputChange} >
                                <option selected>{this.state.department}</option>
                                <option values="Marketing_Dep">Marketing Dep</option>
                                <option values="Arrangments_Dep">Arrangments Dep</option>
                                <option values="Finance_Dep">Finance Dep</option>
                                <option values="Kitchen_Dep">Kitchen Dep</option>
                            </select>
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