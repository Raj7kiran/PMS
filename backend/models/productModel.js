import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
	medicineName : { type: String, required: true },
	genericName : { type: String },
	category : { type: String },
	type : { type: String },
	manufacturer : { type: String },
	marketedBy : { type: String },
	scheduledCategory : { type: String },
	hsnCode : { type: String },
	pack : { type: Number },
	tax: {type: Number},
	mrp : { type: Number, default:0.0 },
	purchasePrice : { type: Number, default:0.0 },
	freeQty : { type: Number, default: 2 },
	discount : { type: Number, min:0, max: 99 },
	stockdiscount : { type: Number, min:0, max: 99 },
	currentStock : { type: Number, default:0, min:0 },
	lowStockValue : { type: Number, default:0, min:0 },
	reOrderValue : { type: Number, default:0, min:0 },
	indication : { type: String },
	className : { type: String },
	group : { type: String },
	subGroup : { type: String },
	binLocation : { type: String },
	storageTemp : { type: String },
	dose : { type: String },
	route : { type: String },
	timing : { type: String },
	preference : { type: String },
	createdUser: { type: String, required: true },
	createdUserId : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			//required: true
		},
	updatedUser: { type: String },
	updatedUserId : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			// required: true
		}
	},{
		timestamps: true
	}) 


const Product = new mongoose.model('Product', productSchema)

export default Product