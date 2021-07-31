import useBreakpointUp from './useBreakpointUp';

// TODO: move this next function into a more public service
import { next } from '../../theme/themes/default/constants/breakpoints';

export default function useBreakpoint(breakpoint) {
    const isOnRequestedBreakpoint = useBreakpointUp(breakpoint);
    const nextBreakpoint = next(breakpoint);
    const isOnNextBreakpoint = useBreakpointUp(nextBreakpoint);

    if (breakpoint === nextBreakpoint) {
        return isOnRequestedBreakpoint;
    }

    return isOnRequestedBreakpoint && !isOnNextBreakpoint;
}