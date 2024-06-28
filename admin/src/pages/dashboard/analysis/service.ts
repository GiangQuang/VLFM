import { request } from '@umijs/max';
import type { AnalysisData } from './data';

export async function ChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/statistic');
}
