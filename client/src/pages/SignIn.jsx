
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {loginStart, loginSuccess, loginFailure} from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';


export default function SignIn() {
    const [formData, setFormData] = useState({});//state to store form data
    const {success, error} = useSelector((state) => state.user);//select success and error state from user slice

    const navigate = useNavigate();//navigate function to navigate to another page 
    const dispatch = useDispatch();//dispatch function to dispatch actions to redux store
    //function to handle form data change event
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value
        });//update form data state
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           dispatch(loginStart());//dispatch login start action
            const response = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            
            if (data.success === false) {
               dispatch(loginFailure(data)); //dispatch login success action
                return;
            }
            dispatch(loginSuccess(data));//dispatch login success action
            // navigate to home page if sign in is successful
            navigate('/');
        }
            catch(error) {
                dispatch(loginFailure(error));//dispatch login failure action
            }

    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder='email' id='email' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
            <input type="password" placeholder='password' id='password' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
            <button disabled={success} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">{success ? 'loading...' : 'Sign In'}</button>

        </form>
        <div className="flex gap-2 mt-5">
            <p>Don't have an acount?</p>
            <Link to={"/sign-up"}><span className="text-blue-500">sign up</span></Link>
            
        </div>
        <p className="text-red-700 mt-5">{error ? error.message || 'Something went wrong' : ""}</p>
    </div>
  )
}
