import { FetchStatus } from "@bitmetro/create-query";
import {
  FormControlLabel,
  Typography,
  Checkbox,
  Paper,
  FormLabel,
} from "@mui/material";
import { ServiceSchemaNoId } from "dtos";
import { Formik, Field } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { DefaultBookingFieldsSelector } from "src/components/default-booking-fields-selector";
import { FormBox } from "src/components/form-box";
import { PricingStrategyTypeSelector } from "src/components/pricing-strategy-type-selector";
import { SaveAndDelete } from "src/components/save-delete";
import { ServiceSchemaCategorySelector } from "src/components/service-schema-category-selector";
import { ServiceSchemaFieldsSelector } from "src/components/service-schema-fields-selector";

interface Props {
  title: string;

  serviceSchema: ServiceSchemaNoId;
  onSave: (serviceSchema: ServiceSchemaNoId) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

export const ManageServiceSchemaForm: React.FC<Props> = ({
  title,
  serviceSchema,
  onSave,
  saveStatus,
  onDelete,
  deleteStatus,
}) => {
  const router = useRouter();

  const handleDeleteServiceSchema =
    onDelete &&
    (async () => {
      if (!!onDelete) {
        await onDelete();
        router.push(urls.admin.serviceSchemas());
      }
    });

  return (
    <Formik initialValues={serviceSchema} onSubmit={onSave}>
      {({ isValid, values, setValues }) => (
        <FormBox title={title} maxWidth={600}>
          <Field component={TextField} name="name" label="Name" />

          <ServiceSchemaCategorySelector
            value={values.schemaCategory}
            onChange={(schemaCategory) =>
              setValues({ ...values, schemaCategory })
            }
          />

          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormLabel>Pricing</FormLabel>

            <PricingStrategyTypeSelector
              pricingStrategy={values.pricingStrategy}
              onChange={(pricingStrategy) =>
                setValues({ ...values, pricingStrategy })
              }
            />

            <FormControlLabel
              label="Should pay now"
              control={
                <Checkbox
                  checked={values.shouldPayNow}
                  onChange={(e) =>
                    setValues({ ...values, shouldPayNow: e.target.checked })
                  }
                />
              }
            />
          </Paper>

          <DefaultBookingFieldsSelector
            defaultBookingFields={values.defaultBookingFields}
            onChange={(defaultBookingFields) =>
              setValues({ ...values, defaultBookingFields })
            }
          />

          <ServiceSchemaFieldsSelector
            fields={values.fields}
            onChange={(fields) => setValues({ ...values, fields })}
          />

          <SaveAndDelete
            isValid={isValid}
            saveStatus={saveStatus}
            onDelete={handleDeleteServiceSchema}
            deleteStatus={deleteStatus}
            deleteModalTitle="Delete service schema?"
            deleteModalText="Are you sure you want to delete this service schema?"
          />

          {saveStatus === "error" && (
            <Typography>
              There was an error saving the service schema data
            </Typography>
          )}
        </FormBox>
      )}
    </Formik>
  );
};