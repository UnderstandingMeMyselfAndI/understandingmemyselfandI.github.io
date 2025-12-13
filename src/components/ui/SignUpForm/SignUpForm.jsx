// src/components/SignUpForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // npm install zod
import { zodResolver } from '@hookform/resolvers/zod'; // npm install @hookform/resolvers

import { useAuthentication } from '../hooks/useAuthentication'; // Your custom hook

// --- Zod Schema for Validation ---
const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // set the error on the confirmPassword field
});


const SignUpForm = () => {
  const { signUp } = useAuthentication();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await signUp(email, password);
    
    if (result.success) {
      // Handle success, e.g., redirect to the dashboard
      console.log("Sign up successful! User:", email);
    } else {
      // Handle error display
      alert(`Sign Up Failed: ${result.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <h3>Create Your Account</h3>
      
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          {...register("email")} // Connects to React Hook Form
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          {...register("password")}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword" 
          type="password" 
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;