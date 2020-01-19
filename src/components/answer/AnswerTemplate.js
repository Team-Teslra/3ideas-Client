import React from 'react';

const AnswerTemplate = (props) => {

  const { id, contents, username, createdAt, updatedAt, like } = props.answerContents;
  const { editedAnswerContents, havePermission, isEditable, modifyAnswer, deleteAnswer, handleInputChange, toggleIsEditable, didLike, postLike, deleteLike } = props;
  const style = { listStyle: 'none', fontSize: '13px' }

  return (
    <div>
      <h5>답글</h5>
      <ul style={style}>
        <li>id: {id}</li>
        {isEditable ? 
          <textarea name="contents" value={editedAnswerContents.contents} onChange={(e) => handleInputChange(e)}></textarea>
          : <li>contents: {contents}</li>
        }
        <li>username: {username}</li>
        <li>createdAt: {createdAt}</li>
        <li>updatedAt: {updatedAt}</li>
        <li>likes: {like}</li>
        { !havePermission && !didLike && <button onClick={postLike}>좋아요!</button>}
        { !havePermission && didLike && <button onClick={deleteLike}>좋아요 취소</button>}
      </ul>
      { havePermission ? 
        isEditable ? 
          <button onClick={toggleIsEditable}>수정취소</button> 
          : <button onClick={toggleIsEditable}>답글수정</button> 
        : null
      }
      { havePermission && isEditable && <button onClick={modifyAnswer}>전송하기</button>}
      { havePermission && <button onClick={deleteAnswer}>답글삭제</button>}
    </div>
  );
};

export default AnswerTemplate;
