import { Button, ButtonGroup, Flex, FormControl, FormLabel, Text, useColorModeValue, useMultiStyleConfig, useTheme } from '@chakra-ui/react';
import { buttonBgColorAtom, roundAtom, variantAtom } from 'core/atoms';
import { useAtomValue } from 'jotai';
import { SelectOptionType } from 'types';
import { Select } from "chakra-react-select";
import { WALLETS } from 'core/utils/constants';
import { useState } from 'react';
import { capFirstLetter } from 'core/utils';
interface Props {
  title?: string;
  value: string;
  setValue: Function;
  options: string[] | any[];
  isMulti: boolean;
}
export default function SelectOption({ title, value, setValue, options, isMulti }: Props) {
  const { th } = useMultiStyleConfig("Table", {});

  const theme = useTheme();
  const outlineColor = useColorModeValue(
    theme.colors.blue[500],
    theme.colors.blue[300]
  );

  return (
    <Flex gap={2} width={'100%'} alignItems={'center'} justify={'center'}>
      <FormLabel fontWeight={'bold'} fontSize={'lg'}>
          {title}
        </FormLabel>
      <FormControl onChange={(e)=> console.log(e)}>
        
      <Select
          isMulti={isMulti}
          name={title}
          options={options}
          defaultValue={{value:value, label:capFirstLetter(value)}}
          size={'lg'}
          //@ts-ignore
          onChange={(e)=> setValue(e.value)}
          placeholder={`Select ${title}`}
          closeMenuOnSelect={true}
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              p: 0,
              w: "40px"
            }),
            control: (provided, state) => ({
              ...provided,
              borderBottomLeftRadius: state.menuIsOpen ? 0 : "md",
              borderBottomRightRadius: state.menuIsOpen ? 0 : "md",
              transitionDuration: 0
            }),
            group: (provided) => ({
              ...provided,
              borderBottomWidth: "1px",
              _last: {
                borderBottomWidth: 0,
              },
              zIndex: 2000
            }),
            groupHeading: (provided) => ({
              ...provided,
              fontSize: th.fontSize,
              color: th.color,
              fontWeight: th.fontWeight,
              px: "0.8rem",
              textTransform: "uppercase",
              zIndex: 2000
            }),
            menu: (provided) => ({
              ...provided,
              my: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              shadow: `0 0 0 1px ${outlineColor}`,
              borderWidth: "1px",
              borderColor: outlineColor,
              borderBottomRadius: "md",
              zIndex: 2000
            }),
            menuList: (provided) => ({
              ...provided,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderWidth: 0,
              zIndex: 2000
            })
          }}
          className="chakra-react-select"
          classNamePrefix="chakra-react-select"
        /></FormControl>
      {/* <ButtonGroup isAttached justifyContent={'center'} display={'flex'} alignItems={'center'}>
        {options.map((option,i) => (
          <Button
            px={[3.5,4,3.5,3.5,3.5,5]}
            // colorScheme={bgColor}
            // rounded={round}
            variant={'outline'}
            zIndex={100+i}
            key={`button-select-${title}-${option}`}
            isActive={String(value) === String(option)}
            onClick={()=> setValue(option)}>
            {String(option)}
          </Button>
        ))}
      </ButtonGroup> */}
    </Flex>
  );
}
