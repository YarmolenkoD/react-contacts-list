import { useForm } from 'react-hook-form'

export interface IAddContactForm {
  name: string
  city: string
}

export const defaultContactFormValues = {
  name: '',
  city: '',
}

interface UseContactFormParams {
  defaultValues: IAddContactForm
}

export const useContactForm = (params?: UseContactFormParams) => {
  return useForm<IAddContactForm>({
    defaultValues: params?.defaultValues ?? defaultContactFormValues,
  })
}
