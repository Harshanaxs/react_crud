import React, { Component, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'


export default function AppEmail() {

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('gmail', 'template_356qxmy', e.target, 'user_6zlJu3e1ZQV4U0jDbC7wJ')
      .then((result) => {
        console.log(result.text);
        alert("You email is sent successfully");
      }, (error) => {
        console.log(error.text);
        alert("Check your details again");
      });
  }

  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('Valid Email')
    } else {
      setEmailError('Enter valid Email')
    }
  }

  return (
<div className="container containerTop">
<div className="row">
					<div className="col-12">
						<div className="row">
							<div className="col position-relative link">
                <p><Link to="/supplier">Supplier Management</Link> {'>'} Send an E-mail</p>
							</div>
						</div>
						<div className="row">
							<div className="col-9 position-relative">
								<h1 className='display-5 fw-bold'>Send an E-mail</h1>
								< ToastContainer />
							</div>
							<hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
						</div>
					</div>
				</div>

    <div class="row">
      <div className="col-md-3" />
      <div className="col-md-6">
        <div className="shadowBox">
            <div className="row" style={{textAlign:'center'}}>
              <h1 className="h3 mb-3 font-weight-normal">Inform the Stock Manager</h1>
            </div>          
          <div className="container">
            <div style={{ marginTop: "5%" }}>
              <form onSubmit={sendEmail}>
                <div class="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>Stock Manager Name</label>
                  <input name="name" type="text" class="form-control" placeholder="Enter Name" />
                </div>


                <div class="from-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>Email Address</label>
                  <input name="email" type="email" class="form-control" placeholder="Enter Email" onChange={(e) => validateEmail(e)} />
                  <span style={{ color: 'red', }}>{emailError}</span>
                </div>


                <div class="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>Message</label>
                  <textarea name="message" class="form-control" placeholder="Enter Your Message"></textarea>
                </div>

                <div className="row">
                  <div className="col-3"/>
                  <div className="col-6" style={{textAlign:'center'}}>
                    <button type="submit" class="btn btn-primary sub_btn"><i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;Send an Email</button>
                  </div>
                  <div className="col-3"/>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3" />
    </div>
    </div>    
  );
}
