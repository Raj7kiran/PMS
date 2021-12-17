import asyncHandler from 'express-async-handler'
import Package from '../models/packageModel.js'
import User from '../models/userModel.js'
import Company from '../models/companyModel.js'


//get package
const getPackage = asyncHandler(async(req,res) => {

	const packages = await Package.find({})
	console.log(req.user)
	res.send(packages)
})

//add package
const addPackage = asyncHandler(async(req, res) => {
	const { name, maxDaysAllowed, maxUserAllowed } = req.body

	const newPackage = await Package.create({ name, maxDaysAllowed, maxUserAllowed })

	if(newPackage){
		res.send(newPackage)
	} else {
		res.status(400)
		throw new Error('Invalid data')
	}

})

// ------------------------------------------

const getClient = asyncHandler(async(req,res) => {
	const users = await User.find({})

	res.send(users)
})



//add Client Admin
const addClient = asyncHandler(async(req,res) => {
	const { name, email, company, packageName, role, address, isAdmin, isClientAdmin } = req.body
	console.log(req.body)
	
	const companyExists = await Company.findOne({name: company})
	// console.log(companyExists)

	if(companyExists){
		console.log('company exists')
		const currentUserCount = await User.find({company: company}).count()
		console.log('currentUserCount' + currentUserCount)

		const checkPack = await Package.find({name:packageName})
		console.log('maxUserAllowed' + checkPack[0].maxUserAllowed)
		
		if(checkPack){			
			if(currentUserCount >= checkPack[0].maxUserAllowed)
			{
				res.status(200)
				throw new Error('You have reached the maximum user limit')
			}				
		} 
	} else {
			console.log('creating a new company')
			const newCompany = await Company.create({name: company, createdOn: Date.now() })
			console.log('newCompany' + newCompany)
		}
			
	console.log('checking if user exists')
	const userExists = await User.findOne({ email })

	if(userExists){
		res.status(400)
		throw new Error('User email already exists')
		// res.json(userExists)
	}

	const user = await User.create({
		name, email,password: '123456', company, role, address, package: packageName, isAdmin, isClientAdmin, addedUserId: req.user._id, activatedOn: Date.now()
	})
	console.log(user)	

	if(user){
		console.log('updating num users')
		const comp = await Company.findOne({name: company})
		comp.numUsers = comp.numUsers +1 
		const updatedComp = await comp.save()
		console.log( 'updatedComp' + updatedComp)	

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isClientAdmin: user.isClientAdmin,
			role: user.role,
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

export { getPackage, addPackage, addClient, getClient }