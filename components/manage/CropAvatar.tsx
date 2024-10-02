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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  useToast,
  Progress,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  avatarAtom,
  avatarNftAtom,
  claimingNameAtom,
  editedAvatarAtom,
  editingAvatarAtom,
  editingAvatarFileAtom,
  nameAtom,
} from 'core/atoms';

import { RiAddLine, RiZoomInLine } from 'react-icons/ri';
import { IPFS_IO_URL, MAX_FILE_UPLOAD, SITE_URL, SITE_URL_SHORT, TLD } from 'core/utils/constants';
import { Avatar } from 'components/Profile';
import AvatarEditorJs from './AvatarEditorJs';
import { client, fleekSdk } from 'components/walletConnect';
import { upload } from "thirdweb/storage";

export default function CropAvatar() {
  const [progress, setProgress] = useState({ progress: 0, total: 0 });
  const { colorMode } = useColorMode();
  const name = useAtomValue(claimingNameAtom) + '.' + TLD;
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const editingAvatar = useAtomValue(editingAvatarAtom);
  const [editingAvatarFile, setEditingAvatarFile] = useAtom(editingAvatarFileAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [zoomValue, setZoomValue] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const cropRef = useRef(null);
  

  const toast = useToast();

  useEffect(() => {
    
    async function getNftBlob() {
      console.log('getting blob');
      setIsLoading(true);
      const result = await fetch(editingAvatar);
      const blob = await result.blob();
      setEditingAvatarFile(new File([blob], name));
      setIsLoading(false);
    }

    if (editingAvatar !== '') {
      setProgress({progress:0,total:0});
      if (editingAvatar.includes('localhost') || editingAvatar.includes(SITE_URL_SHORT)) {
        if (editingAvatarFile) {
          if (editingAvatarFile.size > MAX_FILE_UPLOAD) {
            toast({
              status: 'warning',
              title: 'File is too big',
              description:
                'Maximum file size for avatar image is 15 MB. please select an smaller image file',
              isClosable: true,
            });
            onClose();
          }
          if (editingAvatarFile.type.includes('svg') || editingAvatarFile.type.includes('gif')) {
            onOpen();
            handleSkip();
          } else {
            onOpen();
          }
        }
      } else {
        if (!editingAvatarFile) {
          onOpen();
          getNftBlob();
        } else {
          if (editingAvatarFile.type.includes('svg') || editingAvatarFile.type.includes('gif')) {
            onOpen();
            handleSkip();
          } else {
            onOpen();
          }
        }
      }
    }
  }, [editingAvatarFile, editingAvatar]);

  const handleSave = async () => {
    if (cropRef?.current) {
      // @ts-ignore: Unreachable code error
      const image = cropRef?.current.getImage().toDataURL();
      const result = await fetch(image);
      const blob = await result.blob();
      await sendproFileToIPFS(new File([blob], name));
      onClose();
    }
  };

  const handleSkip = async () => {
    await sendproFileToIPFS(editingAvatarFile);
    onClose();
  };

  // const AvatarEditorComponent = (props): React.ReactElement => {
  //   return <><AvatarEditor {...props}/></>
  // }

  const sendproFileToIPFS = async (e: any) => {
    if (e) {
      if (e.size > MAX_FILE_UPLOAD) {
        toast({
          status: 'warning',
          title: 'File is too big',
          description:
            'Maximum file size for avatar image is 15 MB. please select an smaller image file',
          isClosable: true,
        });

        onClose();
        return;
      }

      try {
        setIsLoading(true)
        const formData = [e];
        console.log(e);
        const uris = await upload({ client, files: formData});
        console.log(uris);
        // const uri = await fleekSdk.storage().uploadFile({
        //   file: e,
        //   onUploadProgress: (event)=> {setProgress({progress: event.loadedSize, total: Number(event.totalSize)})},

        // });
        //setAvatar('https://ipfs.io/ipfs/' + uri.pin.cid);
        setAvatar(IPFS_IO_URL + uris.toString().slice(7));
        setIsLoading(false)

      } catch (error) {
        alert('Error sending File to IPFS: ');
        setIsLoading(false)

        //// console.log(error);
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>Edit Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingAvatarFile && (
              <Stack gap={8} align={'center'}>
                {!editingAvatarFile.type.includes('svg') &&
                !editingAvatarFile.type.includes('gif') ? (
                  <>
                    <AvatarEditorJs
                      ref={cropRef}
                      crossOrigin="anonymous"
                      image={editingAvatar}
                      style={{ width: '100%', height: '100%' }}
                      border={24}
                      borderRadius={150}
                      color={[0, 0, 0, 0.72]}
                      scale={zoomValue / 10}
                      rotate={0}
                    />
                    <Slider
                      aria-label="avatar-zoom"
                      min={10}
                      max={50}
                      size="lg"
                      defaultValue={zoomValue}
                      w={'90%'}
                      colorScheme="green"
                      value={zoomValue}
                      onChange={(e) => setZoomValue(e)}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb boxSize={6}>
                        <Box color="var(--base)" as={RiAddLine} />
                      </SliderThumb>
                    </Slider>
                  </>
                ) : (
                  <>
                    <Avatar maxH={'350px'} url={editingAvatar} shape={'none'} />
                  </>
                )}
              </Stack>
            )}
          </ModalBody>
          <ModalFooter gap={4}>
            {progress.total === 0 && !isLoading ? (
              <Flex gap={4}>
                {editingAvatarFile &&
                  !editingAvatarFile.type.includes('svg') &&
                  !editingAvatarFile.type.includes('gif') && (
                    <Button
                      color="white"
                      bgColor="var(--base1)"
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      loadingText={'Uploading...'}
                      onClick={handleSave}>
                      Crop & Upload
                    </Button>
                  )}
                <Button
                  color="white"
                  bgColor="var(--base1)"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  loadingText={isLoading ? 'Loading...' : 'Uploading...'}
                  onClick={handleSkip}>
                  Upload Orginal
                </Button>
              </Flex>
            ) : (
              <Flex w={'100%'}>
                <Progress
                  sx={{
                    '& > div:first-of-type': {
                      transitionProperty: 'width',
                      background: 'linear-gradient(to right, #007bff 10%, #5CABFF 90%)',
                    },
                  }}
                  size={'xs'}
                  min={0}
                  max={progress.total !== 0 ? progress.total : 100}
                  rounded={'full'}
                  height={'40px'}
                  width={'100%'}
                  value={progress.progress}
                  isAnimated/>
                  <Text fontSize={'lg'} fontWeight={'bold'} position={'absolute'} py={1.5} width={['xs','sm']} textAlign={'center'}>{progress.total !== 0 ? `${Math.round((progress.progress / progress.total) * 100)}%` : `Preparing ...`}</Text>
              </Flex>
            )}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
