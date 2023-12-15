"use client"
import { useEffect, useState } from "react";

export function useProfile() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(false);

    useEffect(() => {
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            })
        })
    }, []);

    return {loading, data};
}