import type { InsertTransactionsType } from '@/validators/db/transactions';

export interface CSVRow {
  [key: string]: string | undefined;
}

export interface CSVColumn {
  id: string;
  name: string;
  sample: string;
}

export interface CSVResult {
  columns: CSVColumn[];
  preview: CSVRow[];
  data: CSVRow[];
}

export type Transaction = Omit<
  InsertTransactionsType,
  'datetime' | 'amount'
> & {
  datetime?: Date | undefined;
  amount?: number | undefined;
};

export type Field = keyof Transaction | 'skip';
