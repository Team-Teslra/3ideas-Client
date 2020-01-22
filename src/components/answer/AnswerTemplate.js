import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Input, PageHeader, Typography, Descriptions, Avatar, Icon } from 'antd';

const { Paragraph, Title } = Typography;
const { TextArea } = Input;

const AnswerTemplate = props => {
  const { id, username, contents, answerFlag, like, createdAt, updatedAt } = props.answerContents;
  const {
    editedAnswerContents,
    havePermission,
    isEditable,
    modifyAnswer,
    deleteAnswer,
    handleInputChange,
    toggleIsEditable,
    rank,
    isSelectable,
    selectedAnswers,
    addSelectedAnswer,
    removeSelectedAnswer,
    postSelectAnswers,
    postLike,
    deleteLike,
    myUserName,
    isLogin,
  } = props;

  const rankColors = {
    '1': '#DCEEFF',
    '2': '#F8F8F8',
    '3': '#F8F8F8',
  };

  let number = rank || answerFlag || 0;

  const styleBackground = {
    backgroundColor: rankColors[number],
    padding: '10px',
    marginBottom: '10px'
  };

  const nextRank = selectedAnswers.length + 1;

  const likers = (function(like) {
    // ? 즉시실행함수로 likers에 각 답변에 좋아요를 한 사람을 배열로 저장
    var result = [];
    for (let i = 0; i < like.length; i++) {
      result.push(like[i].username);
    }
    return result;
  })(like);

  const confirmSelect = () => {
    if (window.confirm('답변 선택은 되돌릴 수 없습니다. 제출하시겠습니까?')) {
      console.log('답변 선택하여 제출 성공');
      postSelectAnswers();
    } else {
      removeSelectedAnswer(id);
    }
  };

  const styleAnswerTemplate = { margin: '30px 0', borderBottom: '1px solid #ededed'};
  const styleUsername = { borderBottom: '1px solid #d5d5d5', paddingBottom: '2px'};
  const styleContents = { margin: '10px 0'};
  
  return (
    <div style={styleAnswerTemplate}>
      <div style={styleBackground}>
        <Row type="flex">
          <Col span={3}>
            <p>좋아요</p>
            {like.length ? <Title level={4} type="warning">{like.length}</Title> : <Title level={4} disabled>{like.length}</Title> }
            <p>답변순위</p>
            {number ? <Title level={3} type="danger">{number}</Title> : <Title level={3} disabled>0</Title> }
          </Col>
          <Col span={21}>
            <span style={styleUsername}><Link to={`/user/${username}`}>{username}</Link>의 아이디어</span>
            {isEditable ? (
              <textarea
                name="contents"
                value={editedAnswerContents.contents}
                onChange={e => handleInputChange(e)}
              ></textarea>
            ) : (
              <Paragraph style={styleContents}>{contents}</Paragraph>
            )}
            <Descriptions>
              <Descriptions.Item label=""></Descriptions.Item>
              <Descriptions.Item label="작성">{createdAt}</Descriptions.Item>
              <Descriptions.Item label="수정">{updatedAt}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <div>
          {havePermission ? (
            isEditable ? (
              <Button onClick={toggleIsEditable}>수정취소</Button>
            ) : (
              <Button onClick={toggleIsEditable}>답글수정</Button>
            )
          ) : null}
          {havePermission && isEditable && <Button onClick={modifyAnswer}>전송하기</Button>}
          {havePermission && <Button onClick={deleteAnswer}>답글삭제</Button>}
          <div>
            {!havePermission && isLogin && !likers.includes(myUserName) && <Button onClick={postLike}>좋아요!</Button>}
            {!havePermission && isLogin && likers.includes(myUserName) && <Button onClick={deleteLike}>좋아요 취소</Button>}
            {isSelectable ? (
              rank ? (
                <Button onClick={() => removeSelectedAnswer(id)}>답변선택 취소하기</Button>
              ) : (
                <Button onClick={() => addSelectedAnswer(id)}>{nextRank}위 답변으로 선택</Button>
              )
            ) : null}
          </div>

        </div>
      </div>
      {rank === 3 ? <Button onClick={() => confirmSelect()}>선택한 답변들을 최종 답변으로 제출하기</Button> : null}
      {rank === 3 ? <Button onClick={() => removeSelectedAnswer(id)}>답변 다시 선택하기</Button> : null}
    </div>
  );
};

export default AnswerTemplate;
