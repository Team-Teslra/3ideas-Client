import React from 'react';
import { Checkbox, Card, Row, Col, Form, Input } from 'antd';
const { TextArea } = Input;

const AskInput = ({ title, contents, category, onInputChange, onCategoryChange }) => {
  return (
    <div>
      <h3>질문하기</h3>
      <div>&nbsp;</div>
      <Form layout={'horizontal'}>
        <div>
          카테고리 선택
          {/* <Checkbox.Group onChange={onCategoryChange} options={category.map((item) => {
            const { categoryName } = item;
            return categoryName})}/> */}
          <div>
            <Card bodyStyle={{ padding: 10 }} style={{ width: 480, height: 125 }}>
              <Row gutter={14}>
                {category.map((item, i) => {
                  const { categoryName } = item;
                  if (i === 0) {
                    return (
                      <Col key={i} span={24} style={{ float: 'left', alignContent: 'left' }}>
                        <Checkbox
                          style={{ display: 'inline-block' }}
                          key={i}
                          value={categoryName}
                          onChange={onCategoryChange}
                        >
                          {categoryName}{' '}
                        </Checkbox>
                      </Col>
                    );
                  }
                  return (
                    <Col key={i} span={8}>
                      <Checkbox style={{ display: 'inline-block' }} value={categoryName} onChange={onCategoryChange}>
                        {categoryName}{' '}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Card>
          </div>
        </div>
        <div>&nbsp;</div>
        <Form.Item label="질문 제목">
          <Input
            style={{
              width: '400px',
              height: '30px',
              borderRadius: '5px',
            }}
            type="title"
            placeholder="질문 제목 입력"
            value={title}
            onChange={onInputChange('title')}
          />
        </Form.Item>
        <Form.Item label="질문 내용">
          <TextArea rows={7}
            style={{
              width: '400px',
              borderRadius: '5px',
            }}
            type="contents"
            placeholder="질문 입력"
            value={contents}
            onChange={onInputChange('contents')}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AskInput;
