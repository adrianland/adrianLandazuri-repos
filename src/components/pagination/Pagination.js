import React from 'react';
import './Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate,currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
<div className='pagination'>
<nav>
      <ul >
        {pageNumbers.map(number => (
          <li key={number}  >
            <a onClick={() => paginate(number)} className={currentPage == number ? 'active':'' } >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
</div>
  );
};

export default Pagination;