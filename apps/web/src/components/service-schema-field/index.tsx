import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { ServiceSchemaFieldDto, ServiceSchemaFieldType } from "dtos";
import React, { useId } from "react";

interface Props {
  field: ServiceSchemaFieldDto;
  onChange: (field: ServiceSchemaFieldDto) => void;
  onDelete: () => void;
}

export const ServiceSchemaField: React.FC<Props> = ({
  field,
  onChange,
  onDelete,
}) => {
  const labelId = useId();

  return (
    <Box sx={{ display: "flex", pt: 2, pb: 2 }} gap={1}>
      <TextField
        sx={{ width: 350 }}
        size="small"
        label="Field"
        value={field.field}
        onChange={(e) => onChange({ ...field, field: e.target.value })}
      />

      <TextField
        sx={{ width: 350 }}
        size="small"
        label="Label"
        value={field.label}
        onChange={(e) => onChange({ ...field, label: e.target.value })}
      />

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id={labelId}>Field type</InputLabel>
        <Select
          size="small"
          labelId={labelId}
          label="Field type"
          value={field.type}
          onChange={(e) =>
            onChange({
              ...field,
              type: e.target.value as ServiceSchemaFieldType,
            })
          }
        >
          <MenuItem value="string">String</MenuItem>
          <MenuItem value="time">Time</MenuItem>
          <MenuItem value="timeframe">Timeframe</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton onClick={onDelete}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};