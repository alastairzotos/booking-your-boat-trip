import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ServiceSchemaCategoryDto } from "dtos";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { useLoadServiceSchemaCategories } from "state/service-schema-categories";

interface Props {
  value: ServiceSchemaCategoryDto | null;
  onChange: (category: ServiceSchemaCategoryDto) => void;
}

export const ServiceSchemaCategorySelector: React.FC<Props> = ({
  value,
  onChange,
}) => {
  const [loadSchemaCategoriesStatus, loadSchemaCategories, schemaCategories] =
    useLoadServiceSchemaCategories((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    loadSchemaCategories();
  }, []);

  return (
    <StatusSwitch
      status={loadSchemaCategoriesStatus}
      error={
        <Typography>
          There was an error loading the service schema categories
        </Typography>
      }
    >
      <FormControl>
        <InputLabel id="schema-category-label">Schema category</InputLabel>
        <Select
          labelId="schema-category-label"
          label="Schema category"
          value={value?._id}
          onChange={(e) =>
            onChange(
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              schemaCategories?.find(
                (category) => category._id === (e.target.value as string)
              )!
            )
          }
        >
          {schemaCategories?.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              <img
                src={category.photo}
                alt=""
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StatusSwitch>
  );
};