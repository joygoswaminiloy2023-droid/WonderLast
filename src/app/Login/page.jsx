'use client'
import React from 'react';
import { HiOutlineMail, HiOutlineLockOpen } from 'react-icons/hi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { BsArrowRightShort } from 'react-icons/bs';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Login = () => {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

const onSubmit = async (data) => {

    
   const {name,email,pass,img}=data;
      
      const { data: res, error } = await authClient.signIn.email({
        email: email, 
        password: pass, 
        callbackURL: "/Destination" 
      });
   if(res){
    toast.success(`Welcome Back ${name}`)
  }
  else if(error){
 console.log(error);
  toast.error(error.message);
  }
     
   
  };

  const handleGoogleSignIn = async () => {
 const data = await authClient.signIn.social({
    provider: "google",
    callbackURL:"/"
  });
 
};

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 selection:bg-cyan-100 relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[5%] -right-[5%] w-[35%] h-[35%] rounded-full bg-cyan-100/40 blur-3xl" />
        <div className="absolute -bottom-[5%] -left-[5%] w-[35%] h-[35%] rounded-full bg-cyan-100/40 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-10">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-white mb-4 shadow-lg shadow-cyan-200">
              <RiShieldKeyholeLine className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 mt-2 font-medium">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Email Address</label>
              <div className="relative text-slate-400 group-focus-within:text-cyan-500">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" />
                <input 
                {...register("email", { required: true })}
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
                <a href="#" className="text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors">Forgot?</a>
              </div>
              <div className="relative text-slate-400 group-focus-within:text-cyan-500">
                <HiOutlineLockOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" />
                <input 
                {...register("pass", { required: true })}
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type='submit' className="w-full mt-2 bg-cyan-500 hover:bg-cyan-800 active:scale-[0.98] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-all shadow-xl shadow-slate-200">
              Sign In
              <BsArrowRightShort className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or login with</span></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 gap-4">
            <button  onClick={handleGoogleSignIn}className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm">
              <FaGoogle className="w-4 h-4 text-red-500" /> Google
            </button>
        
          </div>

          {/* Footer */}
          <p className="text-center text-slate-400 text-sm mt-10 font-medium">
            New here? <Link href="Signup" className="text-cyan-600 font-bold hover:text-cyan-700 transition-colors underline-offset-4 hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;