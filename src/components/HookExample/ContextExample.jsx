import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red, deepPurple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: red[300],
    },
  },
});

// context를 사용하면 모든 컴포넌트를 일일이 통하지 않고도
// 원하는 값을 컴포넌트 트리 깊숙한 곳까지 보낼 수 있습니다.
// light를 기본값으로 하는 테마 context를 만들어 봅시다.
const ThemeContext = React.createContext('light');
ThemeContext.displayName = 'Theme';
// 여러 파일로 구성할거라면, ThemeContext의 반환값을 export 해야한다.

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkMode: true,
    };
  }

  toggleTheme = (e) => {
    const { isDarkMode } = this.state;

    this.setState({ isDarkMode: !isDarkMode })
  }

  render() {
    const { isDarkMode } = this.state;

    // Provider를 이용해 하위 트리에 테마 값을 보내줍니다.
    // 아무리 깊숙히 있어도, 모든 컴포넌트가 이 값을 읽을 수 있습니다.
    // 아래 예시에서는 dark를 현재 선택된 테마 값으로 보내고 있습니다.
    return (
      <>
        <Button onClick={() => this.toggleTheme()}>Theme Change</Button>
        <ThemeProvider theme={theme}>
          <ThemeContext.Provider value={isDarkMode}>
            <Toolbar />
          </ThemeContext.Provider>
        </ThemeProvider>
      </>
    );
  }
}

// 이젠 중간에 있는 컴포넌트가 일일이 테마를 넘겨줄 필요가 없습니다.
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends Component {
  // 현재 선택된 테마 값을 읽기 위해 contextType을 지정합니다.
  // React는 가장 가까이 있는 테마 Provider를 찾아 그 값을 사용할 것입니다.
  // 이 예시에서 현재 선택된 테마는 dark입니다.
  static contextType = ThemeContext;
  render() {
    const color = this.context ? 'primary': 'secondary'
    return (
      <>
        <Button color={color}>Button A</Button>
        <Button color={color}>Button B</Button>
      </>
    );
  }
}