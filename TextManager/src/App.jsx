import { useState } from "react";

import AllComponents from "./Components/AllComponents";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AllComponents />
    </div>
  );
}

export default App;
