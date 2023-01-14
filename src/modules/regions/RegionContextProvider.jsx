import React, { useEffect, useCallback, useState } from "react";
import { useLocation } from "@reach/router";
import RegionContext from "./context";

export default function RegionContextProvider(props) {
  const { pathname } = useLocation();

  const getCurrentRegion = useCallback(() => {
    let regionToReturn = "all";

    [
      { slug: "europe", region: "eur" },
      { slug: "etats-unis", region: "usa" },
      { slug: "japon", region: "jap" },
    ].some(({ slug, region }) => {
      if (!pathname.includes(slug)) {
        return false;
      }

      regionToReturn = region;

      return true;
    });

    return regionToReturn;
  }, [pathname]);

  const getDefaultRegion = useCallback(() => {
    const isSSR = typeof window === "undefined";

    const regionFromURL = getCurrentRegion();
    return isSSR
      ? regionFromURL
      : regionFromURL === "all"
      ? localStorage.getItem("region") || "all"
      : regionFromURL;
  }, [getCurrentRegion]);

  const [currentRegion, setCurrentRegion] = useState(getDefaultRegion());

  useEffect(() => {
    if (pathname.includes("/jeux-de")) {
      const regionFromURL = getCurrentRegion();
      setCurrentRegion(regionFromURL);
      localStorage.setItem("region", regionFromURL);
    }
  }, [pathname, getCurrentRegion]);

  return (
    <RegionContext.Provider value={{ region: currentRegion }} {...props} />
  );
}
