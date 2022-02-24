import mongoose from 'mongoose'



const inboundSchema = mongoose.Schema(
	{
		vendor: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Supplier'
				},
		order: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Order'
				},
		remarks: { type: String },
		receivedDate: {	type: Date },
		expiryDate: { type: Date },
		receivedQuantity: { type: Number },
		freeItem: { type: Number },
		taxPercentage: { type: Number },
		totalPrice: { type: Number },
		totalQty: { type: Number },
		taxOnFree: { type: Boolean },
		gst: { type: Number },
		inboundTotal : { type: Number },
		isPaid: {type: Boolean, default: false},
		isForwarded: {type: Boolean, default: false},
	},
	{
		timestamps: true
	}

	)

const InboundDB = mongoose.model('InboundDB', inboundSchema)

export default InboundDB
