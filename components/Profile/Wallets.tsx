import { Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { LinkIcon } from 'components/logos';
import {
  addressAtom,
  walletButtonsAtom,
  walletsArrayAtom,
} from 'core/atoms';
import WalletLink from './WalletLink';
import { arraysEqual, capFirstLetter } from 'core/utils';
import { ObjectItem } from 'types';
import AnimateOpacity from 'components/animate/AnimateOpacity';
import AnimateOnScroll from 'components/animate/AnimateOnScroll';

interface Props {
  json: any;
  color?: string;
  onlyIcons?: boolean;
}

export default function Wallets({ json, color, onlyIcons }: Props) {
  const [walletsArray, setWalletsArray] = useAtom(walletsArrayAtom);
  const _onlyIcons = onlyIcons ? onlyIcons : false;
  const _walletButtons = useAtomValue(walletButtonsAtom);

  useEffect(() => {
    let _wallets: ObjectItem[] = [];
    for (const key in json.wallets) {
      json.wallets[key] && _wallets.push({ key: key, value: json.wallets[key] });
    }

    if (!arraysEqual(_wallets,walletsArray)) {
      // console.log(_wallets);
      setWalletsArray(_wallets);
    }
    // console.log(_wallets);
  }, []);

  return (
    <>
      <Flex my={2} flexDirection={_onlyIcons ? 'row' : 'column'} gap={2} w={'100%'}>
        {walletsArray.map(
          (item,ind) =>
            item.key && (
              <AnimateOnScroll
              styles={{overflow : 'visible', width:'100%'}} delay={(ind * 0.2) + 2}>
              <WalletLink
                key={`item-${item.key}-${item.value?.slice(4)}`}
                title={capFirstLetter(item.key)}
                onlyIcon={_onlyIcons}
                color={color ? color : undefined}
                url={String(item.value)}
              />
              </AnimateOnScroll>
            )
        )}
      </Flex>
    </>
  );
}
