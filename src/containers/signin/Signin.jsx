import './signin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { Button,Checkbox,CircularProgress,FormControlLabel,TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import image from '../../assets/homeImg.jpg'

const Signin = () => {
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit= async (data)=>{
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://127.0.0.1:8000/signin', data);
      const { token } = response.data; // Extract JWT token from response
      localStorage.setItem('token', token); // Store token in localStorage
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
    finally{
      setLoading(false);
    }
  }
  return (
<div className="Auth">
      <img src={image} alt="" />
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4'color="#FF8A71">Sign In</Typography>
        
        <div className="formgroup">
        <TextField 
        {...register('email',{required:"Email Field Required"})} 
        type='email' label="Email"  variant="outlined" />
        <Typography color="error" variant='span'>{errors?.email && errors.email.message}</Typography>

        <TextField 
        {...register('password',{required:"Password Field Required",
        maxLength:{value:15,message:"Maximun 15 Characters"},
        minLength:{value:4,message:"Minimun 4 Characters"}})} 
        type='password' label="Password"  variant="outlined" />
        <Typography color="error" variant='span'>{errors?.password && errors.password.message}</Typography>

        <FormControlLabel control={<Checkbox color="error"/>} label="Se souvenir de moi" />
        {loading ? (
            <Button type='submit' variant="contained">
              <CircularProgress color="primary" sx={{ color: 'white' }}/>
            </Button>
          ) : (
            <Button type='submit' variant="contained">Se connecter</Button>
          )}
          {error && (
            <Typography color="error" variant="span">{error}</Typography>
          )}
 
        </div>
      </form>
    
    </div>
  );
}

export default Signin;