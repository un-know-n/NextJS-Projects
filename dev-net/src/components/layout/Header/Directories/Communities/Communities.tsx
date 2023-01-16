import { CreateCommunityModal } from '@/components/shared/Modals/CreateCommunity/CreateCommunityModal';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';

type Props = {};

export const Communities = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal
        isOpen={open}
        handleClose={() => setOpen(false)}
      />
      <MenuItem
        width='100%'
        fontSize='10pt'
        _hover={{ bg: 'gray.100' }}
        onClick={() => setOpen(true)}>
        <Flex>
          <Icon
            fontSize={20}
            mr={2}
            as={GrAdd}
          />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};
