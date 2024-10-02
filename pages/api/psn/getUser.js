//import type { Trophy } from "psn-api";

import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getTitleTrophies,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  makeUniversalSearch,
  TrophyRarity
} from "psn-api";


const mergeTrophyLists = (
  titleTrophies,//: Trophy[],
  earnedTrophies//: Trophy[]
) => {
  const mergedTrophies=[];

  for (const earnedTrophy of earnedTrophies) {
    const foundTitleTrophy = titleTrophies.find(
      (t) => t.trophyId === earnedTrophy.trophyId
    );

    mergedTrophies.push(
      normalizeTrophy({ ...earnedTrophy, ...foundTitleTrophy })
    );
  }

  return mergedTrophies;
};

const normalizeTrophy = (trophy) => {
  return {
    isEarned: trophy.earned ?? false,
    earnedOn: trophy.earned ? trophy.earnedDateTime : "unearned",
    type: trophy.trophyType,
    rarity: rarityMap[trophy.trophyRare ?? 0],
    earnedRate: Number(trophy.trophyEarnedRate),
    trophyName: trophy.trophyName,
    groupId: trophy.trophyGroupId
  };
};

const rarityMap = {
  [TrophyRarity.VeryRare]: "Very Rare",
  [TrophyRarity.UltraRare]: "Ultra Rare",
  [TrophyRarity.Rare]: "Rare",
  [TrophyRarity.Common]: "Common"
};

export default async function handler(req, res) {
  try {
    //console.log(req.query)
    const accessCode = await exchangeNpssoForCode("kUAOiSRpde1L8Ag57NtdPuoOoeOblzWnv377Vdd9NOnhKmx7UqIDQe3UM2NT2jzt");
  const authorization = await exchangeCodeForAccessToken(accessCode);

  // 2. Get the user's `accountId` from the username.
  const allAccountsSearchResults = await makeUniversalSearch(
    authorization,
    "xelnia",
    "SocialAllAccounts"
  );

  console.log( allAccountsSearchResults.domainResponses[0].results[0])

  const targetAccountId =
    allAccountsSearchResults.domainResponses[0].results[0].socialMetadata
      .accountId;

  // 3. Get the user's list of titles (games).
  const { trophyTitles } = await getUserTitles(authorization, targetAccountId);

  const games = [];
  for (const title of trophyTitles) {
    // 4. Get the list of trophies for each of the user's titles.
    const { trophies: titleTrophies } = await getTitleTrophies(
      authorization,
      title.npCommunicationId,
      "all",
      {
        npServiceName:
          title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined
      }
    );

    // 5. Get the list of _earned_ trophies for each of the user's titles.
    const { trophies: earnedTrophies } = await getUserTrophiesEarnedForTitle(
      authorization,
      targetAccountId,
      title.npCommunicationId,
      "all",
      {
        npServiceName:
          title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined
      }
    );

    // 6. Merge the two trophy lists.
    const mergedTrophies = mergeTrophyLists(titleTrophies, earnedTrophies);

    games.push({
      gameName: title.trophyTitleName,
      platform: title.trophyTitlePlatform,
      trophyTypeCounts: title.definedTrophies,
      earnedCounts: title.earnedTrophies,
      trophyList: mergedTrophies
    });
  }

  // 7. Write to a JSON file.
  res
          .status(200)
          .json({games : games});

    
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'auth error catch' });
  }
}
