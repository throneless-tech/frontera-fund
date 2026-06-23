import React, { useActionState, useEffect, useState } from "react";

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
    {
      data: { key: undefined, message: "" },
      error: { key: undefined, message: "" },
    },
  );

  const [formData, setFormData] = useState(formFromProps.fields);

  useEffect(() => {}, [formData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    console.log("handleChange", name, value);
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  }

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
                formFromProps.fields.map(
                  (field: any, index: number, array: any[]) => {
                    const Field: any = (fields as any)[field.blockType]; // type checking
                    if (Field) {
                      if (
                        index > 0 &&
                        array.some((el) => el.name === field.conditionalName)
                      ) {
                        if (
                          field.conditionalValue ===
                          formData[field.conditionalName]
                        ) {
                          return (
                            <React.Fragment key={`form-field-${index}`}>
                              <div className="mb-4">
                                <Field
                                  form={formFromProps}
                                  {...field}
                                  onChange={handleChange}
                                />
                              </div>
                            </React.Fragment>
                          );
                        } else {
                          return null;
                        }
                      }
                      return (
                        <React.Fragment key={`form-field-${index}`}>
                          <div className="mb-4">
                            <Field
                              form={formFromProps}
                              {...field}
                              onChange={handleChange}
                            />
                          </div>
                        </React.Fragment>
                      );
                    }
                    return null;
                  },
                )}
            </div>
            <button
              className="bg-accent rounded px-4 py-2 font-semibold text-white"
              disabled={isPending}
              type="submit"
            >
              {submitButtonLabel || "Submit"}
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
