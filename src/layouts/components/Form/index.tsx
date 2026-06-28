import React, { useActionState, useEffect, useState } from "react";

import { actions } from "astro:actions";
import { withState } from "@astrojs/react/actions";
import { RichTextComp } from "@/components/Richtext";
import { fields } from "./fields.js";
import { preview } from "astro";

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

  useEffect(() => {
    console.log("formData in useeffect:", formData);
  }, [formData]);

  function handleChange(
    e: React.ChangeEvent<
      | HTMLInputElement
      | (HTMLTextAreaElement & { checked?: boolean })
      | (HTMLSelectElement & { checked?: boolean })
    >,
    elName: string,
  ) {
    console.log('here.......');
    if (e.target) {
      const { id, name, value } = e.target;
      const field = formFromProps.fields.find((f: any) => f.name === name);
      console.log("handleChange input: ", name, value);
      if (field && field.blockType === "checkbox") {
        setFormData((prev: any) => [...prev]);
      } else {
        console.log("formData is!!!!", id, name, value);

        // const newData = formData.findIndex((f: any) => f.id == field.id)
        
        // console.log(newData);

        
        

        // setFormData((prev: any) => [...prev, formData[newData] = {...field, value: value}]);
      }
    } else if (typeof e === "string") {
      const value = e;
      console.log("handleChange of select: ", elName, value);
      // setFormData((prev: any) => ({ ...prev, [name]: value }));
    } else {
      console.log("handleChange e is:::::", e);
      // setFormData((prev: any) => ({ ...prev, [name]: e }));
    }
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
                                  onChange={(e: any) => {
                                    e.preventDefault();
                                    handleChange(e, field.name);
                                  }}
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
                              onChange={(e: any) => {
                                e.preventDefault();
                                handleChange(e, field.name);
                              }}
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
