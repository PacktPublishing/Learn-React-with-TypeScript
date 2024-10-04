import {
  useEffect,
  useState,
  useRef,
  useOptimistic,
  useTransition,
} from 'react';
import { getPerson } from './getPerson';

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function PersonScore() {
  const [name, setName] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const [optimisticScore, setOptimisticScore] =
    useOptimistic(score);
  const [isPending, startTransition] = useTransition();

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
    setOptimisticScore((currScore) => currScore + 1);
    await delay(1000);
    setScore((currScore) => currScore + 1);
  }

  async function subtract() {
    setOptimisticScore((currScore) => currScore - 1);
    await delay(1000);
    setScore((currScore) => currScore - 1);
  }

  async function reset() {
    setOptimisticScore(0);
    await delay(1000);
    setScore(0);
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h3>
        {name}, {optimisticScore}
      </h3>
      <button
        ref={addButtonRef}
        disabled={isPending}
        onClick={() => startTransition(() => add())}
      >
        Add
      </button>
      <button
        disabled={isPending}
        onClick={() => startTransition(() => subtract())}
      >
        Subtract
      </button>
      <button
        disabled={isPending}
        onClick={() => startTransition(() => reset())}
      >
        Reset
      </button>
    </div>
  );
}
