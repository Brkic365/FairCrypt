"use client";
import React from 'react'
import Emails from "../../components/Emails";

function page() {
  return (
    <div><Emails/>
    <button onClick={() => {signIn("google")}}>Alo</button>
        </div>
  )
}

export default page