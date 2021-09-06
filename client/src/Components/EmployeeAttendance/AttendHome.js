import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './attendanceStyle.css';


export default class AttendHome extends Component {
  constructor(props) {
    super(props);
    this.calculateAmount = this.calculateAmount.bind(this);
    this.state = {
      attends: [],
      employee: [],
      name: "",
      empID: "",
      aTime: new Date(),
      type: ""
    };
  }

  //calculation 
  calculateAmount = () => {
    let tot = 0;
    let tot2 = 0;
    let percent = 0;
    this.state.attends.map((attends, index) => {
      if (new Date(attends.aTime).toDateString() == new Date().toDateString() && attends.type == "IN") {
        tot = tot + 1
      }
    })
    this.state.employee.map((employee, index) => {
      if (employee.name != "")
        tot2 = tot2 + 1
    })

    percent = (tot / tot2) * 100;

    document.getElementById("cou").innerHTML = tot
    document.getElementById("cou1").innerHTML = tot2 - tot
    document.getElementById("per").innerHTML = percent.toFixed(2) + '%';

  }


  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Employee Attendence";
    const headers = [['Employee ID', 'Attend Type', 'Date & Time']];

    const data = this.state.attends.map(elt => [elt.empID, elt.type, elt.aTime]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Attendence_List.pdf")
  }

  //form input
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { type, empID, aTime } = this.state;
    const data = {
      empID: empID,
      aTime: aTime,
      type: type
    }
    //console.log(data)
    axios.post("http://localhost:8000/attend/save", data).then((res) => {
      if (res.data.success) {
        toast.success("Attendence Marked successfully")
        this.setState(
          {
            empID: "",
            aTime: new Date(),
            type: ""
          }
        )
      };
      this.retrieveAttendence();
    });
  }

  //form input end



  componentDidMount() {
    this.retrieveAttendence();
    this.retrieveEmployee()
  }

  retrieveAttendence() {
    axios.get("http://localhost:8000/attends").then(res => {
      if (res.data.success) {
        this.setState({
          attends: res.data.existingAttends
        });
        console.log(this.state.attends)
      }
    });
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
          axios.delete(`http://localhost:8000/attends/delete/${id}`).then((res) => {

            swl('Guide successfully Deleted', {
              icon: "success",
            });
            this.retrieveAttendence();
          })
        }
      });
  }


  filterData(attends, searchKey) {
    const result = attends.filter((attends) =>
      attends.empID.toLowerCase().includes(searchKey) ||
      attends.type.toLowerCase().includes(searchKey) ||
      attends.aTime.toLowerCase().includes(searchKey)
    )
    this.setState({ attends: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("http://localhost:8000/attends").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingAttends, searchKey)
      }
    });

  }
  render() {
    return (
      <div className="container containerTop">
        <div className="row">
          <div className="col-12">
            <div className="col position-relative link">
              <p><a href="/get_Emp">Employee Management</a> {'>'} Attendence List</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9 position-relative">
            <h1 className='display-5 fw-bold'>Attendence List</h1>
            < ToastContainer />
          </div>
          <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
        </div>
        <div className="row">

          <div className="col-6" />

        </div>
        <div className="shadowBox">
          <div className="row" style={{marginBottom:'50px'}}> 
            <div className="col-7" style={{marginTop:'50px'}}>
              <div className="row">
                <div className="col-1"/>
                <div className="col-4 buttons">
                  <Link onClick={() => this.exportPDF()} type="button" class="btn buttonStyle2" ><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
                </div>  
                <div className="col-2"/>                  
                <div className="col-4">
                  <button className="btn sub_btn" onClick={this.calculateAmount}>Get Summary</button>
                </div>     
                <div className="col-1"/>           
              </div>
              <div className="row">
                <div className="col-1"/>
                <div className="col-10 search position-relative" style={{ marginTop: '40px'}}>
                  <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an attendance" name="searchQuery" onChange={this.handleSearchArea} />
                </div> 
                <div className="col-1"/>
              </div>
            </div>
            <div className="col-1"></div>          
            <div className="col-4">
              <div className="row">
                <div className="shadowBox" style={{                  
                    fontSize:'20px', maxWidth:'400px',                    
                    background: 'linear-gradient(90deg, rgba(236,0,140,1) 0%, rgba(9,9,121,0.5859477580094538) 49%, rgba(0,255,255,1) 100%)', 
                    color:'#fff', fontWeight:"600"
                  }}
                  >
                  <div className="row" style={{marginTop:'15px', textAlign:'left'}}>
                      <label>Today's Attendance : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="cou" /></label>
                  </div>
                  <div className="row" style={{marginTop:'15px', textAlign:'left'}}>
                      <label>Today's Absent : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="cou1" /></label>
                  </div>
                  <div className="row" style={{marginTop:'15px', textAlign:'left'}}>
                    <label>Attendance Persentage : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="per" /></label>
                  </div>                                                                              
                </div>                
              </div>

            </div>          
          </div>
          <div className="row">
            <div className="col-7">
              <table className="table table-hover">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Employ ID</th>
                    <th scope="col">Attend Type</th>
                    <th scope="col">Date and Time</th>
                    <th scope="col">  </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.attends.map((attends, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td><a href={`/record/${attends._id}`} style={{ textDecoration: 'none' }}>{attends.empID}</a></td>
                      <td>{attends.type}</td>
                      <td>{attends.aTime}</td>
                      <td>
                        <Link className="btn btn-danger" href="#" onClick={() => this.onDelete(attends._id)}>
                          <i className="fas fa-trash-alt"></i>&nbsp;Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-1">
              <hr style={{ borderLeft: '4px solid #049aef', height: '100%', width: '2px' }} />
            </div>
            <div className="col-4">
              <div className="row" style={{ textAlign: 'center' }}>
                <h1 className="h3 mb-3 font-weight-normal">Attendence</h1>
              </div>
              <div className="row">
                <form onSubmit={this.onSubmit} >
                  <div className="form-group position-relative" style={{ marginTop: '15px' }}>
                    <label style={{ marginBottom: '5px' }}> Attendance Type : </label>
                    <select id="type" className="form-control" name="type" onChange={this.handleInputChange} value={this.state.type} required>
                      <option value="">--</option>
                      <option value="IN">IN</option>
                      <option value="OUT">OUT</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginTop: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Select Date and Time</label>
                    <input type="datetime-local"
                      className="form-control"
                      name="aTime"
                      value={this.state.aTime}
                      onChange={this.handleInputChange} />
                  </div>

                  <div className="form-group" style={{ marginTop: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Employee ID</label>
                    <input type="text"
                      className="form-control"
                      name="empID"
                      value={this.state.empID}
                      onChange={this.handleInputChange} required />
                  </div>
                  <div className="form-group" style={{ marginTop: '15px', textAlign: 'center' }}>
                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '10px' }} onClick={this.onSubmit}>Submit</button>
                  </div>
                </form>

                <p id="cou1" />
                <p id="cou" />
                <p id="per" />
                
              </div>
            </div>
          </div>
        </div>      
        </div>
    )
  }
};