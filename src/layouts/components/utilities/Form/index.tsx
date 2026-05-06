import React, { useState, useCallback } from "react";
import { buildInitialFormState } from "./buildInitialFormState.tsx";
import { fields } from "./fields.tsx";
import { RichTextComp } from "@/components/Richtext";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

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

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { status?: string; message: string } | undefined
  >();

  const onSubmit = useCallback(
    (data: Data) => {
      // let loadingTimerID: NodeJS.Timer;

      const submitForm = async () => {
        setError(undefined);

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        // delay loading indicator by 1s
        // loadingTimerID = setTimeout(() => {
        //   setIsLoading(true);
        // }, 1000);

        try {
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_CMS_URL}/api/form-submissions`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
              }),
            },
          );

          const res = await req.json();

          // clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);
            setError({
              status: res.status,
              message: res.errors?.[0]?.message || "Internal Server Error",
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: "Something went wrong.",
          });
        }
      };

      submitForm();
    },
    [formID, redirect, confirmationType],
  );

  return (
    <div>
      <div
        className={["flex flex-col", hasSubmitted && "items-center justify-center h-[80vh]"]
          .filter(Boolean)
          .join(" ")}
      >
        {enableIntro && introContent && !hasSubmitted && (
          <RichTextComp data={introContent} />
        )}
        {!isLoading && hasSubmitted && confirmationType === "message" && (
          <RichTextComp
            data={confirmationMessage}
          />
        )}
        {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
        {error && (
          <div>{`${error.status || "500"}: ${error.message || ""}`}</div>
        )}
        {!hasSubmitted && (
          <form id={formID} onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-2 flex flex-wrap w-full">
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields.map((field: any, index: number) => {
                  const Field: any = (fields as any)[field.blockType]; // FIXME type checking
                  if (Field) {
                    return (
                      <React.Fragment key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          register={register}
                          errors={errors}
                          control={control}
                        />
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
            </div>
            <Button
              // label={submitButtonLabel}
              // appearance="primary"
              // el="button"
              form={formID}
            >{submitButtonLabel || "Submit"}</Button>
          </form>
        )}
      </div>
    </div>
  );
};
