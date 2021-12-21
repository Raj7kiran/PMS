import mongoose from 'mongoose'
import dotenv from 'dotenv'

import users from './data/users.js'
import packages from './data/packages.js'
import countries from './data/countries.js'
import states from './data/states.js'
import cities from './data/cities.js'

import User from './models/userModel.js'
import Package from './models/packageModel.js'
import Country from './models/countryModel.js'
import State from './models/stateModel.js'
import City from './models/cityModel.js'

import connectDB from './config/db.js'

//seeder mongodb+srv://rajkiran:<password>@cluster0.afkox.mongodb.net/test
dotenv.config()

connectDB()


const importData = async () => {
	try{
		
		await User.deleteMany()
		await Package.deleteMany()
		await Country.deleteMany()
		await State.deleteMany()
		await City.deleteMany()

		const createdUsers= await User.insertMany(users)
		// const adminUser = createdUsers[0]._id
		// const sampleProducts = products.map(product => {
		// 	return { ...product, user:adminUser }
		// })

		// await Product.insertMany(sampleProducts)

		await Package.insertMany(packages)
		await Country.insertMany(countries)
		await State.insertMany(states)
		await City.insertMany(cities)


		console.log('Data Imported')
		process.exit()

	} catch(err) {
		console.error(`${err}`)
		process.exit(1)
	}
}

const destroyData = async () => {
	try{
		// await Order.deleteMany()
		// await Product.deleteMany()
		await User.deleteMany()
		await Package.deleteMany()
		await Country.deleteMany()
		await State.deleteMany()
		await City.deleteMany()

		console.log('Data Destroyed!')
		process.exit()
	} catch(err) {
		console.error(`${err}`)
		process.exit(1)
	}
}

 if(process.argv[2] === '-d'){
 	destroyData()
 }else{
 	importData()
 }