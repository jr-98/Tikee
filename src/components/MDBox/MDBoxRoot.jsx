import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default styled(Box)(({ theme, ownerState }) => {
	const { palette, borders, boxShadows } = theme;
	const { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow } = ownerState;

	const { gradients, grey } = palette;
	const { borderRadius: radius } = borders;
	const { colored } = boxShadows;
	const greyColors = {
		"grey-100": grey[100],
		"grey-200": grey[200],
		"grey-300": grey[300],
		"grey-400": grey[400],
		"grey-500": grey[500],
		"grey-600": grey[600],
		"grey-700": grey[700],
		"grey-800": grey[800],
		"grey-900": grey[900],
	};


	const validGradients = [
		"blue1",
		"blue2",
		"blue3",
		"blue4",
		"blue5",
		"orange1",
		"orange2",
		"orange3",
		"purple1",
		"purple3",
		"pink1",
		"pink2",
		"green1",
		"green2",
		"black1",
		"black2"
	];

	const validColors = [
		"transparent",
		"white",
		"primary",
		"secondary",
		"info",
		"success",
		"warning",
		"error",
		"grey-100",
		"grey-200",
		"grey-300",
		"grey-400",
		"grey-500",
		"grey-600",
		"grey-700",
		"grey-800",
		"grey-900"
	];

	const validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];
	const validBoxShadows = ["xs", "sm", "md", "lg", "xl", "xxl", "inset", "none"];
	// background value
	let backgroundValue = bgColor;

	if (variant === "gradient") {
		backgroundValue = validGradients.find((el) => el === bgColor)
			? gradients[bgColor]
			:  palette['white'].main;
	} else if (validColors.find((el) => el === bgColor)) {
		backgroundValue = palette[bgColor] ? palette[bgColor].main : greyColors[bgColor];
	} else {
		backgroundValue = bgColor;
	}

	// color value
	let colorValue = color;

	if (validColors.find((el) => el === color)) {
		colorValue = palette[color] ? palette[color].main : palette['white'].main;
	}

	// borderRadius value
	let borderRadiusValue = borderRadius;

	if (validBorderRadius.find((el) => el === borderRadius)) {
		borderRadiusValue = radius[borderRadius];
	}

	// boxShadow value
	let boxShadowValue = "none";

	if (validBoxShadows.find((el) => el === shadow)) {
		boxShadowValue = boxShadows[shadow];
	} else if (coloredShadow) {
		boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : "none";
	}

	return {
		opacity,
		background: backgroundValue,
		color: colorValue,
		borderRadius: borderRadiusValue,
		boxShadow: boxShadowValue,
	};
});
