import { Community, communityState } from '@/atoms/communities.atom';
import { auth, firestore, storage } from '@/firebase/firebase.config';
import { useSelectFile } from '@/hooks/useSelectFile';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import error from 'next/error';
import Link from 'next/link';
import React, { FC, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdOutlineCodeOff } from 'react-icons/md';
import { RiCakeLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';

type TProps = {
  communityData: Community;
};

export const AboutCommunity: FC<TProps> = ({
  communityData: { numberOfMembers, createdAt, photoURL, creatorId, id },
}) => {
  const [user] = useAuthState(auth);
  const setCommunityState = useSetRecoilState(communityState);
  const { onSelectFile, selectedFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const communityImage = selectedFile || photoURL;

  const onUpdateImage = async () => {
    if (!selectedFile) return;

    setUploadingImage(true);
    try {
      // Take the ref of the place for image in the storage
      const imageRef = ref(storage, `communities/${id}/image`);
      // Upload current image to the firebase storage
      await uploadString(imageRef, selectedFile, 'data_url');
      // Take download url
      const downloadURL = await getDownloadURL(imageRef);
      // Update the document in the firestore
      await updateDoc(doc(firestore, 'communities', id), {
        photoURL: downloadURL,
      });

      // Update local state
      setCommunityState((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          photoURL: downloadURL,
        } as Community,
      }));
    } catch (error) {
      console.log('onUpdateImage error', error);
      setImageError(true);
    }
    setUploadingImage(false);
  };

  return (
    <Box
      position='sticky'
      top='14px'>
      <Flex
        justify='space-between'
        align='center'
        bg='brand.100'
        color='white'
        p={3}
        borderRadius='4px 4px 0px 0px'>
        <Text
          fontSize='10pt'
          fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex
        direction='column'
        p={3}
        bg='white'
        borderRadius='0px 0px 4px 4px'>
        <Stack>
          <Flex
            width='100%'
            p={2}
            fontSize='10pt'
            fontWeight={700}>
            <Flex
              direction='column'
              flexGrow={1}>
              <Text>{numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex
              direction='column'
              flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          {createdAt ? (
            <Flex
              align='center'
              width='100%'
              p={1}
              fontWeight={500}
              fontSize='10pt'>
              <Icon
                as={RiCakeLine}
                fontSize={18}
                mr={2}
              />
              <Text>
                Created at{' '}
                {dayjs(createdAt.seconds * 1000).format('MMM DD, YYYY')}
              </Text>
            </Flex>
          ) : null}
          <Link href={`/c/${id}/submit`}>
            <Button
              height='30px'
              width='100%'
              variant='outline'>
              Create post
            </Button>
          </Link>
          {user?.uid === creatorId && (
            <>
              <Divider />
              <Stack
                spacing={1}
                fontSize='10pt'>
                <Text fontWeight={600}>Admin</Text>
                <Flex
                  align='center'
                  justify='space-between'>
                  <Text
                    onClick={() => imageInputRef.current?.click()}
                    cursor='pointer'
                    _hover={{
                      textDecoration: 'underline',
                    }}
                    color='brand.100'>
                    Change image
                  </Text>
                  {communityImage ? (
                    <Image
                      src={communityImage}
                      alt='Community image'
                      borderRadius='full'
                      fit='cover'
                      boxSize='40px'
                    />
                  ) : (
                    <Icon
                      as={MdOutlineCodeOff}
                      fontSize={40}
                      mr={2}
                    />
                  )}
                </Flex>
              </Stack>
            </>
          )}
          {selectedFile ? (
            uploadingImage ? (
              <Spinner />
            ) : (
              <Text
                cursor='pointer'
                onClick={onUpdateImage}>
                Save Changes
              </Text>
            )
          ) : null}
          <input
            ref={imageInputRef}
            onChange={onSelectFile}
            type='file'
            hidden
          />
        </Stack>
      </Flex>
      {imageError ? (
        <Alert
          status='error'
          display='flex'
          justifyContent='space-between'
          width='100%'
          borderRadius='0px 0px 4px 4px'>
          <Flex>
            <AlertIcon />
            <AlertDescription>Unexpected error!</AlertDescription>
          </Flex>
          <CloseButton onClick={() => setImageError((prev) => !prev)} />
        </Alert>
      ) : null}
    </Box>
  );
};
