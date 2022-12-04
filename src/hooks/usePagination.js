import {useState,useEffect} from 'react';

export function usePagination(count, apiCall , subject) {
    const [results,setResults]= useState([]); 
    const [page,setPage]= useState(0);
    const [total,setTotal]= useState(0);
    const [loading,setLoading]= useState(false);

    useEffect(()=>{
        setLoading(true);
        apiCall (count ,page,subject)
        .then(({data})=>{
            setResults(data.profes);
            setTotal(data.cantidad);
        })
        .catch((err)=>console.log(err))
        .finally(()=> setLoading(false));

    },[page]);

    const nextPage = () => {
        setPage(page+1);

    };

    const prevPage = () => {
        setPage(page-1);

    };

    const canNextPage = () => {
        const currentPage = page+1;
        const lastPage = Math.ceil(total/count);
        return currentPage !== lastPage;

    };

    
    const canPrevPage = () => {
        
        return page !== 0;

    };

    return {
        results,
        total,
        loading,
        nextPage,
        prevPage,
        canNextPage,
        canPrevPage,
    };

}