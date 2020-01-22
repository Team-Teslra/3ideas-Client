import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Button, Input, PageHeader, Typography, Descriptions, Avatar, Icon } from 'antd';

const { Paragraph, Title, Text } = Typography;
const { TextArea } = Input;

const AskListTemplate = props => {
  const { asks, keyword } = props;
  const { id, title, questionFlag, createdAt, username, commentsCount, contents, answers } = props.ask;

  // 텍스트 안에 검색 키워드가 없다면 그대로 반환하고, 있다면 키워드를 <mark>태그로 감싸 텍스트에 넣어 반환한다.
  const markKeywords = text => {
    const regex = new RegExp(keyword, 'gi');
    // 텍스트 안에 키워드가 안 들어있으면 그냥 생 텍스트를 반환한다.
    if (!text.match(regex)) return text;
    const markedText = text.replace(regex, `<mark>${keyword}</mark>`);
    // <mark>로 감싸진 키워드가 포함된 문장을 반환
    return markedText;
  };

  const convertToHTMLElement = text => {
    return <span dangerouslySetInnerHTML={{ __html: text }}></span>;
  };

  const cutMarkedText = text => {
    const markedText = markKeywords(text);
    const markedKeyword = `<mark>${keyword}</mark>`;
    const splittedArr = markedText.split(markedKeyword);
    const textToShow = `...${splittedArr[0].slice(-20)}${markedKeyword}${splittedArr[1].slice(0, 20)}...`;

    return convertToHTMLElement(textToShow);
  };

  const cutContents = text => {
    return `${text.slice(0, 40)}...`;
  };

  // const styleAskListTemplate  = { border: '1px solid grey'}
  const styleTitle = { color: '#333', fontSize: '16px', marginTop: '5px' };
  const styleAnswerSign = { color: 'CORAL'}

  return (
    <div>
      {questionFlag ? <Text style={styleAnswerSign}>답변모집중</Text> : <Text type="secondary">마감된질문</Text>}
      <Link to={{ pathname: `/ask/${id}`, state: { asksLength: asks.length || 0 } }}>
        {keyword === '' ?
          <Paragraph strong={true} style={styleTitle} ellipsis={{ rows: 2, expandable: false }}>{title}</Paragraph>
          :
          <Paragraph strong={true} style={styleTitle} ellipsis={{ rows: 2, expandable: false }}>{convertToHTMLElement(markKeywords(title))}</Paragraph>
        }
      </Link>
      <Row type="flex" justify="space-between">
        <p>{username}의 질문</p>
        <p>{createdAt.slice(0, 10)}</p>
      </Row>
      <p>답변수 <Text strong={true}>{commentsCount}</Text></p>
      {keyword === '' ? (
        <p>{cutContents(contents)}</p>
      ) : markKeywords(contents) === contents ? (
        null
      ) : (
        <Paragraph>내용검색 : <Text strong={true}>{cutMarkedText(contents)}</Text></Paragraph>
      )}
      {answers && answers.length > 0 && <Paragraph>답글검색 : <Text strong={true}>{cutMarkedText(answers[0].contents)}</Text></Paragraph>}
    </div>
  );
};

export default withRouter(AskListTemplate);
