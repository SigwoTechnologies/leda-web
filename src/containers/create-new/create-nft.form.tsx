import { useForm, SubmitHandler, UseFormProps, FieldErrors, FieldValues } from 'react-hook-form';
import React, { ReactElement } from 'react';

type Props<T extends FieldValues> = {
  form?: UseFormProps<T>;
  children: ReactElement | ReactElement[];
  onSubmit: SubmitHandler<T>;
};

const CreateNftForm = <T extends FieldValues>({ form, children, onSubmit }: Props<T>) => {
  const methods = useForm<T>(form);
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) =>
        child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                error: errors[child.props.name as keyof FieldErrors<T>],
                key: child.props.name,
              },
            })
          : child
      )}
    </form>
  );
};

export default CreateNftForm;
