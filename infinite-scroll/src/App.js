import { useCallback, useEffect, useState } from 'react';
import './App.css';
import InfiniteScroll from './InfiniteScroll';

function App() {
  const [query, setQuery] = useState('');
  const [listData, setlistData] = useState([]);

  const onInputChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const getData = useCallback((query, pageNumber) => {
    return new Promise(async (resolve, reject) => {
      let prom = await fetch('https://openlibrary.org/search.json?' + new URLSearchParams({ q: query, page: pageNumber }));
      let res = await prom.json();
      setlistData((prevData) => [...prevData, ...res.docs]);
      resolve();
    })
  })

  return (
    <>
      <input type='text' value={query} onChange={onInputChange}></input>
      <InfiniteScroll query={query} getData={getData} listData={listData} />
    </>
  );
}

export default App;
