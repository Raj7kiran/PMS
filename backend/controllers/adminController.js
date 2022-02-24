import asyncHandler from 'express-async-handler'
import Package from '../models/packageModel.js'
import User from '../models/userModel.js'
import Company from '../models/companyModel.js'
import Country from '../models/countryModel.js'
import State from '../models/stateModel.js'
import City from '../models/cityModel.js'


//get package
const getPackage = asyncHandler(async(req,res) => {

	const packages = await Package.find({}).sort({createdAt: -1})
	console.log(req.user)
	res.json(packages)
})

//add package
const addPackage = asyncHandler(async(req, res) => {
	const { packageName, maxDaysAllowed, maxUserAllowed } = req.body

	const newPackage = await Package.create({ packageName, maxDaysAllowed, maxUserAllowed })

	if(newPackage){
		res.json(newPackage)
	} else {
		res.status(400)
		throw new Error('Invalid data')
	}

})

const deletePackage = asyncHandler(async (req,res) => {
	const foundpackage = await Package.findById(req.params.id);
	
	if(foundpackage){
		await foundpackage.remove()
		res.json({ message: 'Package Removed' })
	} else {
		res.status(404)
		throw new Error('Package not found')
	}	

})


const updatePackage = asyncHandler(async (req,res) => {
	const foundPackage = await Package.findById(req.params.id);
	
	if(foundPackage){
		foundPackage.packageName = req.body.packageName || foundPackage.packageName
		foundPackage.maxDaysAllowed = req.body.maxDaysAllowed || foundPackage.maxDaysAllowed
		foundPackage.maxUserAllowed =  req.body.maxUserAllowed || foundPackage.maxUserAllowed
			
		const updatedPackage = await foundPackage.save()

		res.json({updatedPackage})

	} else{
		res.status(404)
		throw new Error ('Package not found')
	}

})


// ------------------------------------------

const getClient = asyncHandler(async(req,res) => {
	const users = await User.find({}).sort({createdAt: -1})

	res.json(users)
})

//add Client Admin
const addClient = asyncHandler(async(req,res) => {
	const { firstName, lastName, email, company, packageName, role, isAdmin, 
			isClientAdmin, phone, dob, zipcode, city, state, gender, address } = req.body
	console.log(req.body)

	const companyExists = await Company.findOne({name: company})
	console.log(companyExists)

	if(companyExists){
		console.log('company exists')
		const currentUserCount = await User.find({company: company}).count()
		console.log('currentUserCount' + currentUserCount)

		const checkPack = await Package.find({packageName:packageName})
		console.log('maxUserAllowed' + checkPack[0].maxUserAllowed)
		console.log(checkPack)
		
		if(checkPack){			
			if(currentUserCount >= checkPack[0].maxUserAllowed)
				{
					res.status(200)
					throw new Error('You have reached the maximum user limit')
				}				
			} 

	} else {
			console.log('creating a new company')
			const newCompany = await Company.create({name: company, createdOn: Date.now(), package: packageName })
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
		firstName, lastName, email, password: '123456', company, role, package:packageName,
		isAdmin, isClientAdmin, addedUserId: req.user._id, city, state, dob, zipcode,gender, phone, address
	})
	// console.log(user)	

	if(user){
		// console.log('updating num users')
		const comp = await Company.findOne({name: company})
		comp.numUsers = comp.numUsers +1 
		const updatedComp = await comp.save()
		// console.log( 'updatedComp' + updatedComp)	

		res.status(201).json({
			_id: user._id,
			// name: user.name,
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
			gender: user.gender,
			addedUserId: user.addedUserId,
			phone: user.phone,
			address: user.address
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}

})

const deleteClient = asyncHandler(async (req,res) => {
	const client = await User.findById(req.params.id);
	
	if(client){
		await client.remove()
		res.json({ message: 'User Removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}	

})


// ---------------------Below is for regions----------------

const getCountry = asyncHandler( async(req,res) => {
	const countries = await Country.find({})

	if(countries){
		res.json(countries)
	} else {
		res.status(500)
		// console.log('dint fetch the countries')
	}
})

const getState = asyncHandler(async(req,res) => {
	if(req.params.country === 'all'){
		const states = await State.find({})

		if(states){
			res.json(states)
		} else {
			res.status(500)
			// console.log('dint fetch the states')
		}

	} else {
		const states = await State.find({ country : req.params.country })
		
		if(states){
			res.json(states)
		} else {
			res.status(500)
			// console.log('dint fetch the states')
		}
	}
	// console.log(req.params)
	

	
})

const getCity = asyncHandler(async(req,res) => {
	// console.log(`re.params:  ${req.params}`)
	const cities = await City.find({ state : req.params.state })

	if(cities){
		res.json(cities)
	} else {
		res.status(500)
		// console.log('dint fetch the cities')
	}
})


// ------------------------Manufacturer------------

//get manufacturer
export const getManufacturer = asyncHandler(async(req,res) => {
	const manufacturer = await Manufacturer.find({}).sort({createdAt: -1})
	res.json(manufacturer)
})


//add Manufacturer
export const addManufacturer = asyncHandler(async(req,res) => {
	const { name, shortName, country } = req.body

	const manufacturer = new Manufacturer({
		name,
		shortName,
		country,
		city,
		state,
		createdUser: req.user.name,
		user:req.user._id
	})
	    console.log(manufacturer.createdUser)
		console.log(typeof(manufacturer.createdUser))
	const createdManufacturer = await manufacturer.save()
	res.status(200).json(createdManufacturer)
})


//delete Manfacturer
export const deleteManufacturer = asyncHandler(async(req,res) => {
	const manufacturer = await Manufacturer.findById(req.params.id)

	if(manufacturer){
		await manufacturer.remove()
		res.json({ message: 'Manufacturer Deleted' })
	} else {
		res.status(404)
		throw new Error('Manufacturer not found')
	}
})


//update Manufacturer
export const updateManufacturer = asyncHandler(async(req,res) => {
	const manufacturer = await Manufacturer.findById(req.params.id)

	if(manufacturer){
		manufacturer.name = req.body.name || manufacturer.name
		manufacturer.shortName = req.body.shortName || manufacturer.shortName
		manufacturer.country = req.body.country || manufacturer.country
		manufacturer.state = req.body.state || manufacturer.state
		manufacturer.city = req.body.city || manufacturer.city
		manufacturer.createdUser = manufacturer.createdUser
		manufacturer.createdUserId = manufacturer.createdUserId
		manufacturer.updatedUser = req.user.name
		manufacturer.updatedUserId = req.user._id

		const updatedManufacturer = await manufacturer.save()

		res.json({
			name: updatedManufacturer.name,
			shortName: updatedManufacturer.shortName,
			country: updatedManufacturer.country,
			state: updatedManufacturer.state,
			city: updatedManufacturer.city,
			createdUser: updatedManufacturer.createdUser,
			createdUserId: updatedManufacturer.createdUserId,
			updatedUser: updatedManufacturer.updatedUser,
			updatedUserId: updatedManufacturer.updatedUserId,
		})

	} else {
		res.status(404)
		throw new Error('Manufacturer not found!')
	}

})


// --------------------Supplier--------------

//get Supplier
export const getSupplier = asyncHandler(async(req,res) => {
	const suppliers = await Supplier.find({}).sort({createdAt: -1})
	res.json(suppliers)
})


//add supplier
export const addSupplier = asyncHandler(async(req,res) => {
	const { supplierName, supplierContact, position, email, contactNumber, altContactNumber, credit, category, 
			houseno, street, area
	 } = req.body

	 const address = `${houseno}, ${street}, ${area}`
	 console.log(address)
	const supplier = new Supplier({
		supplierName, 
		supplierContact, 
		position, 
		email, 
		contactNumber, 
		altContactNumber, 
		credit, 
		category, 
		address,
		createdUser: req.user.name,
		user:req.user._id
	})
	    // console.log(supplier.createdUser)
		console.log(typeof(supplier.createdUser))
		const createdSupplier = await supplier.save()
		res.status(200).json(createdSupplier)
})


//delete supplier
export const deleteSupplier = asyncHandler(async(req,res) => {
	const supplier = await Supplier.findById(req.params.id)

	if(supplier){
		await supplier.remove()
		res.json({ message: 'Supplier Deleted' })
	} else {
		res.status(404)
		throw new Error('Supplier not found')
	}
})


//update Supplier
export const updateSupplier = asyncHandler(async(req,res) => {
	const supplier = await Supplier.findById(req.params.id)

	if(supplier){
		supplier.supplierName = req.body.supplierName || supplier.supplierName
		supplier.supplierContact = req.body.supplierContact || supplier.supplierContact
		supplier.position = req.body.position || supplier.position
		supplier.email = req.body.email || supplier.email
		supplier.contactNumber = req.body.contactNumber || supplier.contactNumber
		supplier.altContactNumber = req.body.altContactNumber || supplier.altContactNumber
		supplier.credit = req.body.credit || supplier.credit
		supplier.category = req.body.category || supplier.category
		supplier.address = req.body.address || supplier.address
		supplier.updatedUser = req.user.name
		supplier.updatedUserId = req.user._id

		const updatedSupplier = await Supplier.save()

		res.json({
			supplierName: updatedSupplier.supplierName,
			supplierContact: updatedSupplier.supplierContact,
			position: updatedSupplier.position,
			email: updatedSupplier.email,
			contactNumber: updatedSupplier.contactNumber,
			altContactNumber: updatedSupplier.altContactNumber,
			credit: updatedSupplier.credit,
			category: updatedSupplier.category,
			address: updatedSupplier.address,
			supplierName: updatedSupplier.supplierName,
			supplierName: updatedSupplier.supplierName,
			supplierName: updatedSupplier.supplierName,
		})
	} else {
		res.status(404)
		throw new Error('Supplier not found!')	
	}

})


export { getPackage, addPackage, addClient, getClient,getCountry, getState, getCity, deletePackage, updatePackage, deleteClient }