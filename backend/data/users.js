import bcrypt from 'bcryptjs'

const users = [
	{
		firstName: 'Admin',
		email: 'ad@abc.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
		isClientAdmin: false
	},
	// {
	// 	name: 'UserOne',
	// 	email: 'u1@abc.com',
	// 	password: bcrypt.hashSync('123456', 10),
	// 	isAdmin: false,
	// 	isClientAdmin: false
	// },
	// {
	// 	name: 'Client Admin',
	// 	email: 'cladmin@abc.com',
	// 	password: bcrypt.hashSync('123456', 10),
	// 	company: 'Company 1',
	// 	isAdmin: false,
	// 	isClientAdmin: true
	// }
]

export default users