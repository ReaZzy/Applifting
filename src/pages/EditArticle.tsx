import React from 'react';
import EditArticleForm from '@src/feautures/EditArticleForm';
import { CreateNewArticleWrapper } from '@src/pages/CreateNewArticle/createNewArticle.styles';

const EditArticle: React.FC = () => {
  return (
    <CreateNewArticleWrapper>
      <EditArticleForm />
    </CreateNewArticleWrapper>
  );
};

export default EditArticle;
