import React, { useEffect } from 'react'

const Pagination = ({ page, hasNextPage, setPage }) => {

  useEffect(() => {
    window.scrollTo({
      top: 1024,
      behavior: 'smooth'
    });
  }, [page])
  

  return (
    <div className='pagination'>
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={!hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination