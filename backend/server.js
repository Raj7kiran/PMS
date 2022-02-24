import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid'


const stripe = new Stripe('sk_test_51KOO5eSHdf7SFUGJvdFRrQHTxrW2HGNbenecfRMn8fv1DTvx5Rdh84M2UHiCBZaIfgRz3KOoedr3qlqOS8DREPWT00RYl2Et1E')

import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import dpRoutes from './routes/dpRoutes.js'
import otherRoutes from './routes/otherRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import saleRoutes from './routes/saleRoutes.js'
import inboundRoutes from './routes/inboundRoutes.js'


const app = express()
app.use(express.json())
app.use(cors())


if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}

// const storeItems = new Map([
// 		[1, {priceItems: 1000, name:'Product One'}],
// 		[2, {priceItems: 2000, name:'Product Two'}]
// 	])

app.post('/payment', (req,res) => {
	const { price, token } = req.body
	console.log('PRICE', price)

	const idempontencyKey = uuidv4()
	console.log(idempontencyKey)
	console.log(token)

	return stripe.customers.create({
		email: token.email,
		source: token.id
	}).then(customer => {
		stripe.charges.create({
			amount: price *100,
			currency: 'inr',
			customer: customer.id,
			receipt_email: token.email,
			description: `Purchase`,
			shipping: {
				name: token.card.name,
				address: {
					country: token.card.address_country
				}
			}
		}), {idempontencyKey}
	})
	.then(result => {
		res.status(200)
		console.log(result)
		res.json(result)
	})
	.catch(err => console.log(err))

})


dotenv.config()
connectDB()


app.use('/users', userRoutes)
app.use('/admin', adminRoutes)
app.use('/order', orderRoutes)
app.use('/sale', saleRoutes)
app.use('/inbound', inboundRoutes)
app.use('/drop', dpRoutes)
app.use('/', otherRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if(process.env.NODE_ENV === 'production'){
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req,res) => 
		res.sendFile(path.resolve(__dirname, 'frontend','build', 'index.html')))
	} else {
		app.get('/', (req,res) => {
			res.send('API running....');
		})
}


	
// app.all('*', (req, res, next) => {
// 	res.status(404)
//     next(new Error('Page Not Found'))
// })


app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Backend server is running in ${process.env.NODE_ENV} mode in port ${PORT}` ))