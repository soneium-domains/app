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
import EmbedModal from "components/Profile/EmbedModal";
import ManageSimpleLink from "./ManageSimpleLink";

interface Props {
  title: string;
  url?:string;
  type: string;
  setUrl: any;
  styles: Styles;
  setStyles: any;
  preview?: boolean;
}

export default function ManageEmbedLink({
  title,
  type,
  url,
  styles,
  setStyles,
  setUrl,
  preview,
}: Props) {
  const { colorMode } = useColorMode();

  const connectedAccount = useAtomValue(connectedAccountAtom);

  return (
    <>
      <>
        
        <SelectOptionButton
          options={["modal", "direct"]}
          value={String(styles?.type)}
          setValue={(e: any) => setStyles({ ...styles, type: e })}
          title="Type"
        />

        <ManageSimpleLink type={type} url={url ?? ''} styles={styles} setStyles={setStyles} setUrl={setUrl} />

        {styles.type === "modal" && (
          <>
            <SelectColor
              value={String(styles?.bg)}
              setValue={(e: any) => setStyles({ ...styles, bg: e })}
              title="BG Color"
            />

          </>
        )}
      </>
      {preview && (
        <>
          {styles.type && url && title && (
            <EmbedModal
              title={title}
              url={url}
              type={'type'}
              styles={styles}
              key={"embed-modal-" + title.replaceAll(' ','-')}
            />
          )}
        </>
      )}
    </>
  );
}
