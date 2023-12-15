"use client"
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
    const {loading: profileLoading, data:profileData} = useProfile();

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }, [])

    if (profileLoading) {
        return 'Loading info...'
    }

    if(!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link className="button flex" href={'/menu-items/new'}>Create new menu items <Right /></Link>
            </div>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/' + item._id} key={item._id} className="flex-col items-center button mb-1 bg-gray-200 rounded-lg p-4">
                            <div className="relative w-24 h-24">
                                <Image src={item.image} alt={''} layout={'fill'} className="rounded-md"></Image>
                            </div>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}