import { Field } from "formik";
import { TextField } from "formik-mui";
import React from "react";

import { PriceFormProps } from "components/price-forms/props";

export const FixedPriceForm: React.FC<PriceFormProps> = () => {
  return (
    <Field
      component={TextField}
      type="number"
      name="price.fixed.price"
      label="Price"
    />
  );
};
