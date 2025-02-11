import React from "react";
import {
  createTheme,
  outlinedInputClasses,
  TextField,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material";

interface InputFormProps {
  label: string;
  typeInput: React.HTMLInputTypeAttribute | undefined;
  defaultValue?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  label,
  typeInput,
  defaultValue,
  onChange,
}) => {
  return (
    // <ThemeProvider theme={inputTheme}>
    <TextField
      defaultValue={defaultValue}
      label={label}
      variant="outlined"
      type={typeInput}
      fullWidth
      onChange={onChange}
    />
    // </ThemeProvider>
  );
};

export default InputForm;
