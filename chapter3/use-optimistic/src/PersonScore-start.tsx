import { useEffect, useState, useRef } from 'react';
import { getPerson } from './getPerson';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function PersonScore() {
  const [name, setName] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const addButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getPerson().then(({ name }) => {
      setLoading(false);
      setName(name);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      addButtonRef.current?.focus();
    }
  }, [loading]);

  async function add() {
    await delay(1000);
    setScore((currentScore) => currentScore + 1);
  }

  async function subtract() {
    await delay(1000);
    setScore((currentScore) => currentScore - 1);
  }

  async function reset() {
    await delay(1000);
    setScore(0);
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <button ref={addButtonRef} onClick={add}>
        Add
      </button>
      <button onClick={subtract}>Subtract</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
