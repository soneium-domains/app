import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

type Trophies = {
  total: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
};

type Stats = {
  gamesPlayed: number;
  completedGames: number;
  completionRate: string;
  unearnedTrophies: number;
  trophiesPerDay: string;
  views: number;
  worldRank: string;
  countryRank: string;
};

type Trophy = {
  name: string;
  description: string;
  game: string;
  rarity: string;
  type: string;
  imageUrl: string;
};

type Game = {
  name: string;
  platform: string;
  trophies: {
    total: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  completion: string;
  rank: string;
  imageUrl: string;
};

type RarestTrophy = {
  name: string;
  game: string;
  rarity: string;
  type: string;
  imageUrl: string;
};

type TrophyMilestone = {
  name: string;
  game: string;
  milestone: string;
  timeAgo: string;
  imageUrl: string;
};

type ProfileData = {
  username: string;
  avatar: string;
  level: number;
  levelProgress: string;
  comment: string;
  trophies: Trophies;
  stats: Stats;
  recentTrophies: Trophy[];
  games: Game[];
  rarestTrophies: RarestTrophy[];
  trophyMilestones: TrophyMilestone[];
};

// Helper function to extract trophies
function extractTrophy(element: any, $: any): Trophy {
  const name = $(element).find(".title").text().trim();
  const description = $(element)
    .find("td:nth-child(1) div:nth-child(2) span")
    .first()
    .text()
    .trim();
  const game = $(element)
    .find("td:nth-child(1) div:nth-child(3) a")
    .text()
    .trim();
  const rarity = $(element).find(".typo-top").text().trim();
  const type =
    $(element).find("td:nth-child(3) img").attr("title") || "unknown";
  const imageUrl = $(element).find("picture img").attr("src") || "";

  return { name, description, game, rarity, type, imageUrl };
}

// Helper function to extract games
function extractGame(element: any, $: any): Game {
  const name = $(element).find(".title").text().trim();
  const platform = $(element).find(".platform span").text().trim();
  const totalTrophies = parseInt(
    $(element).find(".small-info b").eq(1).text(),
    10
  );
  const gold = parseInt($(element).find(".icon-sprite.gold + span").text(), 10);
  const silver = parseInt(
    $(element).find(".icon-sprite.silver + span").text(),
    10
  );
  const bronze = parseInt(
    $(element).find(".icon-sprite.bronze + span").text(),
    10
  );
  const completion = $(element).find(".progress-bar span").text().trim();
  const rank = $(element).find(".game-rank").text().trim();
  const imageUrl = $(element).find("picture img").attr("src") || "";

  return {
    name,
    platform,
    trophies: { total: totalTrophies, gold, silver, bronze },
    completion,
    rank,
    imageUrl,
  };
}

// Function to scrape the PSNProfiles page
async function scrapePSNProfiles(url: string) {
  try {
    const { data: html } = await axios.get(`https://psnprofiles.com/${url}`);
    const $ = cheerio.load(html);

    // Extract username
    const username = $(".username").text().trim();

    // Extract avatar image URL
    const avatar = $("#user-bar .avatar img").attr("src") || "";

    // Extract the level and progress
    const level = parseInt(
      $(".level-box .flex.vertical.center span").text().trim(),
      10
    );
    const levelProgress =
      $(".level-box .progress-bar.level div")
        .attr("style")
        ?.match(/width:\s*([\d.]+)%/)?.[1] || "";

    // Extract comment
    const comment = $(".comment").text().trim();

    // Extract trophies
    const trophies: Trophies = {
      total: parseInt($(".total").text().trim(), 10),
      platinum: parseInt($(".platinum").text().trim(), 10),
      gold: parseInt($(".gold").text().trim(), 10),
      silver: parseInt($(".silver").text().trim(), 10),
      bronze: parseInt($(".bronze").text().trim(), 10),
    };

    // Extract stats
    const stats: Stats = {
      gamesPlayed: parseInt($(".stats .stat").eq(0).text().trim(), 10),
      completedGames: parseInt($(".stats .stat").eq(1).text().trim(), 10),
      completionRate: $(".stats .stat")
        .eq(2)
        .text()
        .trim()
        .replace("Completion", "")
        .trim(),
      unearnedTrophies: parseInt($(".stats .stat").eq(3).text().trim(), 10),
      trophiesPerDay: $(".stats .stat")
        .eq(4)
        .text()
        .trim()
        .replace("Trophies Per Day", "")
        .trim(),
      views: parseInt($(".stats .stat").eq(5).text().trim(), 10),
      worldRank: $(".rank a").text().trim().replace("World Rank", "").trim(),
      countryRank: $(".country-rank a")
        .text()
        .trim()
        .replace("Country Rank", "")
        .trim(),
    };

    const recentTrophies: Trophy[] = [];
    $('#recent-trophies li').each((i, element) => {
      recentTrophies.push(extractTrophy($(element), $));
    });

    // Extract games
    const games: Game[] = [];
    $('#gamesTable tr').each((i, element) => {
      games.push(extractGame($(element), $));
    });

    // Extract rarest trophies
    const rarestTrophies: RarestTrophy[] = [];
    $('.box.no-top-border table tbody tr').each((i, element) => {
      const name = $(element).find('.small-title').text().trim();
      const game = $(element).find('td:nth-child(2) a').eq(1).text().trim();
      const rarity = $(element).find('.typo-top').text().trim();
      const type = $(element).find('td:nth-child(4) img').attr('title') || 'unknown';
      const imageUrl = $(element).find('picture img').attr('src') || '';
      rarestTrophies.push({ name, game, rarity, type, imageUrl });
    });

    // Extract trophy milestones
    const trophyMilestones: TrophyMilestone[] = [];
    $('.box.zebra tbody tr').each((i, element) => {
      const name = $(element).find('.small-title').text().trim();
      const game = $(element).find('td:nth-child(2) a').eq(1).text().trim();
      const milestone = $(element).find('.typo-top-smaller').text().trim();
      const timeAgo = $(element).find('.typo-bottom-date').text().trim();
      const imageUrl = $(element).find('picture img').attr('src') || '';
      trophyMilestones.push({ name, game, milestone, timeAgo, imageUrl });
    });

    // Return all the scraped data
    return {
      username,
      avatar,
      level,
      levelProgress,
      comment,
      trophies,
      stats,
      recentTrophies,
      games,
      rarestTrophies,
      trophyMilestones
    };
  } catch (error: any) {
    console.error(`Error scraping PSNProfiles page: ${error.message}`);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileData | { error: string }>
) {
  const url = req.query.user as string;

  if (!url) {
    return res.status(400).json({ error: "USER is required" });
  }

  const profileData = await scrapePSNProfiles(url);

  if (profileData) {
    res.status(200).json(profileData);
  } else {
    res.status(500).json({ error: "Error fetching data" });
  }
}
