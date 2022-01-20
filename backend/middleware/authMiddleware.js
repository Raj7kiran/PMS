import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Company from '../models/companyModel.js'


const protect = asyncHandler(async (req, res, next) => {
	let token

	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
	{
		try{
			//this will split it to array and remove first one of array that is bearer
			token = req.headers.authorization.split(' ')[1] 
			// console.log(`token : ${token}`)
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			// console.log(decoded)

			//we assign the ID from decoded token to req.user 
			req.user = await User.findById(decoded.id).select('-password')
			console.log(`req.user: ${req.user}`)

			next()

		} catch(err){
				console.error(err);
				res.status(401)
				throw new Error('Not Authorized, please login again!')
		}
	}

	if(!token){
		res.status(401)
		throw new Error('Not Authorized, please login again!')
	}

})
//FYI this protect can be used wherever we need authentication

const admin = (req, res, next) => {
	if(req.user && req.user.isAdmin){
		// console.log(req.user.isAdmin)
		next()
	} else {
		res.status(401)
		throw new Error('Not Authorized as Admin')
	}
}

const initiator = (req, res, next) => {
	if(req.user && req.user.role === '1'){
		// console.log(req.user.isAdmin)
		next()
	} else {
		res.status(401)
		throw new Error('Not Authorized as initiator')
	}
}

const approver = (req, res, next) => {
	if(req.user && req.user.role === '2'){
		// console.log(req.user.isAdmin)
		next()
	} else {
		res.status(401)
		throw new Error('Not Authorized as approver')
	}
}

const initAndApprov = (req, res, next) => {
	if(req.user && req.user.role === '3'){
		// console.log(req.user.isAdmin)
		next()
	} else {
		res.status(401)
		throw new Error('Not Authorized as initiator and approver')
	}
}

const financer = (req, res, next) => {
	if(req.user && req.user.role === '4'){
		// console.log(req.user.isAdmin)
		next()
	} else {
		res.status(401)
		throw new Error('Not Authorized as financer')
	}
}

const finalApprover = (req, res, next) => {
	if(req.user && req.user.role === '5'){
		// console.log(req.user.isAdmin)
		next()
	} else {
		res.status(401)
		throw new Error('Not Authorized as finalApprover')
	}
}

const financeAndFinal = (req, res, next) => {
	if(req.user && req.user.role === '6'){
		// console.log(req.user.isAdmin)
		next()
	} else {
		res.status(401)
		throw new Error('Not Authorized as financer or finalApprover')
	}
}



export { protect, admin }

