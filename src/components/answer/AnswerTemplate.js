import React from 'react';
import { Link } from 'react-router-dom';

const AnswerTemplate = (props) => {


  const { id, username, contents, answerFlag, like, createdAt, updatedAt } = props.answerContents;
  const { editedAnswerContents, havePermission, isEditable, modifyAnswer, deleteAnswer, handleInputChange, toggleIsEditable, 
          rank, isSelectable, selectedAnswers, addSelectedAnswer, removeSelectedAnswer, postSelectAnswers, postLike, deleteLike, myUserName, isLogin } = props;
  
  const rankColors = {
    '1': 'tomato',
    '2': 'orange',
    '3': 'gold'
  }
  let number = rank || answerFlag; 

  const style = {
    listStyle: 'none', 
    fontSize: '13px',
    backgroundColor: rankColors[number]
  }

  const nextRank = selectedAnswers.length + 1;

  const likers = (function (like) {  // ? 즉시실행함수로 likers에 각 답변에 좋아요를 한 사람을 배열로 저장
    var result = [];
    for (let i =0; i < like.length; i++) {
      result.push(like[i].username)
    }
    return result;
  })(like);
  
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
        <li>username: <Link to={`/user/${username}`}>{username}</Link></li>
        <li>createdAt: {createdAt}</li>
        <li>updatedAt: {updatedAt}</li>
        <li>likes: {like.length}</li>
        { !havePermission && isLogin && !likers.includes(myUserName) && <button onClick={postLike}>좋아요!</button>}
        { !havePermission && isLogin && likers.includes(myUserName) && <button onClick={deleteLike}>좋아요 취소</button>}
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
