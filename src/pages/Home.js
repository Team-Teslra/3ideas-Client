import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { Row, Button, Popconfirm } from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
    };
    this.goToLoginPage = this.goToLoginPage.bind(this);
  }

  changeIsSearching = () => {
    this.setState({
      isSearching: true,
    });
  };

  componentDidMount() {
    this.props.changeCurrentPage('home');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location) {
      if (prevProps.location.key !== this.props.location.key) {
        this.setState({
          isSearching: false,
        });
      }
    }
  }

  goToLoginPage() {
    this.props.history.push('login');
  }

  render() {
    const { changeIsSearching, goToLoginPage } = this;
    const { isSearching } = this.state;
    const { isLogin } = this.props;

    const styleHome = { height: '280px' };
    const styleWrapper = { width: '600px' };
    const styleButtons = { padding: '25px' };

    return (
      <div>
        <Row style={styleHome} type="flex" justify="center" align="middle">
          <Row style={styleWrapper}>
            <Row style={styleButtons} type="flex" justify="center">
              {isLogin ? (
                <Link to={'/ask'}>
                  <Button type="primary">질문하기</Button>
                </Link>
              ) : (
                <Popconfirm title="로그인 하시겠습니까?" okText="예" cancelText="아니오" onConfirm={goToLoginPage}>
                  <Link to={'/ask'}>
                    <Button type="primary">질문하기</Button>
                  </Link>
                </Popconfirm>
              )}
            </Row>
            <Row style={styleButtons} type="flex" justify="center">
              <Link to={'/asks'}>
                <Button type="primary">질문목록</Button>
              </Link>
            </Row>
            <Row style={styleButtons} type="flex" justify="center">
              {isSearching ? (
                <Row type="flex">
                  <SearchInput />
                </Row>
              ) : (
                <Button type="primary" onClick={changeIsSearching}>
                  질문검색
                </Button>
              )}
            </Row>
          </Row>
        </Row>
      </div>
    );
  }
}

export default withRouter(Home);
