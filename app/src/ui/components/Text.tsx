import { styled } from "../theme";

const textStyles = { fontSize: "$2" };
const headingStyles = { fontWeight: "$light", color: "$ppForest" };

const Text = styled("span", textStyles) as any;
Text.Regular = Text;
Text.Small = styled("span", {
  ...textStyles,
  fontSize: "$1",
}) as any;
Text.Tiny = styled("span", { ...textStyles, fontSize: "$0" }) as any;

Text.H1 = styled("h1", { ...headingStyles });
Text.H2 = styled("h2", { ...headingStyles });
Text.H3 = styled("h3", { ...headingStyles });
Text.H4 = styled("h4", { ...headingStyles });
Text.H5 = styled("h5", { ...headingStyles });
Text.H6 = styled("h6", { ...headingStyles });

export default Text;
