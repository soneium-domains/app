import { Text, Textarea, useColorMode } from "@chakra-ui/react";
import { Styles } from "types";
import { capFirstLetter } from "core/utils";
import WalletInput from "./WalletInput";
import Donate from "components/Profile/Donate";
import Pay from "components/Profile/Pay";
import SelectOptionButton from "./SelectOptionButton";
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

export default function ManageDonate({
  type,
  title,
  content,
  styles,
  setStyles,
  setContent,
  preview,
}: Props) {
  const { colorMode } = useColorMode();

  return (
    <>
      <>
        <WalletInput
          title="Ethereum"
          value={styles?.eth ?? ""}
          setValue={(e: any) => setStyles({ ...styles, eth: e })}
        />
        <WalletInput
          title="Bitcoin"
          value={styles?.btc ?? ""}
          setValue={(e: any) => setStyles({ ...styles, btc: e })}
        />
        <Text>Thank you note</Text>
        <Textarea
          minWidth="xs"
          title="Thank you note"
          my={2}
          rows={2}
          maxLength={500}
          placeholder={`${capFirstLetter(
            type.slice(0, type.indexOf(" "))
          )} Successful. Thank you`}
          size="lg"
          bg={colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100"}
          variant="outline"
          border="none"
          resize={"none"}
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />

        <SelectOptionButton
          options={["sm", "md", "lg"]}
          value={String(styles?.size)}
          setValue={(e: any) => setStyles({ ...styles, size: e })}
          title="Size"
        />
        <IconPicker
          value={styles?.icon}
          setValue={(e: any) => setStyles({ ...styles, icon: e })}
        />
      </>
      {preview && (
        <>
          {(styles.btc || styles.eth) && type.includes("donate") && (
            <Donate
              title={title ? title : "Donate"}
              type={type}
              content={content}
              style={styles}
              key={"donate" + content.toString()}
            />
          )}

          {(styles.btc || styles.eth) && type.includes("pay") && (
            <Pay
              type={type}
              title={title ? title : "Pay"}
              content={content}
              style={styles}
              key={"pay" + content.toString()}
            />
          )}
        </>
      )}
    </>
  );
}
