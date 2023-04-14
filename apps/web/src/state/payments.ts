import { createQuery } from "@bitmetro/create-query";

import {
  createPaymentIntent,
  createSetupIntent,
  getOrCreateCustomer,
} from "src/clients/payments.client";

export const useCreatePaymentIntent = createQuery(createPaymentIntent);
export const useGetOrCreateCustomer = createQuery(getOrCreateCustomer);
export const useCreateSetupIntent = createQuery(createSetupIntent);
