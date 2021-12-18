import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./loginapp.css";
import FormInput from "../components/FormInput";
import { useDispatch, useSelector } from 'react-redux'
// import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createUser, listPackages } from '../actions/adminActions'
import { CLIENT_CREATE_RESET } from '../constants/adminConstants'


const NewClientAddScreen = () => {
	const [values, setValues] = useState({
		name:"",
	    firstname: "",
	    lastname: "",
	    email: "",
	    company: "",
	    role: "",
	    address: "",
	    pack: "",
	    isAdmin: "",
	    isClientAdmin: "",
	    phone:"",
	    zipcode:"",
	    dob:"",
	    city:"",
	    state:""
	  });


	const inputs = [
	    {
	      id: 1,
	      name: "firstname",
	      type: "text",
	      placeholder: "First Name",
	      errorMessage:
	        "Required 3-16 characters and shouldn't include any special character!",
	      label: "First Name",
	      pattern: "^[A-Za-z0-9]{3,16}$",
	      required: true,
	    },
	    {
	      id: 2,
	      name: "lastname",
	      type: "text",
	      placeholder: "Last Name",
	      errorMessage:
	        "Required 3-16 characters and shouldn't include any special character!",
	      label: "Last Name",
	      pattern: "^[A-Za-z0-9]{3,16}$",
	      required: true,
	    },
	    {
	      id: 3,
	      name: "phone",
	      type: "text",
	      placeholder: "Phone",
	      pattern: "^[0-9]{0,10}$",
	      errorMessage: "Enter only numbers",
	      label: "Phone",
	      required: true,
	    },
	    {
	      id: 4,
	      name: "email",
	      type: "email",
	      placeholder: "Email",
	      errorMessage: "Enter a valid email address!",
	      label: "Email",
	      required: true,
	    },
	    {
	      id: 5,
	      name: "zipcode",
	      type: "text",
	      placeholder: "Zip Code",
	      pattern: "^[0-6]{0,10}$",
	      errorMessage: "Enter only numbers",
	      label: "Zip Code",
	      required: true,
	    },
	    // {
	    //   id: 6,
	    //   name: "isClientAdmin",
	    //   type: "checkbox",
	    //   placeholder: "Is the user a Client Admin",
	    //   label: "Is the user a Client Admin",
	    // },
	    {
	      id: 7,
	      name: "dob",
	      type: "date",
	      placeholder: "DOB",
	      label: "DOB",
	    },
	    
	  ];

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const clientCreate = useSelector(state => state.clientCreate)
	const { loading, success, error } = clientCreate

	const packageList = useSelector(state => state.packageList)
	const { loading : loadingPackage , error: errorPackage , packages } = packageList


	  useEffect(() => {
			dispatch({ type: CLIENT_CREATE_RESET })
			dispatch(listPackages())

			if(!userInfo.isAdmin){
				if(success){			
					navigate('/admin/clientlist')
				} 
			}

			if(success){			
				navigate('/userlist')
			} 
				 
		},[success, navigate, dispatch])

	const submitHandler = (e) => {
		e.preventDefault()
		// console.log(values)
		dispatch(createUser({
			name: values.name, email:values.email, company: values.company || userInfo.company, role: values.role, 
			address: values.address, packageName: values.pack || userInfo.package ,isAdmin: values.isAdmin, 
			isClientAdmin: values.isClientAdmin, city: values.city, state: values.state, dob: values.dob, 
			firstname: values.firstname, lastname: values.lastname
		}))

	}

	  const onChange = (e) => {
	    setValues({ ...values, [e.target.name]: e.target.value });
	  };



	return(
		<>
		<Link to='/admin/clientlist' className='btn btn-dark my-3'>Go Back</Link>
			
				{ loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
				<div className='logapp'>
			      <form onSubmit={submitHandler} className='loginform'>
			        <h1>Add User</h1>
			        {inputs.map((input) => (
			          <FormInput
			            key={input.id}
			            {...input}
			            value={values[input.name]}
			            onChange={onChange}
			          />
			        ))}

			        <button className='loginbutton'>Submit</button>
			      </form>
			    </div>
			    ) }
				
		</>
		)
}


export default NewClientAddScreen