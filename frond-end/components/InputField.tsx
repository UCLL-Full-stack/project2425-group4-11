import { TextField, TextFieldProps } from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, "type"> {
    label: string;
    secure?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    secure = false,
    ...rest
}) => {
    return (
        <>
            <TextField
                label={label}
                type={secure ? "password" : "text"}
                fullWidth
                variant="outlined"
                {...rest}
            />
        </>
    )
}

export default InputField;