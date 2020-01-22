import React from 'react';
import { Link } from 'react-router-dom';

const AskTemplate = props => {
  const {
    havePermission,
    modifyAsk,
    deleteAsk,
    handleInputChange,
    toggleIsEditable,
    isEditable,
    editedAskContents,
  } = props;
  const { id, title, contents, username, createdAt, updatedAt } = props.askContents;
  return (
    <div>
      <h3>질문글</h3>
      <ul>
        <li>id: {id}</li>
        {isEditable ? (
          <input type="text" name="title" value={editedAskContents.title} onChange={e => handleInputChange(e)} />
        ) : (
          <li>title: {title}</li>
        )}
        {isEditable ? (
          <textarea name="contents" value={editedAskContents.contents} onChange={e => handleInputChange(e)}></textarea>
        ) : (
          <li>contents: {contents}</li>
        )}
        <li>
          username: <Link to={`/user/${username}`}>{username}</Link>
        </li>
        <li>createdAt: {createdAt}</li>
        <li>updatedAt: {updatedAt}</li>
      </ul>
      {havePermission ? (
        isEditable ? (
          <button onClick={toggleIsEditable}>수정 취소하기</button>
        ) : (
          <button onClick={toggleIsEditable}>질문글 수정하기</button>
        )
      ) : null}
      {havePermission && isEditable && <button onClick={modifyAsk}>modifyAsk 실행</button>}
      {havePermission && <button onClick={deleteAsk}>deleteAsk 실행</button>}
    </div>
  );
};

export default AskTemplate;
