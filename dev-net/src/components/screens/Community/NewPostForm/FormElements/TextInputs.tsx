import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent, FC } from 'react';

type TProps = {
  textInputs: {
    title: string;
    body: string;
  };
  setTextInputs: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

export const TextInputs: FC<TProps> = ({
  handleCreatePost,
  loading,
  setTextInputs,
  textInputs,
}) => {
  return (
    <Stack
      spacing={3}
      width='100%'>
      <Input
        name='title'
        value={textInputs.title}
        onChange={setTextInputs}
        fontSize='10pt'
        borderRadius={4}
        placeholder='Title'
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black',
        }}
      />
      <Textarea
        name='body'
        value={textInputs.body}
        onChange={setTextInputs}
        fontSize='10pt'
        height='100px'
        borderRadius={4}
        placeholder='Text (optional)'
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black',
        }}
      />
      <Flex justify='flex-end'>
        <Button
          height='34px'
          padding='0 30px'
          disabled={!Boolean(textInputs.title)}
          isLoading={loading}
          onClick={() => handleCreatePost()}>
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
