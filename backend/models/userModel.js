import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
		{
			// name: {
			// 	type: String,
			// 	// required: true
			// },
			firstName: {
				type: String,
				required: true
			},
			lastName: {
				type: String,
				// required: true
			},
			email: {
				type: String,
				required: true,
				unique: true
			},
			password: {
				type: String,
				required: true
			},
			company: {
				type: String,
				
			},
			role: {
				type: String,
				
			},
			address: {
				type: String,
				
			},
			city: {
				type: String,
				
			},
			state: {
				type: String,
				
			},
			phone: {
				type: String,
				
			},
			zipcode: {
				type: String,
				
			},
			package: {
				type: String,
				
			},
			gender: {
				type: String,
				
			},
			isAdmin: {
				type: Boolean,
				// required: true,
				default: false
			},
			isClientAdmin: {
				type: Boolean,
				// required: true,
				default: false
			},
			addedUserId: {
				type: String,
				// required: true
			},
			updatedUserId: {
				type: String,
				// required: true
			},
			// activatedOn:{
			// 	type:Date
			// },
			dob:{
				type:Date
			}
		},
		{
			timestamps: true
		}
	)


//this.password we get from matchPassword method
userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

//this is used to update the passowrd
userSchema.pre('save', async function(next){
	console.log(this.password)
	if(!this.isModified('password')){
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password,salt)
})


const User = mongoose.model('User', userSchema);

export default User;