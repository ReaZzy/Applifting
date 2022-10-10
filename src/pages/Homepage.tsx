import React from 'react';
import { Flex, Title } from '@src/components/styled';
import ArticlesList from '@src/feautures/ArticlesList/ArticlesList';
import { useTheme } from 'styled-components';

const Homepage: React.FC = () => {
  const theme = useTheme();
  return (
    <Flex gap={`${theme.spacing.common * 3}px`} flexDirection="column">
      <Title>Recent articles</Title>
      <ArticlesList />
    </Flex>
  );
};

export default Homepage;
