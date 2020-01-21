import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login, SignUp, Ask, Asks } from './pages';
import Template from './components/Template';
import AskEntry from './components/ask/AskEntry';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      username: null,
      renderChildren: false,
      category:[],  // ! ask, asks에 내려줄거다.
      currentPage: null,
    };
  }

  changeCurrentPage = (pageName) => {
    this.setState({
      currentPage: pageName
    });
  }

  componentDidMount() {
    axios.get('http://localhost:5000/category')
    .then(res => this.setState({
      category: res.data
    }))
    .catch(err => console.log(err))
    this.setState({
      isLogin: this.props.isLogin,
      username: this.props.username,
      renderChildren: true,
    });
  }
  
  // ? 사용 할 수도 있다~
  // componentDidUpdate(prevProps) {
  //   console.log('ComponentDidUpdate!');
  //   if (prevProps.isLogin !== this.props.isLogin) {
  //     this.setState({
  //       isLogin: this.props.isLogin,
  //       username: this.props.username,
  //     });
  //   }
  // }

  handleIsLoginChange = () => {
    this.setState({
      isLogin: !this.state.isLogin,
    });
  };

  handleUsername = username => {
    this.setState({
      username: username,
    });
  };

  render() {
    const { isLogin, username, renderChildren, currentPage, category } = this.state;
    const { handleIsLoginChange, handleUsername, changeCurrentPage } = this;

    if (renderChildren) {
      return (
        <div>
          <Template isLogin={isLogin} username={username} handleIsLoginChange={handleIsLoginChange} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />
          <Switch>
            <Route exact path="/" render={() => <Home isLogin={isLogin} username={username} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />} />
            <Route
              path={['/asks/', '/search', '/category/:category?']}
              render={({ match }) => <Asks isLogin={isLogin} username={username} match={match} params={match.params} currentPage={currentPage} changeCurrentPage={changeCurrentPage} category={category} />}
            />
            <Route path="/ask/:id" render={() => <AskEntry isLogin={isLogin} username={username} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />} />
            <Route
              path="/login"
              render={() => (
                <Login isLogin={isLogin} handleIsLoginChange={handleIsLoginChange} handleUsername={handleUsername} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />
              )}
            />

            <Route path="/signup" render={() => <SignUp isLogin={isLogin} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />} />
            <Route exact path="/ask" render={() => <Ask isLogin={isLogin} username={username} currentPage={currentPage} changeCurrentPage={changeCurrentPage} category={category} />} />
          </Switch>
        </div>
      );
    } else {
      return null;
    }
  }
}

// 네비게이션바 -> components/Template.js
// 질문하기 -> /ask, pages/Ask.js
// 질문보기 -> /asks, pages/
// 메인화면 -> /, pages/Home.js
// 로그인 -> /login, pages/Login.js
// 회원가입 -> /signup, pages/Signup.js

export default App;
