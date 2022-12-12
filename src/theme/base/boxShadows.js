import { themeColors } from "./colors";
import boxShadow from "../functions/boxShadow";

const { black } = themeColors

const boxShadows = {
	xs: boxShadow([0, 2], [9, -5], black, 0.15),
	sm: boxShadow([0, 5], [10, 0], black, 0.12),
	md: `${boxShadow([0, 4], [6, -1], black, 0.1)}, ${boxShadow(
		[0, 2],
		[4, -1],
		black,
		0.06
	)}`,
	lg: `${boxShadow([0, 10], [15, -3], black, 0.1)}, ${boxShadow(
		[0, 4],
		[6, -2],
		black,
		0.05
	)}`,
	xl: `${boxShadow([0, 20], [25, -5], black, 0.1)}, ${boxShadow(
		[0, 10],
		[10, -5],
		black,
		0.04
	)}`,
	xxl: boxShadow([0, 20], [27, 0], black, 0.05),

};

export default boxShadows;
