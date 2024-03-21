export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'badRequest' | 'unauthorized' | 'notFound';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

type ServiceResponseSuccessType = 'success' | 'created';

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSuccessType,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
