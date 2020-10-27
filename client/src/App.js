import { ThemeProvider } from '@chakra-ui/core';
import { Button } from '@chakra-ui/core';

function App() {
  return (
    <div className='App'>
      <ThemeProvider>
        <h1>Hello World</h1>
        <Button>Test</Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
