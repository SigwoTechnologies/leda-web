import Acc from 'react-bootstrap/Accordion';
import { AccordionItem } from '../../../types/accordion-item';

type Props = {
  items: AccordionItem[];
  defaultActiveKey: string | string[] | null | undefined;
};

const Accordion = ({ items, defaultActiveKey }: Props) => (
  <Acc defaultActiveKey={defaultActiveKey}>
    {items?.map((item: AccordionItem) => (
      <Acc.Item key={item.id} eventKey={item.id.toString()}>
        <Acc.Header>
          {item.title} <i className="feather-chevron-up" />
        </Acc.Header>
        <Acc.Body dangerouslySetInnerHTML={{ __html: item.description }} />
      </Acc.Item>
    ))}
  </Acc>
);

export default Accordion;
