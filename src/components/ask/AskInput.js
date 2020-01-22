import React from 'react';
import { Checkbox, Card } from 'antd';

const AskInput = ({ title, contents, category, onInputChange, onCategoryChange }) => {
  return (
    <div>
      <h1>질문하기</h1>
      <form>
        <div>
          카테고리 선택
          {/* <Checkbox.Group onChange={onCategoryChange} options={category.map((item) => {
            const { categoryName } = item;
            return categoryName})}/> */}
          <div>
            <Card bodyStyle={{ padding: 5 }} style={{ width: 300, height: 100 }}>
              {category.map((item, i) => {
                const { categoryName } = item;
                console.log(categoryName);
                return (
                  <Checkbox
                    style={{ display: 'inline-block' }}
                    key={i}
                    value={categoryName}
                    onChange={onCategoryChange}
                  >
                    {categoryName}{' '}
                  </Checkbox>
                );
              })}
            </Card>
          </div>
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
