import mongoose from 'mongoose'


const companySchema = mongoose.Schema(
		{
			name: {
				type: String,
				required: true
			},
			createdOn:{
				type: Date,
				required: true
			},
			numUsers:{
				type: Number,
				required: true,
				default: 0
			}
		},
		{
			timestamps: true
		}
	)

const Company = mongoose.model('Company', companySchema)


export default Company