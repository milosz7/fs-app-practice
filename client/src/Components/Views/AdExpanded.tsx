import { useContext } from 'react';
import AdsContext from '../../Context/AdsContext';
import { useParams } from 'react-router-dom';
import NotFoundError from './NotFoundError';
import AdBase from '../Common/AdBase';

const AdExpanded = () => {
  const { id } = useParams();
  const { ads } = useContext(AdsContext)!;
  const adData = ads.find(({ _id }) => id === _id.toString());

  if (!adData)
    return (
      <NotFoundError
        title="Something went wrong!"
        message={`Ad data for id: ${id} was not found.`}
      />
    );

  return (
    <AdBase {...adData} />
  );
};

export default AdExpanded;
