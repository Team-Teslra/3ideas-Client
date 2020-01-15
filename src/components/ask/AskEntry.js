import React, { Component } from 'react';

class AskEntry extends Component {
  constructor(props) {
    super(props);
  }
  
  // match 가 props안에 없음. ask/:id로 인식은 되어서 랜더는 되는데 :id 부분이 props로 넘어오지 않는다. 왜지!
  // 안그러면 또 값을 다 넘겨줘야하는데..
  // Asks.js에도 match.params 안넘어올듯. title도 안넘어온다! 오직 App.js에서 명시적을 넘긴 값들만 들어오고있다.
  // 그럼 App.js에서 islogin을 바로 넘기지 않고, Asks.js에서 AskEntry.js를 랜더링할때 link에 넘겨야..?(가능?)
  // render = {() => 컴포넌트 isLogin={}} 이런식으로 하면 정확히 거기서 넘긴 값밖에 안들어옴. 그렇게 하면 안된다.
  // this.props.match.params 값을 받으려면(link에서 보낸걸) 그냥 component={AskEntry} 이렇게만 랜더해야함.
  // isLogin같은거는 걍 내려보내줘야함. 쭉쭉
  render() {
    console.log('AskEntry.js 랜더')
    console.log(this.props.match);

    return (
      <div>
        <p>id : {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default AskEntry;