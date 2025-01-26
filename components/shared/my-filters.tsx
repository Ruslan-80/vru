import axios from "axios";
import { useState, useEffect } from "react";

export const MyFilters = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/filters`
                );
                setData(response.data);
            } catch (error) {
                setError(error as unknown as null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading filters</div>;
    }

    if (!data.length) {
        return (
            <h1 className="text-2xl text-center mt-10">Фильтры не найдены</h1>
        );
    }

    return (
        <>
            <div>MyFilters</div>
            {data.map((item: { id: string; name: string }) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </>
    );
};
