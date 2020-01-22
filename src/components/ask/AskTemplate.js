import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Button, Input, PageHeader, Typography, Descriptions } from 'antd';
const { Paragraph } = Typography;

const { TextArea } = Input;

const AskTemplate = props => {
  const {
    havePermission,
    modifyAsk,
    deleteAsk,
    handleInputChange,
    toggleIsEditable,
    isEditable,
    editedAskContents,
    questionFlag,
    isLogin,
    loginUsername,
    displayAnswerInput,
    toggleDisplayAnswerInput
  } = props;
  const { title, contents, username, createdAt, updatedAt } = props.askContents;

  const styleAskTemplate = { margin: '20px 0', paddingBottom: '18px', borderBottom: '1px solid #ededed' };
  const styleWrapper = { marginBottom: '15px' };
  const styleContents = { marginBottom: '10px' };
  const styleButton = { marginRight: '8px' };
  
  return (
    <div style={styleAskTemplate}>
      <Row style={styleWrapper}>
        <Row style={styleContents}>
          {isEditable ? (
            <Input size="large" type="text" name="title" value={editedAskContents.title} onChange={e => handleInputChange(e)} />
          ) : (
            <PageHeader title={title} />
          )}
          {isEditable ? (
            <TextArea rows={5} name="contents" value={editedAskContents.contents} onChange={e => handleInputChange(e)}></TextArea>
          ) : (
            <Paragraph>{contents}</Paragraph>
          )}
        </Row>
        <Row>
          {!isEditable && (
            <Descriptions>
              <Descriptions.Item label="작성자"><Link to={`/user/${username}`}>{username}</Link></Descriptions.Item>
              <Descriptions.Item label="작성일시">{createdAt}</Descriptions.Item>
              <Descriptions.Item label="수정일시">{updatedAt}</Descriptions.Item>
            </Descriptions>
          )}
        </Row>
      </Row>
      <Row type="flex" justify="end">
        <div>
          {havePermission ? (
            isEditable ? (
              <Button type="link" style={styleButton} onClick={toggleIsEditable}>수정 취소</Button>
            ) : (
              <Button type="link" style={styleButton} onClick={toggleIsEditable}>글 수정</Button>
            )
          ) : null}
        </div>
        <div>
          {havePermission && isEditable && <Button type="link" style={styleButton} onClick={modifyAsk}>수정하기</Button>}
          {havePermission ? !isEditable ? <Button type="link" style={styleButton} onClick={deleteAsk}>글 삭제</Button> : null : null}
        </div>
        <div>
          {questionFlag && isLogin ? (
            loginUsername !== username ? (
              displayAnswerInput ? (
                <Button onClick={toggleDisplayAnswerInput}>작성 취소하기</Button>
              ) : (
                <Button onClick={toggleDisplayAnswerInput}>답글 작성하기</Button>
              )
            ) : null
          ) : null}
        </div>
      </Row>
    </div>
  );
};

export default AskTemplate;
