import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, Login, SignUp, Ask, Asks } from './pages';
import Template from './components/Template';

class App extends Component {
  // eslint Rule?
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  handleIsLoginChange() {
    this.setState({ isLogin: true });
  }

  render() {
    const { isLogin } = this.state;

    return (

      <div>
        <Template isLogin={isLogin} />
        <Route exact path='/' component={Home}/>
        <Switch>
          <Route
            path="/login" 
            render={() => (
              <Login 
                isLogin={isLogin}
                handleIsLoginChange={this.handleIsLoginChange.bind(this)}
              />
            )}
          />
          <Route
            path='/signup'
            render={() => <SignUp isLogin={isLogin}/>}
          />
          <Route
            path='/ask'
            render={() => (
              <Ask
                isLogin={isLogin}
              />
            )}
          />
          <Route 
            path='/asks' 
            render={() => (
              <Asks 
                isLogin={isLogin} 
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