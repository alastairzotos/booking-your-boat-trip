import { ServiceSchemaDto, ServiceType } from 'dtos';

export const BoatSchema: ServiceSchemaDto = {
  fields: [
    { 
      field: 'duration',
      type: 'timeframe',
      label: 'Duration',
    },
    {
      field: 'startLocation',
      type: 'string',
      label: 'Starting location',
    },
    {
      field: 'startTime',
      type: 'time',
      label: 'Start time',
    },
    {
      field: 'photos',
      type: 'photos',
      label: 'Photos'
    },
  ]
}

export const SunbedSchema: ServiceSchemaDto = {
  fields: [
    {
      field: 'location',
      type: 'string',
      label: 'Location',
    },
    {
      field: 'startTime',
      type: 'time',
      label: 'Start time',
    },
    {
      field: 'photos',
      type: 'photos',
      label: 'Photos'
    },
  ]
}

export const getSchemaForServiceType = (serviceType: ServiceType): ServiceSchemaDto | null => ({
  'none': null,
  'boat': BoatSchema,
  'sunbed': SunbedSchema,
} as Record<ServiceType, ServiceSchemaDto | null>)[serviceType]
