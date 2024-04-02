"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import styles from './signup.module.css'
import Link from 'next/link';

export default function SignupPage() {

  const router = useRouter();

  const [user, setuser] = useState({
    username : "",
    email : "",
    password : ""
  });

  const [signupbtn, setsignupbtn] = useState(true);

  const [loading, setloading] = useState(false);

  const onSignup = async (e:any) => {
    try {
      e.preventDefault();
      setloading(true);
      const res = await axios.post("/api/users/signup" , user);
      console.log("Signup Success - ", res.data);
      toast.success("SignUp Success !");
      router.push('/login');
    } catch (error:any) {
      console.log("Signup Failed");
      toast.error("Signup Failed");
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0)
    {
      setsignupbtn(false);
    }
    else
    {
      setsignupbtn(true);
    }
  }, [user])
  

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.loading}>{loading ? "Processing" : ""}</h1>
        <form className={styles.form}>
          <label className={styles.form} htmlFor="username">Username</label>
          <input className={styles.input} id='username' value={user.username} onChange={(e) => setuser({ ...user, username: e.target.value })} placeholder='Enter your username' type="text" />
          <label className={styles.form} htmlFor="email">Email</label>
          <input className={styles.input} id='email' value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} placeholder='Enter your email' type="text" />
          <label className={styles.form} htmlFor="password">Password</label>
          <input className={styles.input} id='password' value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} placeholder='Enter your password' type="password" />
          <button className={styles.button} type="submit" onClick={onSignup}>{signupbtn ? "Fill The Form" :"Signup"}</button>
        </form>
        <h3 className={styles.link}><Link href="/login">Have Account? Login</Link></h3>
      </div>
    </div>
  )
}

