import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ServiceDto } from "dtos";
import Link from "next/link";
import React from "react";

import { useOperatorDashboard } from "contexts/operator-dashboard";
import { shortenText } from "util/misc";

interface Props {
  operatorId: string;
  service: ServiceDto;
}

export const ServiceListItem: React.FC<Props> = ({ operatorId, service }) => {
  const { getServiceEditUrl } = useOperatorDashboard();

  return (
    <ListItem
      sx={{ backgroundColor: service.hidden ? "lightgray" : "none" }}
      alignItems="flex-start"
      component={Link}
      href={getServiceEditUrl(operatorId, service._id)}
    >
      <ListItemAvatar>
        {service.photos && service.photos.length > 0 ? (
          <Avatar alt={service.name} src={service.photos[0]} />
        ) : (
          <Avatar sx={{ bgcolor: blue[500] }}>
            <BeachAccessIcon />
          </Avatar>
        )}
      </ListItemAvatar>

      <ListItemText
        primary={
          <>
            <strong>[{service.serviceSchema.name}]</strong> {service.name}
            {service.hidden && (
              <Typography sx={{ ml: 2 }} variant="overline">
                (Hidden from users)
              </Typography>
            )}
          </>
        }
        secondary={<>{shortenText(service.description, 150)}</>}
      />
    </ListItem>
  );
};