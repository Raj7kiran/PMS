const orders = [
	{
	    _id: "61e022ec65bf79a5b211b23f",
	    user: {
	        _id: "61cbf93aa411cd1b28c01768",
	        firstName: "NewCl",
	        email: "newcl@abc.com",
	        phone: "12345678901"
	    },
	    requestedBy: "NewCl",
	    orderItems: [
	        {
	            name: "MedThree",
	            qty: 2,
	            price: 8.9,
	            totalPrice: 17.8,
	            taxPrice: 1.78,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 25,
	                lowStockValue: 10,
	                reOrderValue: 10,
	                purchasePrice: 8.9,
	                mrp: 9.9,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b240"
	        }
	    ],
	    createdAt: "2022-01-09T13:02:36.485Z",
	    taxPrice: 0,
	    shippingPrice: 0,
	    itemTotalPrice: 17.8,
	    totalTax: 1.78,
	    orderTotalPrice:19.58,
	    isPaid: false,
	    isDelivered: false,
	    updatedAt: "2022-01-09T13:02:36.485Z",
	    __v: 0
	},
	{
	    _id: "61e022ec65bf79a5b211b54G",
	    user: {
	        _id: "61cbf93aa411cd1b28c01759",
	        firstName: "User Two",
	        email: "newcl@abc.com",
	        phone: "12345678901"
	    },
	    requestedBy: "NewCl",
	    orderItems: [
	        {
	            name: "MedThree",
	            qty: 5,
	            price: 8.9,
	            totalPrice: 44.5,
	            taxPrice: 4.5,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 0,
	                lowStockValue: 0,
	                reOrderValue: 0,
	                purchasePrice: 8.9,
	                mrp: 9.9,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b241"
	        },
	        {
	            name: "Med Six",
	            qty: 10,
	            price: 10.99,
	            totalPrice: 109.98,
	            taxPrice: 10.99,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 40,
	                lowStockValue: 20,
	                reOrderValue: 20,
	                purchasePrice: 10.99,
	                mrp: 15.99,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b242"
	        },
	        {
	            name: "Med Seven",
	            qty: 15,
	            price: 99.99,
	            totalPrice: 1499.85,
	            taxPrice: 14.99,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 50,
	                lowStockValue: 15,
	                reOrderValue: 10,
	                 purchasePrice: 99.99,
	                mrp: 120.99,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b243"
	        }
	    ],
	    createdAt: "2022-01-13T13:02:36.485Z",
	    taxPrice: 0,
	    shippingPrice: 0,
	    itemTotalPrice: 1654.34,
	    totalTax: 16.54,
	    orderTotalPrice: 1670.88,
	    isApproved: true,
	    isFinanceApproved: true,
	    isFinalApproved: true,
	    isPaid: false,
	    isDelivered: false,
	    updatedAt: "2022-01-13T13:02:36.485Z",
	    __v: 0
	},
	{
	    _id: "61e022ec65bf79a5b211b44h",
	    user: {
	        _id: "61cbf93aa411cd1b28c01768",
	        firstName: "NewCl",
	        email: "newcl@abc.com",
	        phone: "885566224433"
	    },
	    requestedBy: "NewCl",
	    orderItems: [
	        {
	            name: "MedThree",
	            qty: 2,
	            price: 8.9,
	            totalPrice: 17.8,
	            taxPrice: 1.78,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 40,
	                lowStockValue: 20,
	                reOrderValue: 10,
	                 purchasePrice: 8.9,
	                mrp: 9.9,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b244"
	        },
	        {
	            name: "Med Four",
	            qty: 2,
	            price: 10.99,
	            totalPrice: 21.98,
	            taxPrice: 2.19,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 50,
	                lowStockValue: 15,
	                reOrderValue: 10,
	                purchasePrice: 10.99,
	                mrp: 12.99,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b245"
	        }
	    ],
	    createdAt: "2022-01-11T13:02:36.485Z",
	    taxPrice: 0,
	    shippingPrice: 0,
	    itemTotalPrice: 39.78,
	    totalTax: 3.97,
	    orderTotalPrice: 43.75,
	    isApproved: false,
	    isPaid: false,
	    isDelivered: false,
	    updatedAt: "2022-01-11T13:02:36.485Z",
	    __v: 0
	},
	{
	    _id: "61e022ec65bf79a5b211a78f",
	    user: {
	        _id: "61cbf93aa411cd1b28c01768",
	        firstName: "User Two",
	        email: "newcl@abc.com",
	        phone: "99665588233"
	    },
	    requestedBy: "NewCl",
	    orderItems: [
	        {
	            name: "Med Five",
	            qty: 2,
	            price: 50.00,
	            totalPrice: 100.00,
	            taxPrice: 10,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 100,
	                lowStockValue: 20,
	                reOrderValue: 10,
	                 purchasePrice: 50.00,
	                mrp: 50.00,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b246"
	        },
	        {
	            name: "MedThree",
	            qty: 2,
	            price: 8.9,
	            totalPrice: 17.8,
	            taxPrice: 1.78,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 40,
	                lowStockValue: 20,
	                reOrderValue: 10,
	                 purchasePrice: 8.9,
	                mrp: 9.9,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b247"
	        },
	    ],
	    createdAt: "2022-01-10T13:02:36.485Z",
	    taxPrice: 0,
	    shippingPrice: 0,
	    itemTotalPrice: 117.8,
	    totalTax: 11.78,
	    orderTotalPrice: 129.58,
	    isPaid: false,
	    isDelivered: false,
	    updatedAt: "2022-01-10T13:02:36.485Z",
	    __v: 0
	},
	{
	    _id: "61e022ec65bf79a5b211b23h",
	    user: {
	        _id: "61cbf93aa411cd1b28c01768",
	        firstName: "NewCl",
	        email: "newcl@abc.com",
	        phone: "885566224433"
	    },
	    requestedBy: "NewCl",
	    orderItems: [
	        {
	            name: "MedThree",
	            qty: 2,
	            price: 8.9,
	            totalPrice: 17.8,
	            taxPrice: 1.78,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 40,
	                lowStockValue: 20,
	                reOrderValue: 10,
	                 purchasePrice: 8.9,
	                mrp: 9.9,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b256"
	        },
	        {
	            name: "Med Four",
	            qty: 2,
	            price: 10.99,
	            totalPrice: 21.98,
	            taxPrice: 2.19,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 50,
	                lowStockValue: 15,
	                reOrderValue: 10,
	                 purchasePrice: 10.99,
	                mrp: 13.99,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b257"
	        }
	    ],
	    createdAt: "2022-01-11T13:02:36.485Z",
	    taxPrice: 0,
	    shippingPrice: 0,
	    itemTotalPrice: 39.78,
	    totalTax: 3.97,
	    orderTotalPrice: 43.75,
	    isApproved: true,
	    isFinanceApproved: true,
	    isPaid: false,
	    isDelivered: false,
	    updatedAt: "2022-01-11T13:02:36.485Z",
	    __v: 0
	},
	{
	    _id: "61e022ec65bf79a5b211b89y",
	    user: {
	        _id: "61cbf93aa411cd1b28c01768",
	        firstName: "NewCl",
	        email: "newcl@abc.com",
	        phone: "885566224433"
	    },
	    requestedBy: "NewCl",
	    orderItems: [
	        {
	            name: "MedThree",
	            qty: 2,
	            price: 8.9,
	            totalPrice: 17.8,
	            taxPrice: 1.78,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 40,
	                lowStockValue: 20,
	                reOrderValue: 10,
	                 purchasePrice: 8.9,
	                mrp: 9.9,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b289"
	        },
	        {
	            name: "Med Four",
	            qty: 2,
	            price: 10.99,
	            totalPrice: 21.98,
	            taxPrice: 2.19,
	            product: {
	                _id: "61dfe9dd974e9754bbf7ec16",
	                currentStock: 50,
	                lowStockValue: 15,
	                reOrderValue: 10,
	                 purchasePrice: 8.9,
	                mrp: 9.9,
	                tax: 10,
	            },
	            _id: "61e022ec65bf79a5b211b290"
	        }
	    ],
	    createdAt: "2022-01-11T13:02:36.485Z",
	    taxPrice: 0,
	    shippingPrice: 0,
	    itemTotalPrice: 39.78,
	    totalTax: 3.97,
	    orderTotalPrice: 43.75,
	    isApproved: true,
	    isFinanceApproved: false,
	    isPaid: false,
	    isDelivered: false,
	    updatedAt: "2022-01-11T13:02:36.485Z",
	    __v: 0
	},

]


export default orders