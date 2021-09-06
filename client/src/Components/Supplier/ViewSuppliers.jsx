import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SuppliersTable from './SuppliersTable';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './supplierStyles.css'

const ViewSuppliers = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [suppliers, setSuppliers] = useState([]);
	const [baseData, setBaseData] = useState([]);
	const [deleted, setDeleted] = useState(0);
	const doc = new jsPDF('landscape');

	const downloadReport = () => {
		doc.text('Suppliers report', 30, 10);

		let array = [];
		suppliers.map((supplier, index) => {
			let row = [];
			row.push(index + 1);
			row.push(supplier.supplierId);
			row.push(supplier.supplierName);
			row.push(supplier.email);
			row.push(supplier.phoneNumber);
			row.push(supplier.address);
			row.push(supplier.br_number);
			row.push(supplier.product_name);
			row.push(supplier.product_price);
			array.push(row);
			return row;
		});

		doc.autoTable({
			head: [['#', 'ID', 'Name', 'Email', 'Mobile', 'Address', 'BR Number', 'Product Name', 'Product Price']],

			body: array

		});

		doc.save('suppliers.pdf');
	};

	useEffect(() => {
		async function gedData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/supplier`
				);
				if (response.status === 200) {
					setSuppliers(response.data.suppliers);
					setBaseData(response.data.suppliers);
				}
			} catch (error) {
				toast(error.response.data.message, { type: toast.TYPE.ERROR });
			}
			setIsLoading(false);
		}
		gedData();
	}, [deleted]);

	const search = (inp) => {
		if (!inp.target.value) {
			setSuppliers(baseData);
		} else {
			// if(inputvalue === supplierID || inputvalue === supplierName)
			let searchList = baseData.filter(
				(data) =>
					data.supplierId
						.toLowerCase()
						.includes(inp.target.value.toLowerCase()) ||
					data.supplierName
						.toLowerCase()
						.includes(inp.target.value.toLowerCase())
			);
			setSuppliers(searchList);
		}
	};

	return (
		<>
			<div className="container containerTop">
				<div className="row">
					<div className="col-12">
						<div className="row">
							<div className="col position-relative link">
								<p>Supplier Management</p>
							</div>
						</div>
						<div className="row">
							<div className="col-9 position-relative">
								<h1 className='display-5 fw-bold'>Suppliers Details</h1>
								< ToastContainer />
							</div>
							<hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
						</div>
						<div className="row">
							<div className="col-2 buttons">
								<Link to="/add-new-supplier" type="button" class="btn button_add" ><i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Supplier</Link><br /><br />
							</div>
							<div className="col-2 buttons">
								<Link to="/email" type="button" class="btn button_add2"><i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;Send Email</Link><br /><br />
							</div>
							<div className="col-3 buttons2">
								<Link onClick={downloadReport} class="button_pdf"  ><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link><br /><br />
							</div>
							<div className="col-2" />
							<div className="col-3 search position-relative" style={{ marginTop: '20px' }}>
								<i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search a Supplier" name="searchQuery" onChange={search} />
							</div>
						</div>
					</div>
				</div>

			{isLoading ? (
				<div className='container text-center py-5'>
					<Loader
						type='Oval'
						color='#0d6efd'
						height={30}
						width={30}
					/>
				</div>
			) : suppliers.length > 0 ? (
				<>

					<SuppliersTable
						suppliers={suppliers}
						setDeleted={setDeleted}
						deleted={deleted}
					/>

				</>
			) : (
				<div className='container text-center py-5'>
					<h3>No suppliers found</h3>
				</div>
			)}
			</div>			
		</>
	);
};

export default ViewSuppliers;
