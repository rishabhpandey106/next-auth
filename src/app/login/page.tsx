'use client'
import React , { useEffect, useState } from 'react'
import styles from "./login.module.css"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";


export default function LoginPage() {

  const router = useRouter();

  const [user, setuser] = useState({
    email: "",
    password: ""
  });

  const [loginbtn, setloginbtn] = useState(true)

  const [loading, setloading] = useState(false)

  const onLogin = async (e:any) => {
    try {
      e.preventDefault();
      setloading(true);
      const res = await axios.post("/api/users/login" , user);
      console.log("Login Success - ", res.data);
      toast.success("Login Success !");
      router.push('/profile');
    } catch (error:any) {
      console.log("Login Failed");
      toast.error("Login Failed");
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0)
    {
      setloginbtn(false);
    }
    else
    {
      setloginbtn(true);
    }
  }, [user])


  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.loading}>{loading ? "Processing" : ""}</h1>
        <form className={styles.form}>
          <label className={styles.form} htmlFor="email">Email</label>
          <input className={styles.input} id='email' value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} placeholder='Enter your email' type="text" />
          <label className={styles.form} htmlFor="password">Password</label>
          <input className={styles.input} id='password' value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} placeholder='Enter your password' type="password" />
          <button className={styles.button} type="submit" onClick={onLogin}>{loginbtn ? "Fill The Form" :"Login"}</button>
        </form>
        <h3 className={styles.link}><Link href="/signup">Create Account? Signup</Link></h3>
      </div>
    </div>
  )
}
