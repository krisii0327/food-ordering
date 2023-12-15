"use client"
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const {loading: profileLoading, data:profileData} = useProfile();
    const {id} = useParams();

    const [userData, setUserData] = useState([]);

    
    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
            res.json().then(user => {
                setUserData(user);
            })
        })
    }, [])

    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id: id}),
            });

            if(res.ok) {
                resolve();
            }
            else {
                reject();
            }
        })

        toast.promise(promise, {
            loading: 'Saving...',
            success: 'User saved',
            error: 'Error'
        })
    }

    if (profileLoading) {
        return 'Loading info...'
    }

    if(!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={userData} onSave={handleSaveButtonClick}/> 
            </div>
        </section>
    )
}