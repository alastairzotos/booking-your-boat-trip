import { ServiceSchemaDto, ServiceType } from 'dtos';

export const NoneSchema: ServiceSchemaDto = {
  _id: '',
  label: 'None',
  pluralLabel: 'None',
  description: 'None',
  pricingStrategy: 'fixed',
  shouldPayNow: true,
  defaultBookingFields: ['date'],
  fields: []
}

export const BoatTripSchema: ServiceSchemaDto = {
  _id: '',
  label: 'Boat trip',
  pluralLabel: 'Boat trips',
  description: 'Take a guided trip on a boat around the island',
  pricingStrategy: 'perAdultAndChild',
  shouldPayNow: true,
  defaultBookingFields: ['date'],
  fields: [
    { 
      field: 'duration',
      type: 'timeframe',
      label: 'Duration',
    },
    {
      field: 'startLocation',
      type: 'string',
      label: 'Pickup point',
    },
    {
      field: 'startTime',
      type: 'time',
      label: 'Start time',
    },
  ]
}

export const BoatRentalSchema: ServiceSchemaDto = {
  _id: '',
  label: 'Boat rental',
  pluralLabel: 'Boat rentals',
  description: 'Rent boats at cheap prices to explore the seas at your leisure',
  pricingStrategy: 'fixed',
  shouldPayNow: true,
  defaultBookingFields: ['date'],
  fields: [
    { 
      field: 'duration',
      type: 'timeframe',
      label: 'Duration',
    },
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
  ]
}

export const SunbedSchema: ServiceSchemaDto = {
  _id: '',
  label: 'Sun bed',
  pluralLabel: 'Sun beds',
  description: 'Reserve a sun bed and breathe easy knowing you\'ll have one waiting for you',
  pricingStrategy: 'fixed',
  shouldPayNow: true,
  defaultBookingFields: ['date'],
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
  ],
}

export const WatersportsSchema: ServiceSchemaDto = {
  _id: '',
  label: 'Watersports',
  pluralLabel: 'Watersports',
  description: 'Enjoy an exciting day with some waterskiing, tube riding, paragliding, and more!',
  pricingStrategy: 'tiered',
  shouldPayNow: true,
  defaultBookingFields: ['date'],
  fields: [
    {
      field: 'location',
      type: 'string',
      label: 'Location',
    }
  ]
}

export const RestaurantSchema: ServiceSchemaDto = {
  _id: '',
  label: 'Restaurant',
  pluralLabel: 'Restaurants',
  description: 'Discover the taste of the area with our selection of restaurants',
  pricingStrategy: 'onPremises',
  shouldPayNow: false,
  defaultBookingFields: ['date', 'time', 'numberOfPeople'],
  fields: []
}

export const getSchemaForServiceType = (serviceType: ServiceType): ServiceSchemaDto => ({
  'none': NoneSchema,
  'boat-trip': BoatTripSchema,
  'boat-rental': BoatRentalSchema,
  'sunbed': SunbedSchema,
  'watersports': WatersportsSchema,
  'restaurant': RestaurantSchema,
} as Record<ServiceType, ServiceSchemaDto>)[serviceType]
