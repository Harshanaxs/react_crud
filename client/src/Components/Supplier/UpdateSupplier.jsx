import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const UpdateSupplier = () => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [supplier, setSupplier] = useState({
		supplierId: '',
		supplierName: '',
		email: '',
		phoneNumber: '',
		address: '',
		br_number: '',
		product_name: '',
		product_price: ''
	});

	const {
		supplierId,
		supplierName,
		email,
		phoneNumber,
		address,
		br_number,
		product_name,
		product_price,
	} = supplier;

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/supplier/${params.id}`
				);
				
				if (response.status === 200) {
					setIsLoading(false);
					setSupplier(response.data.supplier);
				}
			} catch (error) {
				toast(error.response.data.message, { type: toast.TYPE.ERROR });
				setTimeout(() => {
					window.location.replace('/supplier');
				}, 2000);
			}
		}
		getData();
	}, [params.id]);

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

			const response = await axios.put(
				`${process.env.REACT_APP_BACKEND_URL}/api/supplier/update`,
				supplier,
				config
			);

			if (response.status === 200) {
				toast(response.data.message, { type: toast.TYPE.SUCCESS });
				setSupplier({
					supplierId: '',
					supplierName: '',
					email: '',
					phoneNumber: '',
					address: '',
					br_number: '',
					product_name: '',
					product_price: ''
				});
				setTimeout(() => {
					window.location.replace('/supplier');
				}, 2000);
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
						<p><Link to="/supplier">Supplier Management</Link> {'>'} Update Supplier</p>
					</div>
				</div>
				<div className="row">
					<div className="col-9 position-relative">
						<h1 className='display-5 fw-bold'>Update Supplier - {params.id}</h1>
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
											readOnly
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
									<button type='submit' className='btn btn-primary sub_btn'>Update supplier</button>
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

export default UpdateSupplier;
