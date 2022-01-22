import mongoose from 'mongoose'

const approveSchema = mongoose.Schema(
		{
			approverName: { type: String, required: true },
			approverId : {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User'
				},
			approvedAt: {
				type: Date
			},
			orderId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Order'
			}
		},
		{
			timestamps: true
		}
	)

const financeApproveSchema = mongoose.Schema(
		{
			approverName: { type: String, required: true },
			approverId : {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User'
				},
			approvedAt: {
				type: Date
			},
			orderId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Order'
			},
			remarks:{ type: String }
		},
		{
			timestamps: true
		}
	)

const finalApproveSchema = mongoose.Schema(
		{
			approverName: { type: String, required: true },
			approverId : {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User'
				},
			approvedAt: {
				type: Date
			},
			orderId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Order'
			},
			remarks:{ type: String }
		},
		{
			timestamps: true
		}
	)

const orderSchema = mongoose.Schema(
	{
			user:{
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User'
				},
			requestedBy:{
				type: String
				},
			orderItems: [
				{
					name	: { type: String, required: true },
					qty		: { type: Number, required: true },
					price	: { type: Number },
					totalPrice	: { type: Number },
					taxPrice	: { type: Number },
					product	: { 
						type : mongoose.Schema.Types.ObjectId,
						required: true,
						ref: 'Product'
						}
				}
			],
			createdAt: {
				type: Date
			},
			isApproved: {
				type: Boolean,
				// required: true,
			},
			approvalDetails: [approveSchema],
			isFinanceApproved: {
				type: Boolean,
				// required: true,
			},
			financeApprovalDetails: [financeApproveSchema],
			isFinalApproved: {
				type: Boolean,
				// required: true,
			},
			finalApprovalDetails: [finalApproveSchema],
			taxPrice: {
				type: Number,
				required: true,
				default: 0.0
			},
			shippingPrice: {
				type: Number,
				required: true,
				default: 0.0
			},
			itemTotalPrice: {
				type: Number,
				required: true,
				default: 0.0
			},
			orderTotalPrice: {
				type: Number,
				required: true,
				default: 0.0
			},
			isPaid: {
				type: Boolean,
				required: true,
				default: false
			},
			paidAt: {
				type: Date
			},
			isDelivered:{
				type: Boolean,
				required: true,
				default: false
			},
			deliveredAt: {
				type: Date
			}
	},
		{
			timestamps: true
		}
	)


const Order = mongoose.model('Order', orderSchema);

export default Order;