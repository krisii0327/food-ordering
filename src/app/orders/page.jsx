"use client"
import { useState, useEffect } from "react";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import {dbTimeForHumans} from "@/libs/datetime";
import Link from "next/link";

export default function OrdersPage() {
    const {loading: profileLoading, data:profileData} = useProfile();
    const [loadingOrders, setLoadingOrders] = useState(true);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])

    function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
            })
        })
        setLoadingOrders(false);
    }

    if (profileLoading) {
        return 'Loading info...'
    }

    if(!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profileData.admin} />
            <div className="mt-8">
                {loadingOrders && (
                    <div>Loading order...</div>
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div key={order._id} className="bg-gray-200 mb-2 p-4 rounded-lg flex md:flex-row items-center gap-6">
                        <div className="flex items-center gap-3 md:gap-6 grow">
                            <div>
                                <div className={(order.paid ? 'bg-green-500' : 'bg-red-400') + ' text-white p-2 rounded-md w-20 text-center'}>
                                    {order.paid ? 'Paid' : 'Not paid'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex flex-col md:flex-row md:gap-2 md:items-center mb-1">
                                    <div className="grow">{order.userEmail}</div>
                                    <div className="text-gray-500 text-sm">{dbTimeForHumans(order.createdAt)}</div>
                                </div>
                                <div>
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="md:justify-end flex gap-2 items-center md:whitespace-nowrap">
                            <Link href={"/orders/"+order._id} className="button">
                                <div className="text-center">
                                    Show order
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}