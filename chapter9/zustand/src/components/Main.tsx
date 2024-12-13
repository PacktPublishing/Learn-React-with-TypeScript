'use client';
import { Content } from './Content';
import { useUserStore } from '@/state/useUserStore';

export function Main() {
  const userName = useUserStore(
    (state) => state.userName,
  );

  return (
    <main>
      <h1>Welcome</h1>
      <p>
        {userName
          ? `Hello ${userName}!`
          : 'Please sign in'}
      </p>
      <Content />
    </main>
  );
}
