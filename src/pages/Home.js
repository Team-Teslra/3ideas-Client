import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const { isLogin, username } = props;

  return (
    <div>
      <p>메인에 들어왔을 때 가장 처음 보이는 페이지</p>
      <Link to={'/ask'}>질문하기</Link>
      <Link to={'/asks'}>질문목록</Link>
    </div>
  );
};

export default Home;
