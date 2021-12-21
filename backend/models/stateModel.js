import mongoose from 'mongoose'

const stateSchema = mongoose.Schema(
	{
		name : {
			type: String
		},
		// stateId : {
		// 	type: String
		// },
		country : {
			type: String
		}

	})

const State = mongoose.model('State', stateSchema)


export default State