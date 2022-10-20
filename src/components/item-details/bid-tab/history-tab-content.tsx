import TopSeller from '@components/top-seller/top-seller-2';
import { History } from '@types';

type Props = {
  history: History[];
};

const HistoryTabContent = ({ history }: Props) => (
  <div>
    {history?.map((item: History) => (
      <TopSeller
        key={item.id}
        name={item.user.name}
        eth={item.amount}
        path={item.user.slug}
        time={item.bidAt}
        image={item.user.image}
      />
    ))}
  </div>
);

export default HistoryTabContent;
