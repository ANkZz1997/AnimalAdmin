import React, { useEffect, useState } from 'react';
import { Pagination } from 'semantic-ui-react';
import styled from 'styled-components';
export default function PaginationCode({
  active,
  activePage,
  totalPage,
  limit,
}) {
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
        }}
      />
    </Root>
  );
}

const Root = styled.section`
  text-align: center;
  margin-top: 40px;
  .pagination {

    justify-content: center;
    a.page-link {
      background: transparent;
    }
    span.sr-only {
      display: none;
    }
  }
`;
