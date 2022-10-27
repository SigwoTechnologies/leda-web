import Breadcrumb from '@components/breadcrumb';
import EditProfileArea from '@containers/edit-profile';
import SEO from '@components/seo';

const EditProfile = () => (
  <>
    <SEO pageTitle="Edit Profile" />
    <Breadcrumb pageTitle="Edit Profile" currentPage="Edit Profile" />
    <EditProfileArea />
  </>
);

export default EditProfile;
