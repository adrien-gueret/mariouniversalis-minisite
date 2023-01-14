const breakpointValues = {
  xs: 360,
  sm: 700,
  md: 950,
  lg: 1280,
};

export function next(breakpointToCheck) {
  return ["xs", "sm", "md", "lg"].reduce(
    (
      nextBreakpoint,
      currentBreapoint,
      currentBreakpointIndex,
      allBreakpoints
    ) => {
      if (currentBreapoint === breakpointToCheck) {
        return allBreakpoints[currentBreakpointIndex + 1] || nextBreakpoint;
      }

      return nextBreakpoint;
    },
    "lg"
  );
}

const breakpoints = {
  ...breakpointValues,
  up(breakpoint) {
    return `@media (min-width: ${breakpointValues[breakpoint]}px)`;
  },
  only(breakpoint) {
    return `@media (min-width: ${
      breakpointValues[breakpoint]
    }px) and (max-width: ${breakpointValues[next(breakpoint)] - 1}px)`;
  },
};

export default breakpoints;
