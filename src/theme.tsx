import { createTheme } from "@mui/material";
import { components } from "./theme/override";
import { typography } from "./theme/typography";
const theme = createTheme({
  typography,
  components,
});

export default theme;
