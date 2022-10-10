import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header';
import Footer from '@layout/footer';
import AuthorIntroArea from '@containers/author-intro';
import AuthorProfileArea from '@containers/author-profile';

import { useEffect } from 'react';
import authorData from '../data/author.json';
import findItemsByAccount from '../features/account/store/account.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useMetamask from '../features/auth/hooks/useMetamask';

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const Author = () => {
  const dispatch = useAppDispatch();
  const { address } = useMetamask();

  useEffect(() => {
    dispatch(findItemsByAccount(address));
  }, [dispatch, address]);

  return (
    <Wrapper>
      <SEO pageTitle="Author" />
      <Header />
      <main id="main-content">
        <AuthorIntroArea data={authorData} address={address} />
        <AuthorProfileArea address={address} />
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Author;
