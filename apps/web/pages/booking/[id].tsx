import { Box } from "@mui/material";
import { BookingDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";

import { getBookingWithOperatorAndService } from "src/clients/bookings.client";
import { SeoHead } from "src/components/seo/head";
import { UserBookingView } from "src/components/user-booking-view";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserServiceView } from "src/components/user-service-view";

interface Props {
  booking: BookingDto;
}

const BookingPage: NextPage<Props> = ({ booking }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle="Your Booking"
        description={`Your booking for ${booking.service.name} by ${booking.operator.name}`}
      />

      <UserBookingView booking={booking} />

      <Box sx={{ mt: 3 }}>
        <UserServiceView
          bookingView
          operator={booking.operator}
          service={booking.service}
        />
      </Box>
    </UserLayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const id = params?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    return {
      props: {
        booking: await getBookingWithOperatorAndService(id),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default BookingPage;
