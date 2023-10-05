import React, { useEffect, useState } from "react";
import { Pagination } from "semantic-ui-react";
import styled from "styled-components";
import { scrollTopFunction } from "../../utils/https";

export default function PaginationCode({
  active,
  activePage,
  totalPage,
  limit,
}) {
  const page = Math.ceil(totalPage / limit);

  // Calculate the page range to display
  const maxPagesToShow = 10;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
  const currentPage = active || 1;
  let startPage, endPage;

  if (page <= maxPagesToShow) {
    // Less than or equal to 10 pages, show all pages
    startPage = 1;
    endPage = page;
  } else if (currentPage <= halfMaxPagesToShow) {
    // First few pages
    startPage = 1;
    endPage = maxPagesToShow;
  } else if (currentPage + halfMaxPagesToShow >= page) {
    // Last few pages
    startPage = page - maxPagesToShow + 1;
    endPage = page;
  } else {
    // Middle pages
    startPage = currentPage - halfMaxPagesToShow;
    endPage = currentPage + halfMaxPagesToShow;
  }

  const pageNumbers = [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);

  return (
    <Root>
      <Pagination
        boundaryRange={0}
        defaultActivePage={active}
        ellipsisItem="..."
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={page}
        onPageChange={(event, data) => {
          activePage(data.activePage);
          scrollTopFunction();
        }}
      />
    </Root>
  );
}

const Root = styled.section`
  text-align: center;
  margin-top: 40px;

  .ui.pagination.menu {
    background: transparent;
    border: 1px solid white;
  }
  .ui.pagination.menu .active.item {
    border-top: none;
    padding-top: 0.92857143em;
    background-color: rgb(255 255 255 / 32%);
    color: rgb(255 255 255 / 95%);
    box-shadow: none;
  }
  .ui.pagination.menu .active.item :hover {
    background-color: rgb(255 255 255 / 32%);
  }
  .ui.pagination.menu .item {
    min-width: 3em;
    text-align: center;
    color: white;
  }
`;
