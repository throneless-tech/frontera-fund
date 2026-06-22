"use client"

import { withState } from "@astrojs/react/actions";
import { actions } from "astro:actions";
import React, { useActionState } from "react";

// const {
//   register,
//   handleSubmit,
//   watch,
//   formState: { errors },
// } = useForm();

const Input = ({ defaultValue, ...props }) => {
  return <input {...props} />;
};

export const FormTest = ({ form }) => {

  console.log(form);
  
  const [state, action, isPending] = useActionState(withState(actions.submitForm), { data: form, error: undefined})

  return (
    <form  action="">
      <Input defaultValue="test" />
      <button disabled={isPending} formAction={action} type="submit" >Sign up</button>
    </form>
  );
};
