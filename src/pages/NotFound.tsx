import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@src/components/Button/Button';
import { Flex, Title } from '@src/components/styled';
import { PATH_APP } from '@src/router/paths';
import { useTheme } from 'styled-components';

const NotFound: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    return navigate(PATH_APP.root);
  };

  return (
    <Flex flexDirection="column" gap={`${theme.spacing.common}px`}>
      <Title>
        {location?.state?.from
          ? `Page ${location.state.from} doesn't exist`
          : `${location.pathname} was not found`}
      </Title>
      <Button onClick={handleGoBack}>Go back</Button>
    </Flex>
  );
};

NotFound.displayName = 'NotFound';
export default NotFound;
