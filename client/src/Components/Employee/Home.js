import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import './estyle.css';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: []
    };
  }

  //export PDF

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4

    const marginLeft = 40;
    const doc = new jsPDF('landscape', unit, size);

    doc.setFontSize(15);

    const title = "Employee Details";
    const headers = [['Name', 'Email', 'NIC', 'MobileNo', 'Designation', 'Department']];

    const data = this.state.employee.map(elt => [elt.name, elt.email, elt.nic, elt.mobileNo, elt.designation, elt.department]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Employee.pdf")
  }


  componentDidMount() {
    this.retrieveEmployee();
  }

  retrieveEmployee() {
    axios.get(`http://localhost:8000/employee`).then(res => {
      if (res.data.success) {
        this.setState({
          employee: res.data.existingEmployee
        });
        console.log(this.state.employee);

      }

    });
  }

  //delete function with confirmation
  onDelete = (id) => {
    swl({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:8000/employee/delete/${id}`).then((res) => {

            swl('Employee successfully Deleted', {
              icon: "success",
            });
            this.retrieveEmployee();
          })
        }
      });
  }


  filterData(employee, searchKey) {
    const result = employee.filter((employee) =>
      employee.empNo.toLowerCase().includes(searchKey) ||
      employee.name.toLowerCase().includes(searchKey) ||
      employee.email.toLowerCase().includes(searchKey) ||
      employee.department.toLowerCase().includes(searchKey) ||
      employee.designation.toLowerCase().includes(searchKey)
    )
    this.setState({ employee: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("http://localhost:8000/employee").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingEmployee, searchKey)
      }
    });
  }
  

  render() {
    return (
      <div className="container containerTop">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col position-relative link">
                <p>Employee Management</p>
              </div>
            </div>
            <div className="row">
              <div className="col-9 position-relative">
                <h1 className='display-5 fw-bold'>Employee Details</h1>
                < ToastContainer />
              </div>
              <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>
            <div className="row">
              <div className="col-2 buttons">
                <Link to="/attend_home" type="button" class="btn button_add" ><i class="fas fa-user-clock"></i>&nbsp;&nbsp;Attendance</Link><br /><br />
              </div>
              <div className="col-2 buttons">
                <Link to="/emp_add" type="button" class="btn button_add2"><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Employee</Link><br /><br />
              </div>
              <div className="col-3 buttons2">
                <Link onClick={()=>this.exportPDF()}  class="button_pdf"  ><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
              </div>
              <div className="col-2" />
              <div className="col-3 search position-relative" style={{ marginTop: '20px' }}>

                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an Employee" name="searchQuery" onChange={this.handleSearchArea} />

              </div>
            </div>
            <div className="shadowBox">
              <div className="row">
                <div className="col-12 ">
                  <table class="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">EMP No</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">NIC</th>
                        <th scope="col">Contact number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {this.state.employee.map((employee, index) => (
                      <tbody>
                        <tr>
                          <th scope="row"><a href="" style={{ textDecoration: 'none', color: '#000' }}></a>{index + 1}</th>
                          <td>{employee.empNo}</td>
                          <td>{employee.name}</td>
                          <td>{employee.department}</td>
                          <td>{employee.nic}</td>
                          <td>{employee.mobileNo}</td>
                          <td>{employee.email}</td>
                          <td>{employee.designation}</td>
                          <td>
                            <Link to={`/emp_update/${employee._id}`} type="button" class="btn btn-warning" style={{ width: '95px', margin: '2px' }}>
                              <i class="far fa-edit"></i>&nbsp;Edit
                            </Link>&nbsp;&nbsp;
                            <Link to="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(employee._id)}>
                              <i className="far fa-trash-alt"></i>&nbsp;Delete
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
