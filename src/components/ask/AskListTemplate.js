import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const AskListTemplate = props => {
  const { asks, keyword } = props;
  const { id, title, questionFlag, createdAt, username, commentsCount, contents, answers } = props.ask;
  const style = {
    width: '200px',
    border: '1px solid black',
    padding: '15px',
  };

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

  return (
    <div style={style}>
      <Link to={{ pathname: `/ask/${id}`, state: { asksLength: asks.length || 0 } }}>
        {keyword === '' ? title : convertToHTMLElement(markKeywords(title))}
      </Link>
      <p>{questionFlag ? '답변모집중' : '마감된질문'}</p>
      <p>작성일 : {createdAt}</p>
      <p>작성자 : {username}</p>
      <p>답변수 : {commentsCount}</p>
      {keyword === '' ? (
        <p>내용 : {cutContents(contents)}</p>
      ) : markKeywords(contents) === contents ? (
        <p>내용 : {cutContents(contents)}</p>
      ) : (
        <p>내용검색 : {cutMarkedText(contents)}</p>
      )}
      {answers && answers.length > 0 && <p>답글검색 : {cutMarkedText(answers[0].contents)}</p>}
    </div>
  );
};

export default withRouter(AskListTemplate);
