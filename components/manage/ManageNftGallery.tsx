import { Text, Textarea, useColorMode } from "@chakra-ui/react";
import { Styles } from "types";
import { capFirstLetter } from "core/utils";
import WalletInput from "./WalletInput";
import Donate from "components/Profile/Donate";
import Pay from "components/Profile/Pay";
import SelectOptionButton from "./SelectOptionButton";
import AddressInput from "./AddressInput";
import { useAtomValue } from "jotai";
import { connectedAccountAtom } from "core/atoms";
import NftGallery from "components/Profile/NftGallery";
import SelectOption from "./SelectOption";
import { BG_COLORS_SAMPLE, WALLETS } from "core/utils/constants";
import SelectColor from "./SelectColor";
import SettingsButton from "./SettingButton";
import ManageNftSlider from "./ManageNftSlider";
import IconPicker from "./IconPicker";

interface Props {
  type: string;
  title: string;
  content: string;
  setContent: any;
  styles: Styles;
  setStyles: any;
  preview?: boolean;
}

export default function ManageNftGallery({
  type,
  title,
  content,
  styles,
  setStyles,
  setContent,
  preview,
}: Props) {
  const { colorMode } = useColorMode();

  const connectedAccount = useAtomValue(connectedAccountAtom);

  return (
    <>
      <>
        <SelectOptionButton
          options={["slider", "button"]}
          value={String(styles?.mode)}
          setValue={(e: any) => setStyles({ ...styles, mode: e })}
          title="Type"
        />

        {styles.mode === "slider" ? (
          <ManageNftSlider
            type={type}
            title={title}
            content={content}
            styles={styles}
            setStyles={setStyles}
            setContent={setContent}
          />
        ) : (
          <>
            <SelectOptionButton
              options={["My Portfolio", "Collection"]}
              value={String(styles?.type)}
              setValue={(e: any) => {
                setStyles({
                  ...styles,
                  type: e,
                  eth: e === "My Portfolio" ? connectedAccount : undefined,
                });
              }}
              title="Source"
            />

            <SelectOption
              options={WALLETS}
              value={String(styles?.network)}
              setValue={(e: any) => setStyles({ ...styles, network: e })}
              title="Chain"
              isMulti={false}
            />

            {styles.type === "Collection" && (
              <AddressInput
                title="Collection Address"
                value={styles?.eth ?? ""}
                setValue={(e: any) => setStyles({ ...styles, eth: e })}
              />
            )}

            <SelectOptionButton
              options={["sm", "md", "lg", "full"]}
              value={String(styles?.size)}
              setValue={(e: any) => setStyles({ ...styles, size: e })}
              title="Size"
            />

            <IconPicker
              value={styles?.icon}
              setValue={(e: any) => setStyles({ ...styles, icon: e })}
            />

            <SelectColor
              value={String(styles?.bg)}
              setValue={(e: any) => setStyles({ ...styles, bg: e })}
              title={`Button BG Color`}
            />
          </>
        )}
      </>
      {preview && (
        <>
          {styles.type && styles.eth && styles.network && (
            <NftGallery
              title={title ? title : "NFT Gallery"}
              type={type}
              content={content}
              styles={styles}
              key={"nft-gallery-" + title}
            />
          )}
        </>
      )}
    </>
  );
}
