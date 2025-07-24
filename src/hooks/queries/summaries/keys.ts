import type { GetSummariesQuery } from '@/validators/api/summaries/request';

export const summariesKeys = {
  all: () => ['summaries'],
  summaries: (search: GetSummariesQuery) => ['summaries', search],
};
