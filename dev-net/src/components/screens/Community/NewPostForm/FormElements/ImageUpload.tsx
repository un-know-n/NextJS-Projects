import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React, { ChangeEvent, FC, useRef } from 'react';

type TProps = {
  selectedFile?: string;
  onSelectImage: (event: ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

export const ImageUpload: FC<TProps> = ({
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
  selectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      width='100%'>
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            alt='Selected image'
            maxWidth='400px'
            maxHeight='400px'
          />
          <Stack
            direction='row'
            mt={4}>
            <Button
              height='28px'
              onClick={() => setSelectedTab('Post')}>
              Back to Post
            </Button>
            <Button
              variant='outline'
              height='28px'
              onClick={() => setSelectedFile('')}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify='center'
          align='center'
          p={20}
          border='1px solid'
          borderColor='gray.200'
          width='100%'
          borderRadius={4}>
          <Button
            variant='outline'
            height='28px'
            onClick={() => selectedFileRef.current?.click()}>
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type='file'
            accept='image/jpeg, image/png, image/gif'
            onChange={onSelectImage}
            hidden
          />
        </Flex>
      )}
    </Flex>
  );
};
