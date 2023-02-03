import { useDirectory } from '@/hooks/useDirectory';
import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IconType } from 'react-icons';

type TProps = {
  communityName: string;
  link: string;
  icon: IconType;
  iconColor: string;
  communityImageURL?: string;
};

export const CommunityItem: FC<TProps> = ({
  communityName,
  icon,
  iconColor,
  link,
  communityImageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width='100%'
      fontSize='10pt'
      _hover={{ bg: 'gray.100' }}
      onClick={() =>
        onSelectMenuItem({
          communityName,
          icon,
          iconColor,
          link,
          communityImageURL,
        })
      }>
      <Flex align='center'>
        {communityImageURL ? (
          <Image
            src={communityImageURL}
            alt='Community image'
            borderRadius='full'
            boxSize='20px'
            mr={2}
            fit='fill'
          />
        ) : (
          <Icon
            as={icon}
            fontSize={20}
            mr={2}
            color={iconColor}
          />
        )}
        {communityName}
      </Flex>
    </MenuItem>
  );
};
