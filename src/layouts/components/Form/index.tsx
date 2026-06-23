import React, { useActionState, useState } from "react";

import { actions } from "astro:actions";
import { withState } from "@astrojs/react/actions";
import { RichTextComp } from "@/components/Richtext";
import { fields } from "./fields.js";

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

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { status?: string; message: string } | undefined
  >();

  const [state, action, isPending] = useActionState(
    // actions.submitForm expects more arguments; cast to any to satisfy overload
    withState(actions.submitForm) as any,
    { data: {key: undefined, message: ""}, error: { key: undefined, message: "" } },
  );

  return (
    <div className="container py-8">
      <div
        className={[
          "flex flex-col",
          hasSubmitted && "h-[80vh] items-center justify-center",
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
          // <FormProvider {...formMethods}>
          <form id={formID} action={action}>
            <div className="relative z-2 w-full">
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields.map((field: any, index: number) => {
                  const Field: any = (fields as any)[field.blockType]; // type checking
                  if (Field) {
                    return (
                      <React.Fragment key={`form-field-${index}`}>
                        <div className="mb-4">
                          <Field form={formFromProps} {...field} />
                        </div>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
            </div>
            <button disabled={isPending} type="submit">
              Sign up
            </button>
            {/* <Button
                    className="text-light"
                    // label={submitButtonLabel}
                    // appearance="primary"
                    // el="button"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   onSubmit();
                    // }}
                    form={formID}
                  >
                    {submitButtonLabel || "Submit"}
                  </Button> */}
          </form>
          // </FormProvider>
        )}
      </div>
    </div>
  );
};
