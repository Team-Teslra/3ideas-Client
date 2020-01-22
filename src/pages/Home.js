import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { Row, Col, Button } from 'antd';  

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
    }
  }
  
  changeIsSearching = () => {
    this.setState({
      isSearching: true
    });
  }

  componentDidMount() {
    this.props.changeCurrentPage('home');
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.location.state) {
      if (prevProps.location.state.isHomeClicked !== this.props.location.state.isHomeClicked) {
        this.setState({
          isSearching: false
        });
      }
    }
  }
  
  render() {
    const { changeIsSearching } = this;
    const { isSearching } = this.state;

    const styleHome = { height: '280px' }
    const styleWrapper = { width: '600px' }
    const styleButtons = { padding: '25px' }

    return (
      <div>
        <Row style={styleHome} type="flex" justify="center" align="middle">
          <Row style={styleWrapper}>
            <Row style={styleButtons} type="flex" justify="center">
              <Link to={'/ask'}><Button type="primary">질문하기</Button></Link>
            </Row>
            <Row style={styleButtons} type="flex" justify="center">
              <Link to={'/asks'}><Button type="primary">질문목록</Button></Link>
            </Row>
            <Row style={styleButtons} type="flex" justify="center">
              { isSearching ? 
                <Row type="flex"><SearchInput /></Row> : <Button type="primary" onClick={changeIsSearching}>질문검색</Button> 
              }
            </Row>
          </Row>
        </Row>
      </div>
    );
  }
}

export default withRouter(Home);
