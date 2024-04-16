
import { useState } from 'react';
import {Link} from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({});//state to store form data
    
    const [error, setError] = useState(false);//state to store error message
    const [success, setSuccess] = useState(false);//state to store success message
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value
        });//update form data state
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSuccess(true);//set success state
            setError(false);//reset error state
            const response = await fetch('/api/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            setSuccess(false);//reset success state
            if (data.success === false) {
                setError(true);//set error state
                return;
            }/*if the response is not successful, set error state*/
            location.reload();//reload the page
        }
            catch(error) {
                setSuccess(false);
                setError(true);
            }

    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder='username' id='username' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
            <input type="text" placeholder='email' id='email' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
            <input type="password" placeholder='password' id='password' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
            <button disabled={success} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">{success ? 'loading...' : 'Sign Up'}</button>

        </form>
        <div className="flex gap-2 mt-5">
            <p>have an acount?</p>
            <Link to={"/sign-in"}><span className="text-blue-500">sign in</span></Link>
            
        </div>
        <p className="text-red-700 mt-5">{error && 'Something went wrong'}</p>
    </div>
  )
}
