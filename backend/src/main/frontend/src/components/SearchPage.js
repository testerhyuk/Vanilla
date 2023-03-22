import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductList from './ProductList';
import './css/SearchPage.css'
import useDebounce from './hooks/useDebounce';

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get('keyword')
    const debouncedSearchTerm = useDebounce(searchTerm, 800)

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchProduct(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm])
    
    const fetchSearchProduct = async (searchTerm) => {
        try {
            const request = await axios.get(
                `http://localhost:8080/api/product/search?keyword=${searchTerm}`
            );
            setSearchResults(request.data)
        } catch (error) {
            console.log("error", error)
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <ProductList product={searchResults} pageTag={"검색 결과"} />
        )
        :
        (
            <section className='no-results'>
                <div className='no-results_text'>
                    <p>
                        찾고자하는 검색어 "{debouncedSearchTerm}" 에 맞는 상품이 없습니다.
                    </p>
                </div>
            </section>
        )
    }
    return renderSearchResults();
}
