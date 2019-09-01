import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #7159c1;
    text-decoration: none;
    font-size: 15px;

    svg {
      margin-right: 2px;
      font-size: 13px;
    }

    &:hover {
      color: #7159a1;
    }
  }

  img {
    width: 120px;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 13px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 5px;
        }
      }
      p {
        margin-top: 5px;
        color: #999;
        font-size: 12px;
      }
    }
  }
`;

export const Select = styled.select`
  margin-top: 30px;
  width: 100%;
  height: 30px;
  font-size: 15px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 12px;

  button {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: 0;
    transition: opacity 0.25s ease-out;
    color: #484848;
    &:disabled {
      opacity: 0.2;

      cursor: not-allowed;
    }
  }
  span {
    color: #999;
  }
`;
