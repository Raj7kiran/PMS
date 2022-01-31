import mongoose from 'mongoose'


const submitSchema = mongoose.Schema(
		{
			name: { type: String, required: true },
			id : {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User'
				},
			submittedAt: {
				type: Date
			},
			saleId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Sale'
			},
			remarks:{ type: String }
		},
		{
			timestamps: true
		}
	)

const billerSchema = mongoose.Schema(
		{
			name: { type: String, required: true },
			id : {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User'
				},
			billedAt: {
				type: Date
			},
			saleId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Sale'
			},
			remarks:{ type: String }
		},
		{
			timestamps: true
		}
	)

const collectorSchema = mongoose.Schema(
		{
			name: { type: String, required: true },
			id : {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User'
				},
			collectedAt: {
				type: Date
			},
			saleId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Sale'
			},
		},
		{
			timestamps: true
		}
	)

const deliverSchema = mongoose.Schema(
		{
			name: { type: String, required: true },
			id : {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User'
				},
			deliveredAt: {
				type: Date
			},
			saleId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Sale'
			},
		},
		{
			timestamps: true
		}
	)

const saleSchema = mongoose.Schema(
	{
		title: { type: String },
		name: { type: String },
		createdUserId: { 
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
		 },
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
		 submitDetails: [submitSchema],
		 isPaid: {type: Boolean, required:true, default: false},
		 paidAt: {type: Date},
		 isRejected: {type: Boolean, required:true, default: false},
		 rejectedAt : {type: Date},
		 isBilled: {type: Boolean, required:true, default: false},
		 billerDetails: [billerSchema],
		 isCollected: {type: Boolean, required:true, default: false},
		 collectorDetails: [collectorSchema],
		 isSentBack: {type: Boolean, required:true, default: false},
		 sentBackAt: {type: Date},
		 isDelivered:{type: Boolean, required: true, default: false},
		 deliverDetails: [deliverSchema],
		 remarks: {type: String}
	},
		{
			timestamps: true
		}

	)


const Sale = new mongoose.model('Sale', saleSchema)

export default Sale