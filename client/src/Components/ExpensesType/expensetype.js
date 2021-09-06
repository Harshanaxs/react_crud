import React, { Component  } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swl from 'sweetalert'
import './estyle.css';


export default class ExpenseType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expensetypes: []
    };
  }

  //export PDF



  componentDidMount() {
    this.retrieveEmployee();
  }

  retrieveEmployee() {
    axios.get(`http://localhost:8000/expensetype`).then(res => {
      if (res.data.success) {
        this.setState({
          expensetypes: res.data.existingExpenses
        });
        console.log(this.state.expensetypes);

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
          axios.delete(`http://localhost:8000/expensetype/delete/${id}`).then((res) => {

            swl('Employee successfully Deleted', {
              icon: "success",
            });
            this.retrieveEmployee();
          })
        }
      });
  }


  filterData(expensetype, searchKey) {
    const result = expensetype.filter((expensetype) =>
      expensetype.expenseId.toLowerCase().includes(searchKey) ||
      expensetype.date.toLowerCase().includes(searchKey) ||
      expensetype.category.toLowerCase().includes(searchKey) ||
      expensetype.description.toLowerCase().includes(searchKey) 
     

    )
    this.setState({ expensetype: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("http://localhost:8000/expensetype").then(res => {
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
        
            </div>
            <div className="shadowBox">
              <div className="row">
                <div className="col-12 ">
                  <table class="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {this.state.expensetypes.map((expensetype, index) => (
                      <tbody>
                        <tr>
                          <th scope="row"><a href="" style={{ textDecoration: 'none', color: '#000' }}></a>{index + 1}</th>
                          <td>{expensetype.name}</td>
                          <td>{expensetype.type}</td>
                       
                        
                          <td>
                            {/* <Link to={`/expenses/update/${expensetype._id}`} type="button" class="btn btn-warning" style={{ width: '95px', margin: '2px' }}>
                              <i class="far fa-edit"></i>&nbsp;Edit
                            </Link>&nbsp;&nbsp; */}
                            <Link to="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(expensetype._id)}>
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
    )
  }
}
