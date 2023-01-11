import { useEffect, useState } from 'react';
import TagsInput from 'react-tagsinput';
import useAppDispatch from '@store/hooks/useAppDispatch';

const tagsErrorMessages = {
  CantMore: 'You can not enter more than 8 tags',
  AtLeast: 'Please enter at least 1 tag',
  LenghtNotAllowed: 'Too long tag. Try with a tag that contains less than 8 characters',
};

const NftTagsComponent = () => {
  const dispatch = useAppDispatch();

  const [tags, setTags] = useState<string[]>([]);
  const [tagErrMessage, setTagErrMessage] = useState('' as string);

  const handleTagsChange = (tagProps: string[]) => {
    // prevent empty tags
    if (!tagProps.includes('')) {
      setTags(tagProps);
    }
  };

  useEffect(() => {
    if (tags.length <= 8) {
      setTagErrMessage('');
    }
  }, [tags]);

  return (
    <div className="input-box pb--20">
      <label className="form-label">Tags *</label>
      {tagErrMessage && (
        <p style={{ fontSize: '14px', marginBottom: '10px' }} className="text-danger">
          {tagErrMessage}
        </p>
      )}
      <TagsInput
        value={tags}
        onValidationReject={() => setTagErrMessage(tagsErrorMessages.LenghtNotAllowed)}
        onChange={handleTagsChange}
        addOnPaste
        onlyUnique
        addOnBlur
        /* key codes: 9 = tab; 13 = enter; 32 = space bar; */
        addKeys={[9, 13, 32]}
      />
    </div>
  );
};

export default NftTagsComponent;
