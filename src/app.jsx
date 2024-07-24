import { useState } from "preact/hooks";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        Samveg ke kitne baap!!! {"->"} {count}
      </div>
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +1
        </button>
      </div>
    </div>
  );
}
