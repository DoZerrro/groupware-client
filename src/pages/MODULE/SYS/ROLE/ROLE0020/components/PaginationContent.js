import React from "react";
import {
  Option,
  PageBtn,
  PageImage,
  PageSizeSelect,
  Pagination,
  PaginationWrap,
} from "./StyledCommon";

const PaginationContent = ({ response, pageClickHandler, selectChangeHandler }) => {
  return (
    <PaginationWrap>
      <Pagination>
        <PageBtn className="pageBtn prev first" data-page={response.first}><PageImage src="/images/btn-arrow-first.png" alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageBtn className="pageBtn prev" data-page={response.prev}><PageImage src="/images/btn-arrow-prev.png" alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        {
          response.start > 0
          && [...new Array((response.end - response.start + 1) < response.pageLimit
            ? response.end - response.start + 1 : response.pageLimit)]
            .map((i, idx) => (response.start + idx))
            .map((num) => <PageBtn key={num} className={`pageBtn page ${response.pageRequestDTO?.page === num ? "active" : ""}`} onClick={pageClickHandler} aria-hidden="true" data-page={num}>{num}</PageBtn>)
        }
        <PageBtn className="pageBtn next" data-page={response.next}><PageImage src="/images/btn-arrow-next.png" alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageBtn className="pageBtn next last" data-page={response.last}><PageImage src="/images/btn-arrow-last.png" alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageSizeSelect value={response.size} onChange={selectChangeHandler}>
          <Option>10</Option>
          <Option>20</Option>
          <Option>30</Option>
        </PageSizeSelect>
      </Pagination>
    </PaginationWrap>
  );
};

export default PaginationContent;

