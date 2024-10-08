import { Button, Input, Text, Textarea, useColorMode } from "@chakra-ui/react";
import { Styles } from "types";
import { capFirstLetter } from "core/utils";
import SelectOptionButton from "./SelectOptionButton";
import PSNProfile from "components/Profile/PSNProfile";
import { useState } from "react";
import { importPSNAccount } from "core/utils/dataImports";
import SelectColor from "./SelectColor";

interface Props {
  type: string;
  title: string;
  content: string;
  setContent: any;
  styles: Styles;
  setStyles: any;
  preview?: boolean;
}

export default function ManagePSNProfile({
  type,
  title,
  content,
  styles,
  setStyles,
  setContent,
  preview,
}: Props) {
  const { colorMode } = useColorMode();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const importPSN = async () => {
    setLoading(true);
    try {
      const name = username.split("/")[3].split("?")[0];
      const data = await importPSNAccount(name);
      if (data.status === 200) {
        const user = data.data;
        console.log(user);
        if (user.username.length > 0) {
          setContent(JSON.stringify(user));
          setLoaded(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      {!content && (
        <>
          <Text>Enter your PSNProfile URL : </Text>
          <Input
            size={"lg"}
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder="e.g. https://psnprofile.com/sam_shariat"
          />
          <Button size={"lg"} onClick={importPSN} isLoading={loading}>
            Import
          </Button>
        </>
      )}
      {content && (
        <>
          <SelectOptionButton
            options={["sm", "md", "lg"]}
            value={String(styles?.size) ?? "md"}
            setValue={(e: any) => setStyles({ ...styles, size: e })}
            title="Size"
          />

          <SelectColor
            value={String(styles?.bg)}
            setValue={(e: any) => setStyles({ ...styles, bg: e })}
            title={`${capFirstLetter(type)} BG Color`}
            defaultMode="solid"
          />
        </>
      )}
      {preview && loaded && (
        <>
          {content && (
            <PSNProfile
              title={title}
              content={content}
              styles={styles}
              key={"psn-profile-" + title}
            />
          )}
        </>
      )}
    </>
  );
}
