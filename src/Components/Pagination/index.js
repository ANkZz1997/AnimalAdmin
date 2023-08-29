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
  // console.log("paginationActive",activePage)
  const page = Math.ceil(totalPage / limit);
  return (
    <Root>
      <Pagination
        boundaryRange={10}
        defaultActivePage={active}
        ellipsisItem={null}
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
