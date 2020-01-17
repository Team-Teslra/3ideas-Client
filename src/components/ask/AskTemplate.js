import React from 'react';

const AskTemplate = (props) => {
  const { id, title, contents, username, createdAt, updatedAt } = props;

  return (
    <div>
      <h3>질문글</h3>
      <ul>
        <li>id: {id}</li>
        <li>title: {title}</li>
        <li>contents: {contents}</li>
        <li>username: {username}</li>
        <li>createdAt: {createdAt}</li>
        <li>updatedAt: {updatedAt}</li>
      </ul>
    </div>
  );
};

export default AskTemplate;
