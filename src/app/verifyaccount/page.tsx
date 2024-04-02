'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import styles from "./verifyaccount.module.css"
import { useRouter } from 'next/navigation';

export default function verifyPage() {

    const router = useRouter();

    const [token, settoken] = useState("");

    const [verified, setverified] = useState(false)
    
    const onVerify = async (e:any) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/users/verifyaccount", {token});
            setverified(true);
            toast.success("Account Verified !");
            console.log("Sent for verification - ", res.data)
        } catch (err:any) {
            console.log("Error in Verification");
            toast.error("Error in Verification");
        }
    }

    useEffect(() => {
        const token = window.location.search.split("=")[1];
        settoken(token);
    },[])
    

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {verified ? (
          <>
            <h2 className={styles.title}>Now you can login</h2>
            <button className={styles.button} onClick={() => router.push('/login')}>
              Go to Login
            </button>
          </>
        ) : (
          <>
            <h2 className={styles.title}>
              To verify your account, please click on the Verify button
            </h2>
            <button className={styles.button} onClick={onVerify}>
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  )
}

