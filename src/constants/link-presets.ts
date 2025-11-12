import { LinkPreset, type NavBarLink } from "@/types/config";

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
  [LinkPreset.Home]: {
    name: "ホーム",
    url: "/",
  },
  [LinkPreset.About]: {
    name: "私たちについて",
    url: "/about/",
  },
  [LinkPreset.Archive]: {
    name: "タイムライン",
    url: "/archive/",
  },
  [LinkPreset.Series]: {
    name: "カラム",
    url: "/series/",
  },
  [LinkPreset.Friends]: {
    name: "友達",
    url: "/friends/",
  },
};
