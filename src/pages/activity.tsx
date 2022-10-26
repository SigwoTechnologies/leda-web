import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header';
import Footer from '@layout/footer';
import ActivityArea from '@containers/activity';

// Demo Data
import activityData from '../data/activity.json';

const Activity = () => (
  <Wrapper>
    <SEO pageTitle="Acivity" />
    <Header />
    <main id="main-content">
      <ActivityArea data={{ activities: activityData }} />
    </main>
    <Footer />
  </Wrapper>
);

export default Activity;
