import { createBreakpoints } from "@mui/system";

const breakpoints = {
	values: {
		xs: 0,
		sm: 600,
		md: 960,
		lg: 1280,
		xl: 1840
	}
}
export const customBreakpoints = createBreakpoints({ ...breakpoints })

export default breakpoints;
