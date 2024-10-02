import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiAddFill, RiAddLine, RiFileCopy2Line } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import {
  addLinkTypeAtom,
  openImportAtom,
} from 'core/atoms';
import { capFirstLetter } from 'core/utils';
import { LinkIcon } from 'components/logos';
import AddWalletButton from './AddWalletButton';
import AddLinkButton from './AddLinkButton';
import AddSocialButton from './AddSocialButton';
import ImportLinktree from './ImportLinktree';

export default function ImportModal({ type = 'full' }: { type?: 'square' | 'full' }) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_open, _setOpen] = useAtom(openImportAtom);

  useEffect(() => {
    if (_open) {
      onOpen();
    }
  }, [_open]);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {type === 'square' ? (
        <Button
          colorScheme={colorMode === 'light' ? "blackAlpha" : 'gray'}
          bgGradient={
            colorMode === 'light'
              ? 'linear(to-r, var(--darkAlpha), var(--dark2))'
              : 'linear(to-r, var(--whiteAlpha), var(--dark2))'
          }
          gap={2}
          w={'100%'}
          borderRadius={12}
          onClick={onOpen}
          className="add"
          flexDirection={'column'}
          height="72px">
          <LinkIcon type='RiDownloadFill' size={'28px'} />
          Import
        </Button>
      ) : (
        <Button variant={"pop"} rounded={'xl'} gap={2} onClick={onOpen} className="add" w={'100%'} size={'lg'}>
          <LinkIcon type='RiDownloadFill' size={'28px'} />
          Import To Profile
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={['full','full','lg','xl','2xl']}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>Import Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={'center'} alignContent={'center'}>
            <Stack gap={2}>
              <ImportLinktree />
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent={'center'} fontSize={'xs'}>
            Updating Regularly
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
