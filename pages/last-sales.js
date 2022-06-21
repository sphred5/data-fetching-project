import { useEffect, useState } from "react";
import useSWR from 'swr';

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR(process.env.NEXT_PUBLIC_DUMMY_API_ENDPOINT, fetch(url).then(res => res.json()));
    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                });
            }
            setSales(transformedSales);
        }
    }, [data])

    if (error) {
        return <p>Failed to load.</p>
    }
    if (!data && !sales) {
        return <p>Loading...</p>
    }


    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch(process.env.NEXT_PUBLIC_DUMMY_API_ENDPOINT)
    //         .then(response => response.json().then(data => {
    //             setIsLoading(false)
    //             const transformedSales = [];
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 })
    //             }
    //             setSales(transformedSales)
    //         }));
    // }, []);
    // if (isLoading) return <p>Loading...</p>;

    // if(!sales) return <p>No Sales Yes...</p>;
    // return (
    //     <ul>
    //         {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}    
    //     </ul>
    // ) 


}


export async function getStaticProps() {
    const response = await fetch(process.env.NEXT_PUBLIC_DUMMY_API_ENDPOINT)
    const data = await response.json();

    const transformedSales = [];

    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        });
    }

    return { props: { sales: transformedSales }};
}

export default LastSalesPage