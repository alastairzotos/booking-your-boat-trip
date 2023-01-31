import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingDto, BookingStatus, UserDetails } from 'dtos';

import { AuthGuard } from 'src/auth/auth.guard';
import { Principal } from 'src/auth/principal.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { BookingsService } from 'src/features/bookings/bookings.service';

@Controller('bookings')
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('all')
  async createBooking(@Body() booking: BookingDto) {
    return await this.bookingsService.createBooking(booking);
  }

  @Get('for-user')
  @Roles('admin', 'operator')
  async getBookingsForUser(@Principal() user: UserDetails) {
    return await this.bookingsService.getBookingsForUser(user);
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string) {
    return await this.bookingsService.getBookingById(id);
  }

  @Get('with-details/:id')
  @Roles('all')
  async getBookingWithOperatorAndTrip(@Param('id') id: string) {
    return await this.bookingsService.getBookingWithOperatorAndTrip(id);
  }

  @Patch()
  async setBookingStatus(
    @Body() { id, status }: { id: string; status: BookingStatus },
  ) {
    await this.bookingsService.setBookingStatus(id, status);
  }
}
