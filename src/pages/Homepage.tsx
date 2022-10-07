import React from 'react';
import { useLoginMutation } from '@src/store/api/auth.api';

const Homepage: React.FC = () => {
  const [a, { isLoading }] = useLoginMutation();
  const onClick = async () => {
    const res = await a({ username: '123', password: '12' }).unwrap();
  };
  return (
    <div>
      123 {isLoading && 'te'} <button onClick={onClick}>a</button>
    </div>
  );
};

export default Homepage;
