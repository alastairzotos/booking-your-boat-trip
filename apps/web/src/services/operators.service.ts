import { OperatorDto, OperatorNoId, TripDto } from "dtos";

import { HttpService } from "src/services/http.service";

export class OperatorsService extends HttpService {
  async getOperators(): Promise<OperatorDto[]> {
    const { data } = await this.httpClient.get<OperatorDto[]>("/operators");

    return data;
  }

  async getOperator(id: string): Promise<OperatorDto> {
    const { data } = await this.httpClient.get<OperatorDto>(`/operators/${id}`);

    return data;
  }

  async getOperatorWithTripsById(
    id: string
  ): Promise<{ operator: OperatorDto; trips: TripDto[] }> {
    const { data } = await this.httpClient.get<{
      operator: OperatorDto;
      trips: TripDto[];
    }>(`/operators/with-trips/${id}`);

    return data;
  }

  async createOperator(operator: OperatorNoId): Promise<string> {
    const { data } = await this.httpClient.post<
      any,
      { data: string },
      OperatorNoId
    >("/operators", operator);

    return data;
  }

  async updateOperator(
    id: string,
    newOperator: Partial<OperatorDto>
  ): Promise<void> {
    await this.httpClient.patch<
      any,
      unknown,
      { id: string; newOperator: Partial<OperatorDto> }
    >("/operators", { id, newOperator });
  }

  async deleteOperator(id: string): Promise<void> {
    await this.httpClient.delete<any, unknown, { id: string }>("/operators", {
      data: { id },
    });
  }
}
