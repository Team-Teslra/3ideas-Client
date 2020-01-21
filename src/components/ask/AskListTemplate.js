import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const AskListTemplate = (props) => {
  const { asks, keyword } = props;
  const { id, title, questionFlag, createdAt, username, commentsCount, contents, answers } = props.ask;
  const style = {
    width: '200px',
    border: '1px solid black',
    padding: '15px'
  }
 
  const markKeywords = (text) => {
    const regex = new RegExp(keyword, 'gi');
    if (!text.match(regex)) return text;
    const markedText = text.replace(regex, `<mark>${keyword}</mark>`);

    return markedText;
  }

  const convertToHTMLElement = (text) => {
    return <span dangerouslySetInnerHTML={ {__html: text} }></span>
  }

  const cutMarkedText = (text) => {
    const markedText = markKeywords(text);
    const markedKeyword = `<mark>${keyword}</mark>`
    const splittedArr = markedText.split(markedKeyword);    
    const textToShow = `...${splittedArr[0].slice(-20)}${markedKeyword}${splittedArr[1].slice(0, 20)}...`

    return convertToHTMLElement(textToShow);
  }

  const cutContents = (text) => {
    return `${text.slice(0, 40)}...`;
  }

  return (
    <div style={style}>
      <Link to={{pathname: `/ask/${id}`, state: {asksLength: asks.length || 0}}}>
        {keyword === '' ? title : convertToHTMLElement(markKeywords(title))}
      </Link>
      <p>{questionFlag ? '답변모집중' : '마감된질문'}</p>
      <p>작성일 : {createdAt}</p>
      <p>작성자 : {username}</p>
      <p>답변수 : {commentsCount}</p>
      {keyword === '' ? <p>내용 : {cutContents(contents)}</p> : <p>내용검색 : {cutMarkedText(contents)}</p>}
      {answers && answers.length > 0 && <p>답글검색 : {cutMarkedText(answers[0].contents)}</p>}
    </div>
  );
};

export default withRouter(AskListTemplate);
