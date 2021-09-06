import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../NavBar/Button';
import './supplierStyles.css'

const AddSupplier = () => {
	const [supplier, setSupplier] = useState({
		supplierId: '',
		supplierName: '',
		email: '',
		phoneNumber: '',
		address: '',
		product_name: '',
		product_price: '',
		br_number: ''
	});

	const {
		supplierId,
		supplierName,
		email,
		phoneNumber,
		address,
		product_name,
		product_price,
		br_number
	} = supplier;

	const handleChange = (e) => {
		setSupplier({ ...supplier, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/supplier`,
				supplier,
				config
			);

			if (response.status === 201) {
				toast(response.data.message, { type: toast.TYPE.SUCCESS });
				setSupplier({
					supplierId: '',
					supplierName: '',
					email: '',
					phoneNumber: '',
					address: '',
					product_name: '',
					product_price: '',
					br_number: ''
				});
			}
		} catch (error) {
			toast(error.response.data.message, { type: toast.TYPE.ERROR });
		}
	};
	return (
		<>
			<div className="container containerTop">
				<div className="row">
					<div className="col position-relative link">
						<p><Link to="/supplier">Supplier Management</Link> {'>'} Add New Supplier</p>
					</div>
				</div>
				<div className="row">
					<div className="col-9 position-relative">
						<h1 className='display-5 fw-bold'>Add New Supplier</h1>
						< ToastContainer />
					</div>
				<hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
				</div>   
			</div>
			<div className="row">
				<div className="col-2" />
					<div className="col-8 shadowBox" >
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-6">
									<div className='form-group'>
										<label htmlFor='name'>Name</label>
										<input
											type='text'
											className='form-control'
											name='supplierName'
											value={supplierName}
											onChange={handleChange}
											required
											placeholder='Supplier Name '
										/>
									</div>									
								</div>
								<div className="col-6">
									<div className='form-group '>
										<label htmlFor='supplierId'>Supplier ID</label>
										<input
											type='text'
											className='form-control'
											name='supplierId'
											placeholder='SP0001'
											value={supplierId}
											onChange={handleChange}
											required
										/>
									</div>									
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<div className='form-group'>
										<label htmlFor='email'>Email</label>
										<input
											type='email'
											className='form-control'
											name='email'
											placeholder='Email'
											value={email}
											onChange={handleChange}
											required
										/>
									</div>									
								</div>
								<div className="col-6">
									<div className='form-group'>
										<label htmlFor='phoneNumber'>Phone</label>
										<input
											type='text'
											className='form-control'
											name='phoneNumber'
											placeholder='+9471-122-4223'
											value={phoneNumber}
											onChange={handleChange}
											required
										/>
									</div>									
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<div className='form-group'>
										<label htmlFor='address'>Address</label>
										<textarea
											className='form-control'
											name='address'
											placeholder='Address'
											value={address}
											onChange={handleChange}
											required
										/>
									</div>										
								</div>
								<div className="col-6">
									<div className='form-group'>
										<label htmlFor='br_number'>BR Number</label>
										<input
											type='number'
											className='form-control'
											name='br_number'
											placeholder='BR Number'
											value={br_number}
											onChange={handleChange}
											required
										/>
									</div>										
								</div>
							</div>
							<div className="row">
								<div className="col-6">								
									<div className='form-group'>
										<label htmlFor='product_name'>Product Names</label>
										<input
											type='text'
											className='form-control'
											name='product_name'
											placeholder='Product Name'
											value={product_name}
											onChange={handleChange}
											required
										/>
									</div>
								</div>																
								<div className="col-6">															
									<div className='form-group'>
										<label htmlFor='product_price'>Product Price</label>
										<input
											type='number'
											className='form-control'
											name='product_price'
											placeholder='Product Price'
											value={product_price}
											onChange={handleChange}
											required
										/>
									</div>																									
								</div>
							</div>
							<div className="row">
								<div className="col-4" />
								<div className="col-4">									
									<button type='submit' className='btn btn-primary sub_btn'>Add supplier</button>
								</div>
								<div className="col-4" />
							</div>
						</form>
					</div>
				<div className="col-2" />
			</div>
		</>
	);
};

export default AddSupplier;
