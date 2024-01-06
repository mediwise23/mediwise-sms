import { getSession } from '@/lib/auth';
import { getUserById } from '@/service/user';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

  const currentUser = await getSession();

  if (!currentUser?.user) {
    return redirect("/mediwise");
  }

  const { user } = currentUser;

  const data = await getUserById({id: user.id})

  if(!data?.isVerified) {
    return redirect("/mediwise/verify");
  }

  if(data.barangayId) {
    return redirect("/mediwise/patient");
  }
  
  return (
    <div>setup barangay and password</div>
  )
}

export default page