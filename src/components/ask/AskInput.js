import React from 'react';

const AskInput = ({ title, contents, category, onInputChange, onCategoryChange }) => {
  return (
    <div>
      <h1>질문하기</h1>
      <form>
        <div>
          카테고리 선택
          {category.map((item, i) => {
            const { categoryName } = item;
            return (
              <div key={i}>
                <label>
                  <input type="checkbox" value={categoryName} onChange={onCategoryChange} />
                  {categoryName}
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <input
            style={{
              width: '400px',
              height: '30px',
              margin: '5px',
              borderRadius: '5px',
            }}
            type="title"
            placeholder="질문 제목 입력"
            value={title}
            onChange={onInputChange('title')}
          ></input>
        </div>
        <div>
          <input
            style={{
              width: '400px',
              height: '75px',
              margin: '5px',
              borderRadius: '5px',
            }}
            type="contents"
            placeholder="질문 입력"
            value={contents}
            onChange={onInputChange('contents')}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AskInput;
