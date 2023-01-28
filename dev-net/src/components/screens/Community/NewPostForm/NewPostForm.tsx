import { Post } from '@/atoms/posts.atom';
import { firestore, storage } from '@/firebase/firebase.config';
import { takeUserName } from '@/helpers/takeUserName';
import { Alert, AlertDescription, AlertIcon, CloseButton, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, useState } from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentOutline, IoImageOutline } from 'react-icons/io5';

import { ImageUpload } from './FormElements/ImageUpload';
import { TextInputs } from './FormElements/TextInputs';
import { TabItem } from './TabItem';

type TProps = {
  user: User;
};

const formTabs: TTabItem[] = [
  {
    title: 'Post',
    icon: IoDocumentOutline,
  },
  {
    title: 'Images & Video',
    icon: IoImageOutline,
  },
  {
    title: 'Link',
    icon: BsLink45Deg,
  },
  {
    title: 'Poll',
    icon: BiPoll,
  },
  {
    title: 'Talk',
    icon: BsMic,
  },
];

export type TTabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

export const NewPostForm: FC<TProps> = ({ user }) => {
  const router = useRouter();
  const { onClose } = useDisclosure({ defaultIsOpen: false });
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textValues, setTextValues] = useState({
    title: '',
    body: '',
  });
  const [selectedFile, setSelectedFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
    // Take needed variables
    const { communityId } = router.query;
    const userName = takeUserName(user!);
    const { body, title } = textValues;

    // create new post object => type Post
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user?.uid,
      creatorDisplayName: userName,
      title: title,
      body: body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    // Store post in DB
    try {
      // Reference for the post document
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      // Check for selectedFile(media in post)
      if (selectedFile) {
        // If exists, store in storage => getDownloadURL (return imageURL) and update post doc by adding imageURL
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }

      // Redirect the use to the community page
      router.back();
    } catch (error: any) {
      console.log('handleCreatePost error', error.message);
    }
    setLoading(false);
  };

  const onSelectMedia = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    // Check if file is uploaded
    if (event.target.files?.[0]) {
      // Read the url of the file
      reader.readAsDataURL(event.target.files[0]);
    }

    // When reader loaded the info and if it is successful, write it to local state
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const onTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      target: { name, value },
    } = event;

    // Set the value of the field automatically by checking the name of the target and it's value
    setTextValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex
      direction='column'
      bg='white'
      borderRadius={5}
      overflow='hidden'
      mt={2}>
      <Flex width='100%'>
        {formTabs.map((item) => (
          <TabItem
            item={item}
            selected={selectedTab === item.title}
            setSelectedTab={setSelectedTab}
            key={item.title}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === 'Post' ? (
          <TextInputs
            handleCreatePost={handleCreatePost}
            loading={loading}
            setTextInputs={onTextChange}
            textInputs={textValues}
          />
        ) : null}
        {selectedTab === 'Images & Video' ? (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectMedia}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
          />
        ) : null}
      </Flex>
      {error ? (
        <Alert
          status='error'
          display='flex'
          justifyContent='space-between'
          width='100%'>
          <Flex>
            <AlertIcon />
            <AlertDescription>
              Error ocurred during post submitting!
            </AlertDescription>
          </Flex>
          <CloseButton onClick={() => setError((prev) => !prev)} />
        </Alert>
      ) : null}
    </Flex>
  );
};
