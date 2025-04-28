import React, { useState } from 'react';
import FruitNinja from './components/FruitNinja';

function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div>
      {unlocked ? (
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h1>🎉 Welcome to My Portfolio!</h1>
          <p>Here is my work, skills, and projects!</p>
        </div>
      ) : (
        <FruitNinja onUnlock={() => setUnlocked(true)} />
      )}
    </div>
  );
}

export default App;
