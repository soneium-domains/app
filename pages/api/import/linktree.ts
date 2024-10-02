import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";
import { AVAILABLE_LINKS } from "core/utils/constants";
import { Styles } from "types";

type Link = {
  type: string;
  title: string;
  url: string;
  image?: string;
  styles?: Styles;
};

type Social = {
  key: string;
  value: string;
};

type Data = {
  title: string;
  bio: string;
  avatar: string; // Add avatar URL
  links: Link[];
  socials: Social[]; // Add socials array
};

// Function to scrape Linktree page
async function scrapeLinktree(url: string) {
  try {
    const { data: html } = await axios.get(`https://linktr.ee/${url}`);
    const $ = cheerio.load(html);

    // Extract the title
    const title = $("#profile-title").text().trim();

    // Extract the bio
    const bio = $("#profile-description").text().trim() || "";

    // Extract the avatar
    const avatar = $("#profile-picture img").attr("src") || "";

    // Extract links
    const links: Link[] = [];
    $("#links-container .relative").each((index, element) => {
      const linkTitle = $(element).find("p").text().trim();
      const linkUrl = $(element).find("a").attr("href");
      const imgElement = $(element).find(
        'img[data-testid="LinkThumbnailImage"]'
      );
      const linkImage = imgElement.attr("src") || "";
      let linkType = "simple link"; // Default type if no specific match is found

      if (linkTitle && linkUrl) {
        // Iterate over AVAILABLE_LINKS to find the matching type
        for (let availableLink of AVAILABLE_LINKS) {
          const regex = availableLink.reg;

          // Check if the regex is valid and matches the URL
          if (regex && new RegExp(regex).test(linkUrl)) {
            linkType = availableLink.type;
            break; // Stop once we find the first match
          }
        }

        // Push the link object to the links array
        links.push({
          title: linkTitle,
          url: linkUrl,
          styles: { icon: linkImage, size : "md" },
          type: linkType,
        });
      }
    });

    // Extract socials (using data-testid="SocialIcon")
    const socials: Social[] = [];
    $('a[data-testid="SocialIcon"]').each((index, element) => {
      const socialTitle = $(element).attr("title") || "";
      const socialUrl = $(element).attr("href") || "";

      if (socialTitle && socialUrl) {
        socials.push({ key: socialTitle, value: socialUrl });
      }
    });

    return { title, bio, avatar, links, socials };
  } catch (error: any) {
    console.error(`Error scraping Linktree page: ${error.message}`);
    return { title: "", bio: "", avatar: "", links: [], socials: [] };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = req.query.user as string;

  if (!url) {
    return res
      .status(400)
      .json({ title: "", bio: "", avatar: "", links: [], socials: [] });
  }

  const userData = await scrapeLinktree(url);

  res.status(200).json(userData);
}
