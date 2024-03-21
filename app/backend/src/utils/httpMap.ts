type THttpMap = 'success' | 'created' | 'deleted' | 'badRequest' | 'unauthorized' | 'notFound';

export default (code:THttpMap): number => {
  const httpMap = {
    success: 200,
    created: 201,
    deleted: 204,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
  };
  return httpMap[code] ?? 500;
};
