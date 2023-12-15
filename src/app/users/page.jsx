"use client"
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const {loading: profileLoading, data:profileData} = useProfile();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => {
                setUsers(users);
            });
        });
    }, [])

    if (profileLoading) {
        return 'Loading info...'
    }

    if(!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div key={user._id} className="flex items-center gap-4 bg-gray-100 rounded-lg mb-2 p-1 px-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-gray-700">
                                {user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray-600">{user.email}</span>
                        </div>
                        <div>
                            <Link href={'/users/' + user._id} className="button">Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}