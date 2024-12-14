import React from 'react'
import styles from "../../styles/Searchbar.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

function SearchBar({searchResults}) {
  return (
    <div className={styles.searchComponent}>
        
        <div className={styles.searchBar}>
        <SearchIcon/>
            <input type="text" placeholder="Search for an email..."/>
            
            <div className={styles.filter}>
                <FilterListIcon/>
                </div>
            </div>
        <div className={styles.resultPagination}>
        <h5>{searchResults || 0} SEARCH RESULTS FOUND</h5>
            </div>

    </div>
  )
}

export default SearchBar