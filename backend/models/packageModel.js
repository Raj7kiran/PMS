import mongoose from 'mongoose'


const packageSchema = mongoose.Schema(
		{
			packageName: {
				type: String,
				required: true
			},
			maxDaysAllowed:{
				type: Number,
				required: true
			},
			maxUserAllowed:{
				type: Number,
				required: true
			}
		},
		{
			timestamps: true
		}
	)

const Package = mongoose.model('Package', packageSchema)


export default Package