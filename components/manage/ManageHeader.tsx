import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  Heading,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { LinkIcon, Logo } from 'components/logos';
import { colorModeAtom, nameAtom } from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';

export default function ManageHeader() {
  const name = useAtomValue(nameAtom);
  const [notMobile] = useMediaQuery('(min-width: 992px)');

  return (
    <Flex gap={2} justify={'space-between'} align={'center'} mb={2}>
      <NextLink href="/names" passHref>
        <Button fontWeight="bold" p={2} gap={[0,0,0,2]} size={'lg'}>
          <LinkIcon type='RiArrowLeftLine' />
          <Text>
            {notMobile ? 'My Names' : ''}
          </Text>
        </Button>
      </NextLink>
    <Button fontWeight="bold" variant="ghost" p={2} gap={2} size={'lg'}>
      <Logo />
      <Heading bgGradient={useColorModeValue(
              'linear(to-r, var(--base2), var(--blue2))',
              'linear(to-r, var(--base0), var(--blue0))'
            )}
            bgClip="text" fontSize={'xl'} fontWeight={'bold'}>
        {name}
      </Heading>
      </Button>
    </Flex>
  );
}
