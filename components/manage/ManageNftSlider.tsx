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
import NftSlider from "components/Profile/NftSlider";

interface Props {
  type: string;
  title: string;
  content: string;
  setContent: any;
  styles: Styles;
  setStyles: any;
  preview?: boolean;
}

export default function ManageNftSlider({
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
          value={String(styles?.size) ?? "md"}
          setValue={(e: any) => setStyles({ ...styles, size: e })}
          title="Size"
        />

        <SelectOption
          options={["slide", "cards", "creative", "coverflow", "flip"].map(
            (item) => {
              return { value: item, label: capFirstLetter(item) };
            }
          )}
          value={String(styles?.effect)}
          isMulti={false}
          setValue={(e: any) => setStyles({ ...styles, effect: e })}
          title="Effect"
        />

        <SelectOptionButton
          options={[1, 2, 3, 4]}
          value={String(styles?.slides) ?? 1}
          setValue={(e: any) => setStyles({ ...styles, slides: e })}
          title="Slides"
        />

        <SettingsButton
          title="Centered Slide"
          value={styles?.centered ?? false}
          setValue={(e: any) => setStyles({ ...styles, centered: e })}
          top
          bottom
        />

        {/* <SettingsButton
          title="Vertical Slider"
          value={styles?.vertical ?? false}
          setValue={(e: any) => setStyles({ ...styles, vertical: e })}
          top
          bottom
        /> */}

        <SettingsButton
          title="Navigation Buttons"
          value={styles?.nav ?? false}
          setValue={(e: any) => setStyles({ ...styles, nav: e })}
          top
          bottom
        />

        {styles?.nav && (
          <SelectColor
            options={{ gradient: false }}
            value={String(styles?.navColor)}
            setValue={(e: any) => setStyles({ ...styles, navColor: e })}
            title="Navigation Color"
          />
        )}

        <SettingsButton
          title="Autoplay"
          value={styles?.auto ?? false}
          setValue={(e: any) => setStyles({ ...styles, auto: e })}
          top
          bottom
        />

        <SelectOptionButton
          options={["cover", "contain", "fill"]}
          value={String(styles?.position)}
          setValue={(e: any) => setStyles({ ...styles, position: e })}
          title="Position"
        />

        <SelectColor
          value={String(styles?.bg)}
          setValue={(e: any) => setStyles({ ...styles, bg: e })}
          title={`${capFirstLetter(type)} BG Color`}
        />

        <SelectColor
          value={String(styles?.color)}
          setValue={(e: any) => setStyles({ ...styles, color: e })}
          title={`${capFirstLetter(type)} Item Color`}
        />
      </>
      {preview && (
        <>
          {styles.type && styles.eth && styles.network && (
            <NftSlider
              title={title ? title : capFirstLetter(type)}
              content={content}
              styles={styles}
              key={type.replace(" ", "-") + "-" + title}
            />
          )}
        </>
      )}
    </>
  );
}
