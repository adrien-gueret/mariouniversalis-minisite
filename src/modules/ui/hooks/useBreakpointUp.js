import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "styled-components";

export default function useBreakpointUp(breakpoint) {
  const { breakpoints } = useContext(ThemeContext);

  const breakpointToCheck = breakpoints[breakpoint] || 0;

  const isSSR = typeof window === "undefined";

  const checkBreakpoint = useCallback(() => {
    const width = isSSR ? 0 : window.innerWidth;
    return width >= breakpointToCheck;
  }, [breakpointToCheck, isSSR]);

  const [doesBreakpointMatchWidth, setDoesBreakpointMatchWidth] = useState(
    checkBreakpoint()
  );

  useEffect(() => {
    if (isSSR) {
      return;
    }

    const onResize = () => {
      setDoesBreakpointMatchWidth(checkBreakpoint());
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [isSSR, checkBreakpoint]);

  return doesBreakpointMatchWidth;
}
