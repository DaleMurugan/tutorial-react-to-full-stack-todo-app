import { Components } from "@mui/material";

export const components: Components = {
  MuiTextField: {
    styleOverrides: {
      root: {
        input: {
          color: "#ffffff",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ffffff",
          borderRadius: "8px",
          color: "#ffffff",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#1181C8",
          borderRadius: "8px",
          color: "#ffffff",
        },
        "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#1181C8",
            borderRadius: "8px",
            color: "#ffffff",
          },
      },
    },
  },
};
