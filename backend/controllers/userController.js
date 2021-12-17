import asyncHandler from 'express-async-handler'
import generateToken from '../util/generateToken.js'
import User from '../models/userModel.js'
import Package from '../models/packageModel.js'
import Company from '../models/companyModel.js'



//login 
const authUser = asyncHandler(async(req,res) => {
	const { email, password } = req.body

	try{
		const user = await User.findOne({email})
		// console.log(user)
		if(!user.isAdmin){
			const comp = await Company.findOne({name : user.company})
			// console.log(comp)	
			// console.log(comp.createdOn)
			// console.log(Date.now())
			const diffInMs = await Math.abs(comp.createdAt - Date.now());
		  	const diff = await  Math.floor(diffInMs / (1000 * 60 * 60 * 24))

		  	const pack = await Package.findOne({name: user.package})
		 //  	console.log(pack)

		  	if(diff > pack.maxDaysAllowed){
			  		res.status(400)
			  		throw new Error('Sorry you package has been expired! Please renew it to proceed.')
			  	}	
			}
		
		if(user && (await user.matchPassword(password))){
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				isClientAdmin: user.isClientAdmin,
				company: user.company,
				package: user.package,
				token: generateToken(user._id)
			})
		} else{
			res.status(401)
			throw new Error('Invalid username or password')
		}

		res.send({email,password})
	} catch(err){
		console.log(err)
		if(err == 'Error: Sorry you package has been expired! Please renew it to proceed.'){
			throw new Error('Sorry you package has been expired! Please renew it to proceed.')
		}
		throw new Error('Something went wrong. Please try again with right credentials')
	}
	

})

//get Users
const getUsers = asyncHandler(async(req,res) => {
	const users = await User.find({addedUserId: req.user._id});
	// console.log(`req: ${req}`)
	// console.log(`req.user: ${req.user}`)
	if(users){
		res.send(users)
	} else {
		res.status(500)
		throw new Error('Something went wrong, please try again')
	}
	
})


//add User
const addUser = asyncHandler(async(req,res) => {
	const { name, email, company, pack, isClientAdmin, Role, Address } = req.body

		console.log('checking user count')
		const currentUserCount = await User.find({company: company}).count()
		console.log('currentUserCount' + currentUserCount)

		const checkPack = await Package.find({name:pack})
		console.log('maxUserAllowed' + checkPack[0].maxUserAllowed)
		
		if(checkPack){			
			if(currentUserCount >= checkPack[0].maxUserAllowed)
			{
				res.status(200)
				throw new Error('You have reached the maximum user limit')
			}				
		} else {
			res.status(404)
			throw new Error('Something went wrong, the package is notfound')
		}


	console.log('checking if user exists')
	const userExists = await User.findOne({ email })

	if(userExists){
		res.status(400)
		throw new Error('User email already exists')
		// res.json(userExists)
	}

	const user = await User.create({
		name, email,password: '123456', company, package: pack, isClientAdmin, role, address, addedUserId: req.user._id, activatedOn: Date.now()})

	if(user){
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isClientAdmin: user.isClientAdmin,
			role: user.role,
			address: user.address,
			company: user.company,
			package: user.package,
			addedUserId: user.addedUserId,
			activatedOn: user.activatedOn
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}

})




export { authUser, addUser, getUsers }