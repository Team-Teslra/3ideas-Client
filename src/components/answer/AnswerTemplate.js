import React from 'react';

const AnswerTemplate = (props) => {

  const { id, contents, username, createdAt, updatedAt } = props.answerContents;
  const { editedAnswerContents, havePermission, isEditable, modifyAnswer, deleteAnswer, handleInputChange, toggleIsEditable, 
          rank, isSelectable, selectedAnswers, addSelectedAnswer, removeSelectedAnswer, postSelectAnswers, answerFlag } = props;
          
  const nextRank = selectedAnswers.length + 1;
  let number = rank || answerFlag;

  const rankColors = {
    '1': 'tomato',
    '2': 'orange',
    '3': 'gold'
  }
  
  const style = {
    listStyle: 'none', 
    fontSize: '13px',
    backgroundColor: rankColors[number]
  }
  
  const confirmSelect = () => {
    if(window.confirm('답변 선택은 되돌릴 수 없습니다. 제출하시겠습니까?')) {
      console.log('답변 선택하여 제출 성공');
      postSelectAnswers();
    } else {
      removeSelectedAnswer(id);
    }
  }

  return (
    <div style={style}>
      <h5>답글</h5>
      <ul>
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
      <div>
        {isSelectable?
          rank ? <button onClick={() => removeSelectedAnswer(id)}>답변선택 취소하기</button> 
            : <button onClick={() => addSelectedAnswer(id)}>{nextRank}위 답변으로 선택</button>
          : null
        }
      </div>
      {rank === 3 ? <button onClick={() => confirmSelect()}>선택한 답변들을 최종 답변으로 제출하기</button> : null}
      {rank === 3 ? <button onClick={() => removeSelectedAnswer(id)}>답변 다시 선택하기</button> : null}
    </div>
  );
};

export default AnswerTemplate;
