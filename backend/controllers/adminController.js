import asyncHandler from 'express-async-handler'
import Package from '../models/packageModel.js'
import User from '../models/userModel.js'
import Company from '../models/companyModel.js'
import Country from '../models/countryModel.js'
import State from '../models/stateModel.js'
import City from '../models/cityModel.js'


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
	const { firstName, lastName, email, company, packageName, role, isAdmin, 
			isClientAdmin, phone, dob, zipcode, city, state, gender } = req.body
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
		firstName, lastName, email, password: '123456', company, role, packageName,
		isAdmin, isClientAdmin, addedUserId: req.user._id, city, state, dob, zipcode,gender
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
			firstname: user.firstname,
			lastname: user.lastname,
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
			addedUserId: user.addedUserId,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}

})


// const addClient = asyncHandler(async(req,res) => {
// 	const { firstname, lastname, email, packageName, role, isAdmin, 
// 			isClientAdmin, phone, dob, zipcode, } = req.body
// 	console.log(req.body)
	
// 	// const companyExists = await Company.findOne({name: company})
// 	// // console.log(companyExists)

// 	// if(companyExists){
// 	// 	console.log('company exists')
// 	// 	const currentUserCount = await User.find({company: company}).count()
// 	// 	console.log('currentUserCount' + currentUserCount)

// 	// 	const checkPack = await Package.find({name:packageName})
// 	// 	console.log('maxUserAllowed' + checkPack[0].maxUserAllowed)
		
// 	// 	if(checkPack){			
// 	// 		if(currentUserCount >= checkPack[0].maxUserAllowed)
// 	// 		{
// 	// 			res.status(200)
// 	// 			throw new Error('You have reached the maximum user limit')
// 	// 		}				
// 	// 	} 
// 	// } else {
// 	// 		console.log('creating a new company')
// 	// 		const newCompany = await Company.create({name: company, createdOn: Date.now() })
// 	// 		console.log('newCompany' + newCompany)
// 	// 	}
			
// 	console.log('checking if user exists')
// 	const userExists = await User.findOne({ email })

// 	if(userExists){
// 		res.status(400)
// 		throw new Error('User email already exists')
// 		// res.json(userExists)
// 	}

// 	const user = await User.create({
// 		firstname, lastname, email,password: '123456', role, package: packageName,
// 		isAdmin, isClientAdmin, addedUserId: req.user._id, dob, zipcode
// 	})
// 	console.log(user)	

// 	if(user){
		
// 		res.status(201).json({
// 			_id: user._id,
			
// 			firstname: user.firstname,
// 			lastname: user.lastname,
// 			email: user.email,
// 			isAdmin: user.isAdmin,
// 			isClientAdmin: user.isClientAdmin,
// 			role: user.role,
			
// 			package: user.package,
// 			dob: user.dob,
// 			city: user.city,
// 			state: user.city,
// 			zipcode: user.zipcode,
// 			addedUserId: user.addedUserId,
// 		})
// 	} else {
// 		res.status(400)
// 		throw new Error('Invalid user data')
// 	}

// })

const getCountry = asyncHandler( async(req,res) => {
	const countries = await Country.find({})

	if(countries){
		res.json(countries)
	} else {
		res.status(500)
		console.log('dint fetch the countries')
	}
})


const getState = asyncHandler(async(req,res) => {
	console.log(req.params)
	const states = await State.find({})

	if(states){
		res.json(states)
	} else {
		res.status(500)
		console.log('dint fetch the states')
	}
})

const getCity = asyncHandler(async(req,res) => {
	console.log(`re.params:  ${req.params}`)
	const cities = await City.find({ state : req.params.state })

	if(cities){
		res.json(cities)
	} else {
		res.status(500)
		console.log('dint fetch the cities')
	}
})



export { getPackage, addPackage, addClient, getClient,getCountry, getState, getCity }