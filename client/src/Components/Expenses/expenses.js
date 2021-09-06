import React, { Component  } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import './estyle.css';


export default class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expense: []
    };
  }

  //export PDF

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4

    const marginLeft = 40;
    const doc = new jsPDF('landscape', unit, size);

    doc.setFontSize(15);

    const title = "Expense Details";
    const headers = [['Expense ID', 'Date', 'Category', 'Description', 'Bill Number', 'Bill Value','% Total']];
    let initialValue = 0

    const sum = this.state.expense.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.billValue
    }, initialValue) ;


    const data = this.state.expense.map(elt => [elt.expenseId, elt.date, elt.category, elt.description, elt.billNumber, elt.billValue ,(elt.billValue/sum*100).toFixed(2) ]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Expenses.pdf")
  }


  componentDidMount() {
    this.retrieveEmployee();
  }

  retrieveEmployee() {
    axios.get(`http://localhost:8000/expense`).then(res => {
      if (res.data.success) {
        this.setState({
          expense: res.data.existingExpenses
        });
        console.log(this.state.expense);

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
          axios.delete(`http://localhost:8000/expense/delete/${id}`).then((res) => {

            swl('Employee successfully Deleted', {
              icon: "success",
            });
            this.retrieveEmployee();
          })
        }
      });
  }


  filterData(expense, searchKey) {
    const result = expense.filter((expense) =>
      expense.expenseId.toLowerCase().includes(searchKey) ||
      expense.date.toLowerCase().includes(searchKey) ||
      expense.category.toLowerCase().includes(searchKey) ||
      expense.description.toLowerCase().includes(searchKey) 
     

    )
    this.setState({ expense: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("http://localhost:8000/expense").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingExpenses, searchKey)
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
                <p>Expense Management</p>
              </div>
            </div>
            <div className="row">
              <div className="col-9 position-relative">
                <h1 className='display-5 fw-bold'>Expense Details</h1>
                < ToastContainer />
              </div>
              <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
            </div>
            <div className="row">
              <div className="col-2 buttons">
                <Link to="/expensetype/add" type="button" class="btn button_add" ><i class="fas fa-bill"></i>&nbsp;&nbsp;Add Expense Type</Link><br /><br />
              </div>
              <div className="col-2 buttons">
                <Link to="/expenses/add" type="button" class="btn button_add2"><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Expense</Link><br /><br />
              </div>
              <div className="col-3 buttons2">
                <Link onClick={()=>this.exportPDF()}  class="button_pdf"  ><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
              </div>
              <div className="col-2" />
              <div className="col-3 search position-relative" style={{ marginTop: '20px' }}>

                <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search an Expense" name="searchQuery" onChange={this.handleSearchArea} />

              </div>
            </div>
            <div className="shadowBox">
              <div className="row">
                <div className="col-12 ">
                  <table class="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Expense Id</th>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Bill Number</th>
                        <th scope="col">Bill Value</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {this.state.expense.map((expense, index) => (
                      <tbody>
                        <tr>
                          <th scope="row"><a href="" style={{ textDecoration: 'none', color: '#000' }}></a>{index + 1}</th>
                          <td>{expense.expenseId}</td>
                          <td>{new Date(expense.date).toLocaleDateString()}</td>
                          <td>{expense.category}</td>
                          <td>{expense.description}</td>
                          <td>{expense.billNumber}</td>
                          <td>{expense.billValue}</td>
                        
                          <td>
                            <Link to={`/expenses/update/${expense._id}`} type="button" class="btn btn-warning" style={{ width: '95px', margin: '2px' }}>
                              <i class="far fa-edit"></i>&nbsp;Edit
                            </Link>&nbsp;&nbsp;
                            <Link to="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(expense._id)}>
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
