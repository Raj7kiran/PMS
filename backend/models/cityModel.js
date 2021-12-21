import mongoose from 'mongoose'

const citySchema = mongoose.Schema(
	{
		name : {
			type: String
		},
		state : {
			type: String
		}

	})

const City = mongoose.model('City', citySchema)


export default City