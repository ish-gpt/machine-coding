import React, { useEffect, useState } from 'react'

let InfiniteScroll = function InfiniteScroll(props) {
    let { query, getData, listData } = props;
    let [loading, setLoading] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (query)
            setLoading(true);
        getData(query, pageNumber).then(() => {
            if (listData.length) setLoading(false);
            setLoading(false);
        });
    }, [query, pageNumber]);

    useEffect(() => {
        let observer = new IntersectionObserver((param) => {
            if (param[0].isIntersecting) {
                observer.unobserve(lastDivElement);
                setPageNumber(pageNumber => pageNumber + 1);
            }
        });

        let lastDivElement = document.querySelector('.item-list:last-child');
        if (!lastDivElement) return;
        observer.observe(lastDivElement);

        return () => {  //clean up code.
            if (lastDivElement)
                observer.unobserve(lastDivElement);
            observer.disconnect();
        }
    }, [listData])


    return (
        <>
            {
                listData.map((data) => {
                    return <div className='item-list' key={data.title}>{data.title}</div>
                })
            }
            {
                loading && 'LOADING....'
            }
        </>
    )
}

export default InfiniteScroll;
