import { BookingNoId, BookingPriceDetails, ServiceNoId, ServiceSchemaDto } from 'dtos';
import { getSchemaForServiceType } from 'service-schemas';

export type ExtractInterface<T> = Pick<T, keyof T>;

export const calculateBookingPrice = (bookingDetails: BookingPriceDetails, service: ServiceNoId) => {
  const schema = getSchemaForServiceType(service.type);

  switch (schema.pricingStrategy) {
    case 'onPremises': return -1;
    case 'fixed': return service.price.fixed?.price || 0;
    case 'perPerson': return (service.price.perPerson?.price || 0) * (bookingDetails.perPerson?.numberOfPeople || 0);
    case 'perAdultAndChild':
      return (
        (service.price.perAdultAndChild?.adultPrice || 0) * (bookingDetails.perAdultAndChild?.adultGuests! || 0) +
        (service.price.perAdultAndChild?.childPrice || 0) * (bookingDetails.perAdultAndChild?.childGuests! || 0)
      );
    case 'tiered':
      return service.price.tiered?.tiers.find(tier => tier.name === bookingDetails.tiered?.tier)?.rate || 0;
  }
}

export const createPriceString = (price: number) =>
  `€${price.toFixed(2)}`;

export const getReadablePricingStringsForService = (service: ServiceNoId): Record<string, string> => {
  const schema = getSchemaForServiceType(service.type);

  switch (schema.pricingStrategy) {
    case 'onPremises': return {};
    case 'fixed': return { Price: createPriceString(service.price.fixed?.price!) };
    case 'perPerson': return { "Price per person": createPriceString(service.price.perPerson?.price!) };
    case 'perAdultAndChild':
      return {
        "Price per adult": createPriceString(service.price.perAdultAndChild?.adultPrice!),
        "Price per child": createPriceString(service.price.perAdultAndChild?.childPrice!)
      }
    case 'tiered':
      return (service.price.tiered?.tiers || []).reduce((acc, { name, rate }) => ({
        ...acc,
        ["Price tier: " + name]: createPriceString(rate)
      }), {} as Record<string, string>);
  }
}

export const getReadableBookingDetails = (booking: BookingNoId): Record<string, string> => {
  const schema = getSchemaForServiceType(booking.service.type);

  let obj: Record<string, string> = {
    Name: booking.name,
    Email: booking.email,
  };

  switch (schema.pricingStrategy) {
    case 'onPremises': break
    case 'fixed': break;

    case 'perPerson':
      obj['Number of people'] = `${booking.priceDetails.perPerson?.numberOfPeople}`;
      break;

    case 'perAdultAndChild':
      obj['Number of adults'] = `${booking.priceDetails.perAdultAndChild?.adultGuests}`;
      obj['Number of children'] = `${booking.priceDetails.perAdultAndChild?.childGuests}`;
      break;

    case 'tiered':
      obj['Tier'] = booking.priceDetails.tiered?.tier || '';
      break;
  }

  if (schema.defaultBookingFields.includes('date')) {
    obj['Date'] = booking.date!;
  }

  if (schema.defaultBookingFields.includes('time')) {
    obj['Time'] = booking.time!;
  }

  if (schema.defaultBookingFields.includes('numberOfPeople')) {
    obj['Number of people'] = `${booking.numberOfPeople!}`;
  }

  if (schema.shouldPayNow) {
    obj['Price'] = createPriceString(calculateBookingPrice(booking.priceDetails, booking.service));
  }

  return obj;
}

export const calculateBookingTotalPeople = (booking: BookingNoId): number | undefined => {
  const schema = getSchemaForServiceType(booking.service.type);

  switch (schema.pricingStrategy) {
    case 'perPerson': return booking.priceDetails.perPerson?.numberOfPeople;
    case 'perAdultAndChild':
      return (booking.priceDetails.perAdultAndChild?.adultGuests || 0) + (booking.priceDetails.perAdultAndChild?.childGuests || 0);
    case 'fixed':
    case 'tiered':
      return undefined;
  }
}

export const bookingSatisfiesPeoplePolicy = (booking: BookingNoId, service: ServiceNoId): 'unknown' | 'too-many' | 'too-few' | 'okay' => {
  const totalPeople = calculateBookingTotalPeople(booking);

  if (totalPeople === undefined) {
    return 'unknown';
  }

  if (service.maxPeople !== null && totalPeople > service.maxPeople) {
    return 'too-many';
  }

  if (service.minPeople !== null && totalPeople < service.minPeople) {
    return 'too-few';
  }

  return 'okay';
}
