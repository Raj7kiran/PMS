import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Manufacturer from '../models/manufacturerModel.js'
import Supplier from '../models/supplierModel.js'
import Product from '../models/productModel.js'
import Joi from 'joi'



// --------------------------------Manufacturer-------------

//get manufacturer
export const getManufacturer = asyncHandler(async(req,res) => {
	const manufacturer = await Manufacturer.find({}).sort({createdAt: -1})
	res.json(manufacturer)
})


//add Manufacturer
export const addManufacturer = asyncHandler(async(req,res) => {
	// const packageValSchema = Joi.object({
	// 	name: Joi.string().required(),
	// 	shortName: Joi.string().required(),
	// 	country: Joi.string().required()
	// })

	// const { error } = packageValSchema.validate(req.body)

	// if(error){
	// 	console.log(error)
	// 	const msg = error.details.map(el=> el.message).join(',')
	// 	res.status(400)
	// 	throw new Error(msg)
	// }


	const { name, shortName, country, city, state } = req.body

	const manufacturerExist = await Manufacturer.findOne({name})

	if(manufacturerExist){
		res.status(400)
		throw new Error('Manufacturer already exists');
	}

	const manufacturer = new Manufacturer({
		name,
		shortName,
		country,
		city,
		state,
		createdUser: req.user.firstName,
		createdUserId:req.user._id
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


//get manufacturer by id
export const getManufacturerById = asyncHandler(async (req,res) => {
	const manufacturer = await Manufacturer.findById(req.params.id)
	
	if(manufacturer){
		res.json(manufacturer);
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

	 const supplierExists = await Supplier.findOne({ $or: [{supplierName}, {email}] })

	 if(supplierExists){
	 	res.status(400)
		throw new Error('Supplier name/email already exists');
	 }

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
		houseno,
		street,
		area,
		createdUser: req.user.firstName,
		createdUserId:req.user._id
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


//get supplier by id
export const getSupplierById = asyncHandler(async (req,res) => {
	const supplier = await Supplier.findById(req.params.id)
	
	if(supplier){
		res.json(supplier);
	} else {
		res.status(404)
		throw new Error('Supplier not found')
	}	

})


//update Supplier
export const updateSupplier = asyncHandler(async(req,res) => {
	const supplier = await Supplier.findById(req.params.id)
	console.log(req.body)
	console.log(req.body.houseno)
	const address = `${req.body.houseno}, ${req.body.street}, ${req.body.area}`

	if(supplier){
		supplier.supplierName = req.body.supplierName || supplier.supplierName
		supplier.supplierContact = req.body.supplierContact || supplier.supplierContact
		supplier.position = req.body.position || supplier.position
		supplier.email = req.body.email || supplier.email
		supplier.contactNumber = req.body.contactNumber || supplier.contactNumber
		supplier.altContactNumber = req.body.altContactNumber || supplier.altContactNumber
		supplier.credit = req.body.credit || supplier.credit
		supplier.category = req.body.category || supplier.category
		supplier.address = address || supplier.address
		supplier.houseno = req.body.houseno || supplier.houseno
		supplier.street = req.body.street || supplier.street
		supplier.area = req.body.area || supplier.area
		supplier.updatedUser = req.user.name
		supplier.updatedUserId = req.user._id

		const updatedSupplier = await supplier.save()

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
			houseno: updatedSupplier.houseno,
			street: updatedSupplier.street,
			area: updatedSupplier.area,
			supplierName: updatedSupplier.supplierName,
			supplierName: updatedSupplier.supplierName,
			supplierName: updatedSupplier.supplierName,
		})
	} else {
		res.status(404)
		throw new Error('Supplier not found!')	
	}

})

// -------------------Product-----------------------------

//get manufacturer
export const getProduct = asyncHandler(async(req,res) => {
	const product = await Product.find({})
	res.json(product)
})

//add supplier
export const addProduct = asyncHandler(async(req,res) => {
	const { medicineName, genericName, category, type, manufacturer, marketedBy, scheduledCategory,
			hsnCode, pack, mrp, purchasePrice, dose, route, timing, preference, indication, className,
			group, subGroup, storageTemp, binLocation
	 } = req.body

	const product = new Product({
		medicineName, genericName, category, type, manufacturer, marketedBy, scheduledCategory,
		hsnCode, pack, mrp, purchasePrice, dose, route, timing, preference, indication, className,
		group, subGroup, storageTemp, binLocation,
		createdUser: req.user.firstName,
		createdUserId:req.user._id,
	})
	    
		const createdProduct = await product.save()
		res.status(200).json(createdProduct)
})


//delete Product
export const deleteProduct = asyncHandler(async(req,res) => {
	const product = await Product.findById(req.params.id)

	if(product){
		await product.remove()
		res.json({ message: 'Product Deleted' })
	} else {
		res.status(404)
		throw new Error('Manufacturer not found')
	}
})


//get product by id
export const getProductById = asyncHandler(async (req,res) => {
	const product = await Product.findById(req.params.id)
	
	if(product){
		res.json(product);
	} else {
		res.status(404)
		throw new Error('Product not found')
	}	

})



//update Product
export const updateProduct = asyncHandler(async(req,res) => {
	const product = await Product.findById(req.params.id)

	if(product){
		product.medicineName = req.body.medicineName || product.medicineName
		product.genericName = req.body.genericName || product.genericName
		product.category = req.body.category || product.category
		product.type = req.body.type || product.type
		product.manufacturer = req.body.manufacturer || product.manufacturer
		product.marketedBy = req.body.marketedBy || product.marketedBy
		product.scheduledCategory = req.body.scheduledCategory || product.scheduledCategory
		product.hsnCode = req.body.hsnCode || product.hsnCode
		product.pack = req.body.pack || product.pack
		product.mrp = req.body.mrp || product.mrp
		product.purchasePrice = req.body.purchasePrice || product.purchasePrice
		product.timing = req.body.timing || product.timing
		product.preference = req.body.preference || product.preference
		product.indication = req.body.indication || product.indication
		product.class = req.body.class || product.class
		product.group = req.body.group || product.group
		product.subGroup = req.body.subGroup || product.subGroup
		product.storageTemp = req.body.storageTemp || product.storageTemp
		product.binLocation = req.body.binLocation || product.binLocation

		const updatedProduct = await product.save()

		res.json({
			medicineName: updatedProduct.medicineName,
			genericName: updatedProduct.genericName,
			category: updatedProduct.category,
			type: updatedProduct.type,
			manufacturer: updatedProduct.manufacturer,
			marketedBy: updatedProduct.marketedBy,
			scheduledCategory: updatedProduct.scheduledCategory,
			hsnCode: updatedProduct.hsnCode,
			pack: updatedProduct.pack,
			mrp: updatedProduct.mrp,
			purchasePrice: updatedProduct.purchasePrice,
			dose: updatedProduct.dose,
			route: updatedProduct.route,
			timing: updatedProduct.timing,
			preference: updatedProduct.preference,
			indication: updatedProduct.indication,
			class: updatedProduct.class,
			subGroup: updatedProduct.subGroup,
			group: updatedProduct.group,
			storageTemp: updatedProduct.storageTemp,
			binLocation: updatedProduct.binLocation
		})

	} else {
		res.status(404)
		throw new Error('Product not found!')
	}

})