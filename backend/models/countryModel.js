import mongoose from 'mongoose'

const countrySchema = mongoose.Schema(
	{
		name : {
			type: String
		},
		// countryId : {
		// 	type: String
		// }

	})

const Country = mongoose.model('Country', countrySchema)


export default Country