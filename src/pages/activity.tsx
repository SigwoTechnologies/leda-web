import ActivityArea from '@containers/activity';
import SEO from '@components/seo';
import activityData from '../data/activity.json';

const Activity = () => (
  <>
    <SEO pageTitle="Acivity" />
    <ActivityArea data={{ activities: activityData }} />
  </>
);

export default Activity;
