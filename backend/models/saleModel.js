import mongoose from 'mongoose'


const saleSchema = mongoose.Schema(
	{
		title: { type: String },
		name: { type: String },
		age: { type: Number },
		gender: { type: String },
		phoneNumber: { type: Number },
		doctorID: { 
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
		 },
		 saleItems: [
				{
					name	: { type: String, required: true },
					qty		: { type: Number, required: true },
					price	: { type: Number },
					totalPrice	: { type: Number },
					productId	: { 
						type : mongoose.Schema.Types.ObjectId,
						required: true,
						ref: 'Product'
						},
					frequency: { type: String },
				}
			],
		totalQty: { type: Number },		
		itemTotalPrice: { type: Number },
		itemTotalPriceWithoutTax: { type: Number },
		totalGST: { type: Number },
		discountPrice: { type: Number },
		saleTotal: { type: Number },
		createdUserId: { 
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
		 },
		 isSaved: {type: Boolean, required:true, default: false},
		 savedAt: {type: Date},
		 isSubmitted: {type: Boolean, required:true, default: false},
		 submittedAt: {type: Date},
		 isPaid: {type: Boolean, required:true, default: false},
		 paidAt: {type: Date},
		 isDelivered:{type: Boolean, required: true, default: false},
		 deliveredAt: {type: Date},
		 remarks: {type: String}
	},
		{
			timestamps: true
		}

	)


const Sale = new mongoose.model('Sale', saleSchema)

export default Sale