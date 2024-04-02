'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {

    const router = useRouter();

    const [profile, setprofile] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {
        onProfile();
    }, [])

    const onProfile = async () => {
      const res:any = await axios.post("/api/users/profile");
      console.log(res.data.data.username , "and" , res.data.data.email);
      setprofile({
          username: res.data.data.username ,
          email: res.data.data.email
      });
    }

    const onLogout = async (e:any) => {
        try {
            e.preventDefault();
            const res:any = await axios.get("/api/users/logout");
            toast.success("Logout Success !");
            console.log(res);
            router.push("/login");
        } catch (error:any) {
            toast.error("Cant Logout !");
        }
    }
    
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.loading}>Profile</h1>
        <form className={styles.form}>
          <label className={styles.form} htmlFor="email">{profile?.email}</label>
          <h3 className={styles.loading}><Link className={styles.profile} href={`/profile/${profile?.username}`} >{profile?.username}</Link></h3>
          <button className={styles.button} type="submit" onClick={onLogout}>Logout</button>
        </form>
      </div>
    </div>
  )
}
