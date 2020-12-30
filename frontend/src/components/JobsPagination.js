import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function JobsPagination({ page, setPage, hasNextPage }) {
    //Helper function that sets the prev page +1 amount and agives the functionaliity of the buttons actually changing through pages.
    function adjustPage(amount) {
      setPage(prevPage => prevPage + amount)
    }
  
    return (
      <Pagination>
        {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
        {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
        {page > 2 && <Pagination.Ellipsis />}
        {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{page - 1}</Pagination.Item>}
        <Pagination.Item active>{page}</Pagination.Item>
        {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
        {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
      </Pagination>
    )
  }

