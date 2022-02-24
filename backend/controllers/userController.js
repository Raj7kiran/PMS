import asyncHandler from 'express-async-handler'
import generateToken from '../util/generateToken.js'
import User from '../models/userModel.js'
import Package from '../models/packageModel.js'
import Company from '../models/companyModel.js'
import Manufacturer from '../models/manufacturerModel.js'
import Supplier from '../models/supplierModel.js'



//login 
const authUser = asyncHandler(async(req,res) => {
	const { email, password } = req.body

	// try{
		const user = await User.findOne({email})
		console.log(user)
		
		
		if(user && (await user.matchPassword(password))){
			if(user && !user.isAdmin){
			const comp = await Company.findOne({name : user.company})
			console.log(comp)	
			console.log(comp.createdOn)
			console.log(Date.now())
			const diffInMs = await Math.abs(comp.createdAt - Date.now());
		  	const diff = await  Math.floor(diffInMs / (1000 * 60 * 60 * 24))

		  	const pack = await Package.findOne({packageName: user.package})
		  	console.log(pack)

		  	if(diff > pack.maxDaysAllowed){
				  		res.status(400)
				  		throw new Error('Sorry you package has been expired! Please renew it to proceed.')
				  	}	
			}
			
			res.json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,				
				email: user.email,
				isAdmin: user.isAdmin,
				isClientAdmin: user.isClientAdmin,
				role: user.role,
				company: user.company,
				package: user.package,
				dob: user.dob,
				city: user.city,
				state: user.city,
				zipcode: user.zipcode,
				address: user.address,
				addedUserId: user.addedUserId,
				token: generateToken(user._id)
			})
		} else{
			res.status(401)
			throw new Error('Invalid username or password')
		}

		res.send({email,password})
	// } catch(err){
	// 	// console.log(err)
	// 	if(err == 'Error: Sorry you package has been expired! Please renew it to proceed.'){
	// 		throw new Error('Sorry you package has been expired! Please renew it to proceed.')
	// 	}
	// 	// throw new Error('Something went wrong. Please try again with right credentials')
	// }
	

})

//get Users
const getUsers = asyncHandler(async(req,res) => {
	const users = await User.find({addedUserId: req.user._id}).sort({createdAt: -1})

	// console.log(`req: ${req}`)
	// console.log(`req.user: ${req.user}`)
	if(users){
		res.json(users)
	} else {
		res.status(500)
		throw new Error('Something went wrong, please try again')
	}
	
})

const getDoctor = asyncHandler(async(req,res) => {
	const doctors = await User.find({role : '7'}).sort({createdAt: -1})


	if(doctors){
		res.json(doctors)
	} else {
		res.status(404)
		throw new Error ('No doctors found')
	}
})


//add User
const addUser = asyncHandler(async(req,res) => {
	const { name, email, company, pack, isClientAdmin, Role, Address } = req.body

		// console.log('checking user count')
	// 	const currentUserCount = await User.find({company: company}).count()
	// 	console.log('currentUserCount' + currentUserCount)

	// 	const checkPack = await Package.find({name:pack})
	// 	console.log('maxUserAllowed' + checkPack[0].maxUserAllowed)
		
	// 	if(checkPack){			
	// 		if(currentUserCount >= checkPack[0].maxUserAllowed)
	// 		{
	// 			res.status(200)
	// 			throw new Error('You have reached the maximum user limit')
	// 		}				
	// 	} else {
	// 		res.status(404)
	// 		throw new Error('Something went wrong, the package is notfound')
	// 	}


	// console.log('checking if user exists')
	// const userExists = await User.findOne({ email })

	// if(userExists){
	// 	res.status(400)
	// 	throw new Error('User email already exists')
	// 	// res.json(userExists)
	// }

	// const user = await User.create({
	// 	name, email,password: '123456', company, package: pack, isClientAdmin, role, address, addedUserId: req.user._id, activatedOn: Date.now()})

	// if(user){
	// 	res.status(201).json({
	// 		_id: user._id,
	// 		name: user.name,
	// 		email: user.email,
	// 		isAdmin: user.isAdmin,
	// 		isClientAdmin: user.isClientAdmin,
	// 		role: user.role,
	// 		address: user.address,
	// 		company: user.company,
	// 		package: user.package,
	// 		addedUserId: user.addedUserId,
	// 	})
	// } else {
	// 	res.status(400)
	// 	throw new Error('Invalid user data')
	// }

})

//get userprofile
const getUserProfile = asyncHandler(async (req,res) => {
	const user = await User.findById(req.user._id);

	if(user){
		res.json({ 	
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,				
				email: user.email,
				isAdmin: user.isAdmin,
				isClientAdmin: user.isClientAdmin,
				role: user.role,
				company: user.company,
				package: user.package,
				phone: user.phone,
				gender:user.gender,
				dob: user.dob,
				city: user.city,
				state: user.city,
				zipcode: user.zipcode,
				addedUserId: user.addedUserId,
				address: user.address
			})
	} else{
		res.status(404)
		throw new Error ('User not found')
	}

})


//get user by id
const getUserById = asyncHandler(async (req,res) => {
	const user = await User.findById(req.params.id).select('-password')
	
	if(user){
		res.json(user);
	} else {
		res.status(404)
		throw new Error('User not found')
	}	

})

const deleteUser = asyncHandler(async (req,res) => {
	const user = await User.findById(req.params.id);
	
	if(user){
		await user.remove()
		res.json({ message: 'User Removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}	

})


//.@desc update user
//.@route PUT /api/users/:id
//.@access Private/Admin
const updateUser = asyncHandler(async (req,res) => {
	const user = await User.findById(req.params.id);
	
	if(user){
		user.firstName = req.body.firstName || user.firstName
		user.lastName = req.body.lastName || user.lastName
		user.email =  req.body.email || user.email
		user.company = user.company
		user.role = req.body.role || user.role
		user.city = req.body.city || user.city
		user.state = req.body.state || user.state
		user.phone = req.body.phone || user.phone
		user.package = req.body.package || user.package
		user.gender = req.body.gender || user.gender
		user.dob = req.body.dob || user.dob
		user.zipcode = req.body.zipcode || user.zipcode
		user.address = req.body.address || user.address
		// user.isAdmin =  req.body.isAdmin
		// user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin
		user.isAdmin = req.body.isAdmin ?? user.isAdmin
		user.isClientAdmin = req.body.isClientAdmin ?? user.isClientAdmin
		user.updatedUserId = req.user.id
		
		const updatedUser = await user.save()

		res.json({
				_id: updatedUser._id,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,				
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				isClientAdmin: updatedUser.isClientAdmin,
				role: updatedUser.role,
				company: updatedUser.company,
				package: updatedUser.package,
				dob: updatedUser.dob,
				city: updatedUser.city,
				state: updatedUser.state,
				zipcode: updatedUser.zipcode,
				phone: updatedUser.phone,
				gender: updatedUser.gender,
				addedUserId: updatedUser.addedUserId,
				updatedUserId: updatedUser.updatedUserId,
				address: updatedUser.address
		})

	} else{
		res.status(404)
		throw new Error ('User not found')
	}

})

//.@desc update user profile
//.@route PUT /api/users/profile
//.@access Private
const updateUserProfile = asyncHandler(async (req,res) => {
	const user = await User.findById(req.user._id);
	

	if(user){
		user.firstName = req.body.firstName || user.firstName
		user.lastName = req.body.lastName || user.lastName
		user.email =  req.body.email || user.email
		user.company = user.company
		user.role = req.body.role || user.role
		user.city = req.body.city || user.city
		user.state = req.body.state || user.state
		user.phone = req.body.phone || user.phone
		user.package = req.body.package || user.package
		user.gender = req.body.gender || user.gender
		user.dob = req.body.dob || user.dob
		user.zipcode = req.body.zipcode || user.zipcode
		user.address = req.body.address || user.address
		// user.isAdmin =  req.body.isAdmin
		// user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin
		user.isAdmin = req.body.isAdmin ?? user.isAdmin
		user.isClientAdmin = req.body.isClientAdmin ?? user.isClientAdmin
		user.updatedUserId = req.user.id
		
		if(req.body.password){
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
				_id: updatedUser._id,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,				
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				isClientAdmin: updatedUser.isClientAdmin,
				role: updatedUser.role,
				company: updatedUser.company,
				package: updatedUser.package,
				dob: updatedUser.dob,
				city: updatedUser.city,
				state: updatedUser.state,
				zipcode: updatedUser.zipcode,
				phone: updatedUser.phone,
				gender: updatedUser.gender,
				addedUserId: updatedUser.addedUserId,
				updatedUserId: updatedUser.updatedUserId,
				address: updatedUser.address,
				token: generateToken(updatedUser._id)
		})

	} else{
		res.status(404)
		throw new Error ('User not found')
	}

})






export { authUser, addUser, getUsers, getUserProfile, getUserById, deleteUser, 
	updateUser, updateUserProfile, getDoctor }