import { Controller } from 'react-hook-form'

// @ts-ignore
import { Control } from 'react-hook-form/dist/types'

import { TextField, TextFieldProps } from '@mui/material'

interface FormInputTextProps<TFieldValues> {
  name: keyof TFieldValues
  label: string
  control?: Control<TFieldValues>
  required?: boolean
  textFieldProps?: TextFieldProps
}

export const FormInputText = <TFieldValues = any,>(
  props: FormInputTextProps<TFieldValues>,
) => {
  const { name, control, label, required = false, textFieldProps } = props

  return (
    <Controller
      defaultValue=""
      name={name as string}
      rules={{ required }}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error, invalid },
      }) => (
        <TextField
          helperText={error && invalid ? error.message : null}
          size="small"
          error={invalid}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          required
          role="textbox"
          {...textFieldProps}
        />
      )}
    />
  )
}
