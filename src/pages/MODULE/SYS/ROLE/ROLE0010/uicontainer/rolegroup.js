import styled from "styled-components";

export const IndexPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

// title
export const TitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  border-bottom: 2px solid #f3f3f3;
`;
export const TitleSpan = styled.span`
  position: absolute;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  font-size: 2em;
  font-weight: bold;
`;

// tab
export const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding: 30px;
`;

export const InnerTabWrapper = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid gray;
`;

export const InnerTabSpan = styled.span`
  display: inline-block;
  height: 100%;
  line-height: 40px;
  margin: 0 30px 0 0;
  font-size: 1.6em;
  font-weight: bold;
  color: gray;
  box-sizing: border-box;
`;

export const Section = styled.div`
  height: 100%;

  &.roleGroup.left {
    width: 400px;
    border: 2px solid #e6e6e6;
  }

  &.roleGroup.right {
    width: 400px;
    border: 2px solid #e6e6e6;
  }
`;

export const SearchBoxDiv = styled.div`
  height: 110px;
  padding: 18px 15px;
  background-color: #f2f2f2;
`;

export const SelectWrapper = styled.div`
  margin-bottom: 5px;
`;

export const SearchBoxSelect = styled.select`
  width: 100%;
  height: 35px;
  border: 2px solid #e6e6e6;
  font-size: 1.3em;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SearchInput = styled.input`
  width: 87%;
  height: 35px;
  padding-left: 5px;
  margin-right: 5px;
  border: 2px solid #e6e6e6;
  font-size: 1.3em;
  box-sizing: border-box;
`;

export const Button = styled.button`
  height: 35px;
  border: 2px solid #e6e6e6;
  background-color: #f8f8f8;

  &.searchBtn {
    width: 12%;
    height: 35px;
    border: 2px solid #e6e6e6;
    background-color: #f8f8f8;
  }
`;

export const GroupInfoSection = styled.div`
  height: 50px;
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
`;

export const GroupCountWrapper = styled.div`
  height: 50px;
  line-height: 50px;
  width: 100px;
  padding-left: 10px;

  & span {
    font-size: 1.3em;
    font-weight: bold;
  }

  & span:nth-of-type(2) {
    color: #46a3fb;
  }
`;

export const GroupListSection = styled.div`
  height: calc(100% - 220px);
  background-color: #fafafa;
  padding: 10px;
  overflow-y: auto;
`;

export const GroupItemWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  border: 2px solid #e6e6e6;
  border-radius: 10px;
  padding: 17px 20px;
  margin-bottom: 5px;

  &.active {
    background-color: #e5f6ff;
    border: 2px solid #46a3fb;
  }

  & span:nth-of-type(1) {
    position: relative;
    top: 0;
    font-size: 1.5em;
    color: gray;
    font-weight: bold;
    display: block;
  }

  & span:nth-of-type(2) {
    position: relative;
    top: 25px;
    font-size: 1.8em;
    font-weight: bold;
    display: block;
  }

  & button {
    border: solid red 1px;
    position: relative;
    right: 0;
  }
`;

export const LeftSectionFooter = styled.div`
  height: 60px;
  background-color: #f2f2f2;
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding-top: 10px;
`;

export const PaginationUl = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const PaginationLi = styled.li`
  height: 28px;
  width: 28px;
  line-height: 20px;
  padding: 0 5px;
  border: 2px solid #e6e6e6;
  background-color: white;
  font-size: 1.2em;
  font-weight: bold;
  margin: 2px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  &.prev, &.next {
    font-size: 1.7em;
  }

  &.page {
    border: 0;
    background-color: transparent;
    margin: 4px 5px;
  }
`;

export const PageSizeSelect = styled.select`
  height: 28px;
  width: 28px;
  line-height: 20px;
  padding: 0 5px;
  border: 2px solid #e6e6e6;
  background-color: white;
  font-size: 1.2em;
  font-weight: bold;
  margin: 2px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  //width: 60px;
  //font-size: 1.3em;
  outline: none;
`;

export const ContentDiv = styled.div`
  width: 100%;
  height: calc(100% - 55px);
  margin-top: 15px;
  display: flex;
`;
