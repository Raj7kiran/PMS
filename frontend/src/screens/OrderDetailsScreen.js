import React, {useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'


const OrderDetailsScreen = ({history}) => {
	let count=1;
	const dispatch = useDispatch()

	const { id } = useParams()
	const orderId = id
	let navigate = useNavigate()

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const orderDetails = useSelector( state => state.orderDetails )
	const { loading, error, order } = orderDetails

	// const [tableData, setTableData] = useState(order)

	
	// useEffect(()=>{
	// 	   setTableData(order)
	// 	},[order])

	useEffect(() => {

		if(!userInfo ){
			navigate('/')
		}
		
		if(!order || order._id !== orderId ){
				console.log('dispatch')
				dispatch(getOrderDetails(orderId))
			}
		
	},[dispatch, order, orderId, navigate, userInfo])



	return(
		<>
			<Link to='/order/status' className='btn btn-dark my-3'>Go Back</Link>
			<h1>Order : {order._id}</h1>
			{loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
			<div>
			<Table striped bordered hover responsive='md' className='table-sm mt-3' id="table-to-xls">
						<thead>
							<tr>
								<th ><span className='btn'>Sl</span></th>
								<th ><span className='btn'>Medicine</span></th>
								<th ><span className='btn'>C.Stock</span></th>
								<th ><span className='btn'>Low Stock</span></th>
								<th ><span className='btn'>Reorder Quantity</span></th>
								<th ><span className='btn'>Quantity</span></th>
							</tr>
						</thead>
						<tbody>
							{order.orderItems.map(item => (
									<tr key={item._id} >
										<td>{count++}</td>
										<td>{item.name}</td>
										<td>{item.product.currentStock}</td>
										<td>{item.product.lowStockValue}</td>
										<td>{item.product.reOrderValue}</td>
										<td>{item.qty}</td>
									</tr>
								)) }
						</tbody>						
				</Table>
					<p className='mt-3'>Total Quantity: {order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</p>
				</div>
				)}
			</>
		)
}


export default OrderDetailsScreen