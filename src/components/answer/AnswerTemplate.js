import React from 'react';

const AnswerTemplate = (props) => {

  const { id, username, contents, answerFlag, like, createdAt, updatedAt } = props.answerContents;
  const { editedAnswerContents, havePermission, isEditable, modifyAnswer, deleteAnswer, handleInputChange, toggleIsEditable, postLike, deleteLike, myUserName, isLogin } = props;
  const style = { listStyle: 'none', fontSize: '13px' }
  const likers = (function (like) {  // ? 즉시실행함수로 likers에 각 답변에 좋아요를 한 사람을 배열로 저장
    var result = [];
    for (let i =0; i < like.length; i++) {
      result.push(like[i].username)
    }
    return result;
  })(like);

  return (
    <div>
      {console.log(`${id}번 답변을 좋아한 유저 : ${likers}, `,`현재 로그인 중인유저: ${myUserName}`)}
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
    </div>
  );
};

export default AnswerTemplate;
