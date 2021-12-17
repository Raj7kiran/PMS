import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import packages from './data/packages.js'
import User from './models/userModel.js'
import Package from './models/packageModel.js'
import connectDB from './config/db.js'

//seeder mongodb+srv://rajkiran:<password>@cluster0.afkox.mongodb.net/test
dotenv.config()

connectDB()


const importData = async () => {
	try{
		
		await User.deleteMany()
		await Package.deleteMany()

		const createdUsers= await User.insertMany(users)
		// const adminUser = createdUsers[0]._id
		// const sampleProducts = products.map(product => {
		// 	return { ...product, user:adminUser }
		// })

		// await Product.insertMany(sampleProducts)

		await Package.insertMany(packages)

		console.log('Data Imported')
		process.exit()

	} catch(err) {
		console.error(`${err}`.red.inverse)
		process.exit(1)
	}
}

const destroyData = async () => {
	try{
		// await Order.deleteMany()
		// await Product.deleteMany()
		await User.deleteMany()
		await Package.deleteMany()

		console.log('Data Destroyed!'.red.inverse)
		process.exit()
	} catch(err) {
		console.error(`${err}`.red.inverse)
		process.exit(1)
	}
}

 if(process.argv[2] === '-d'){
 	destroyData()
 }else{
 	importData()
 }