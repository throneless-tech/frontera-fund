import React, { useActionState, useEffect, useState } from "react";

import { actions } from "astro:actions";
import { withState } from "@astrojs/react/actions";
import { RichTextComp } from "@/components/Richtext";
import { fields } from "./fields.js";

import { useForm, type SubmitHandler } from "react-hook-form";
import { id } from "zod/v4/locales";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Value | Property | Property[];
}

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: Boolean;
  form: any;
  introContent?: any;
};

export const FormBlock: React.FC<
  FormBlockType & {
    id?: string;
  }
> = (props) => {
  const {
    enableIntro,
    introContent,
    form: formFromProps,
    form: {
      id: formID,
      submitButtonLabel,
      confirmationType,
      redirect,
      confirmationMessage,
    } = {},
  } = props;

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<Inputs>();

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = formMethods;

  const formatData = (data: any) => {
    console.log("data is!!!!!!!!!!!!!! ", data);

    const formattedData = Object.keys(data).map((key) => {
      return {
        field: key,
        value: data[key]
      }
    });

    return formattedData;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formattedData = formatData(data);

    try {
      const req = await fetch(
        `${import.meta.env.PUBLIC_API_URL || "https://localhost:3000"}/api/form-submissions`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form: formFromProps.id,
            submissionData: formattedData,
          }),
        },
      );
      const res = await req.json();

      if (res.errors) {
        setError(res.errors[0]);
      } else {
        setError(undefined);
        setHasSubmitted(true);
      }

      return res;
    } catch (e: any) {
      setError(e);
    }
  };

  const allFields = watch();

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { status?: string; message: string } | undefined
  >();

  // const [state, action, isPending] = useActionState(
  //   // actions.submitForm expects more arguments; cast to any to satisfy overload
  //   withState(actions.submitForm) as any,
  //   {
  //     data: { key: undefined, message: "" },
  //     error: { key: undefined, message: "" },
  //   },
  // );

  const [formData, setFormData] = useState(formFromProps.fields);

  useEffect(() => {
    console.log(formFromProps);
  }, [allFields]);

  useEffect(() => {}, [isLoading, hasSubmitted, formData]);

  return (
    <div className="container py-8">
      <div
        className={[
          "flex flex-col",
          hasSubmitted && "h-[20vh] items-center justify-center",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {enableIntro && introContent && !hasSubmitted && (
          <RichTextComp data={introContent} />
        )}
        {!isLoading && hasSubmitted && confirmationType === "message" && (
          <RichTextComp data={confirmationMessage} />
        )}
        {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
        {error && (
          <div>{`${error.status || "500"}: ${error.message || ""}`}</div>
        )}
        {!hasSubmitted && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-2 w-full">
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields.map(
                  (field: any, index: number, array: any[]) => {
                    const Field: any = (fields as any)[field.blockType]; // type checking

                    if (Field) {
                      if (field.conditionalName) {
                        if (
                          field.conditionalValue &&
                          allFields[field.conditionalName] ==
                            field.conditionalValue
                        ) {
                          return (
                            <React.Fragment key={`form-field-${index}`}>
                              <div className="mb-4">
                                <Field
                                  form={formFromProps}
                                  {...field}
                                  {...formMethods}
                                  control={control}
                                  errors={errors}
                                  register={register}
                                />
                              </div>
                            </React.Fragment>
                          );
                        } else {
                          return null;
                        }
                      } else {
                        return (
                          <React.Fragment key={`form-field-${index}`}>
                            <div className="mb-4">
                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                              />
                            </div>
                          </React.Fragment>
                        );
                      }
                    }
                    return null;
                  },
                )}
            </div>
            <button
              className="bg-accent rounded px-4 py-2 font-semibold text-white"
              // disabled={isPending}
              type="submit"
            >
              {submitButtonLabel || "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
