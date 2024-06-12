import AppRouter from './routes/AppRouter';
import { ContextApp } from './context/ContextApp';
import { IComment } from './types/models';
import { useState } from 'react';

function App() {

  const [comments, setComments] = useState<IComment[]>([])


  return (
    <ContextApp.Provider
      value={{
        comments,
        setComments
      }}
    >
      <AppRouter />
    </ ContextApp.Provider>
  );
}

export default App;
