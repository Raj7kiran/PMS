import mongoose from 'mongoose'


const manSchema = mongoose.Schema({	
		name: { type: String, required: true, unique: true },
		shortName: { type: String, required: true },
		country: { type: String, required: true },
		city: { type: String },
		state: { type: String },
		createdUser: { type: String },
		createdUserId : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			// required: true
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


const Manufacturer = new mongoose.model('Manufacturer', manSchema)

export default Manufacturer
