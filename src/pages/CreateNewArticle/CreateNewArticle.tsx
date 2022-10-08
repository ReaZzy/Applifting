import React from 'react';
import CreateNewArticleForm from '@src/feautures/CreateNewArticleForm/CreateNewArticleForm';
import { CreateNewArticleWrapper } from '@src/pages/CreateNewArticle/createNewArticle.styles';

const CreateNewArticle: React.FC = () => {
  return (
    <CreateNewArticleWrapper>
      <CreateNewArticleForm />
    </CreateNewArticleWrapper>
  );
};

export default CreateNewArticle;
