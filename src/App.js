import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, Login, SignUp, Ask, Asks } from './pages';
import Template from './components/Template';
import AskEntry from './components/ask/AskEntry';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      username: '',
    };
  }

  handleIsLoginChange = () => {
    this.setState({ 
      isLogin: !this.state.isLogin 
    });
  }

  handleUsername = (username) => {
    this.setState({
      username: username,
    });
  }

  render() {
    const { isLogin, username } = this.state;
    const { handleIsLoginChange, handleUsername } = this;

    return (

      <div>
        <Template isLogin={isLogin} username={username} handleIsLoginChange={handleIsLoginChange}/>
        <Switch>
          <Route
            exact 
            path='/' 
            render={() => (
              <Home 
                isLogin={isLogin} 
                username={username} 
              />
            )}
          />
          <Route 
            path={["/asks/:keyword?", "/category/:category?"]} 
            render={() => (
              <Asks
                isLogin={isLogin} 
                username={username} 
              />
            )} 
          />
          <Route 
            path="/ask/:id"
            render={() => (
              <AskEntry 
                isLogin={isLogin} 
                username={username} 
              />
            )}
          />
          <Route
            path="/login" 
            render={() => (
              <Login 
                isLogin={isLogin}
                handleIsLoginChange={handleIsLoginChange}
                handleUsername={handleUsername}
              />
            )}
          />
          <Route
            path='/signup'
            render={() => (
              <SignUp 
                isLogin={isLogin}
              />
            )}
          />
          <Route
            exact
            path='/ask'
            render={() => (
              <Ask
                isLogin={isLogin}
                username={username}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

// 네비게이션바 -> components/Template.js
// 질문하기 -> /ask, pages/Ask.js
// 질문보기 -> /asks, pages/
// 메인화면 -> /, pages/Home.js
// 로그인 -> /login, pages/Login.js
// 회원가입 -> /signup, pages/Signup.js

export default App;