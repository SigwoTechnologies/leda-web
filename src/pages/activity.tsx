import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import { ActivityArea } from '@containers/activity/activity-area';

const Activity = () => (
  <>
    <SEO pageTitle="Activity" />
    <Breadcrumb pageTitle="Latest Activity" currentPage="Activity" />
    <ActivityArea />
  </>
);

export default Activity;
