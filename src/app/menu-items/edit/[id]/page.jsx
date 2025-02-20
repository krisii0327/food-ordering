"use client"
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Left from "@/components/icons/Left";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage() {
    const {loading: profileLoading, data:profileData} = useProfile();
    const [redirectTo, setRedirectTo] = useState(false);
    const {id} = useParams();

    const [menuItem, setMenuItem] = useState(null);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(item => item._id === id);
                setMenuItem(item)
            });
        });
    } , []);

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data = {...data, _id:id}
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });

            if(response.ok)
            {
                resolve();
            }
            else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item.',
            success: 'Saved',
            error: 'Error',
        })

        setRedirectTo(true);
    }

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items?_id='+id, {
                method: 'DELETE',
            });
            if(response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
        })

        setRedirectTo(true);
    }


    if (profileLoading) {
        return 'Loading info...'
    }

    if(!profileData.admin) {
        return 'Not an admin';
    }

    if(redirectTo) {
        return redirect('/menu-items')
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
            <div className="mx-auto mt-2">
                <div className="ml-72 pl-5 mr-24 max-w-xl">
                    <DeleteButton label={"Delete this menu item"} onDelete={handleDeleteClick}/>
                </div>
            </div>
        </section>
    );
}