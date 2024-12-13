'use client';
import { use } from 'react';
import { UserContext } from '@/state/UserContext';
import { Content } from './Content';

export function Main() {
  const { userName } = use(UserContext);
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
