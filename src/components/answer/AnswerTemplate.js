import React from 'react';

const AnswerTemplate = (props) => {

  const { id, contents, username, createdAt, updatedAt } = props.answerContents;
  const { editedAnswerContents, havePermission, isEditable, modifyAnswer, deleteAnswer, handleInputChange, toggleIsEditable } = props;
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
