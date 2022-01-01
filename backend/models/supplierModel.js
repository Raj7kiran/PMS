import mongoose from 'mongoose'


const supplierSchema = mongoose.Schema({
	supplierName: { type: String, required: true, unique: true },
	supplierContact: { type: String, required: true },
	position: { type: String, required: true},
	email: { type: String, required: true, unique: true },
	contactNumber: { type: String, required: true},
	altContactNumber: { type: String, required: true},
	credit: { type: String, required: true },
	category: { type: String, required: true },
	address: { type: String, required: true },
	houseno: { type: String },
	street: { type: String },
	area: { type: String },
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
	},
	{
		timestamps: true
	}

)

const Supplier = new mongoose.model('Supplier', supplierSchema)

export default Supplier