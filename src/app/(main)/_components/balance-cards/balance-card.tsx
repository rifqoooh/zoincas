import type { BalancesDataType } from '@/validators/api/balances/response';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utilities';
import { Illustration } from '../illustration';
import { CardActions } from './card-actions';

interface BalanceCardProps {
  balance: BalancesDataType;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <Card className="dark relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)',
        }}
      />
      <Illustration
        className="absolute right-0 bottom-0 translate-x-28"
        aria-hidden="true"
      />
      <CardHeader className="z-10 flex flex-row items-start justify-between">
        <div className="grid gap-2">
          <CardTitle className="truncate text-lg tracking-wide">
            {balance.name}
          </CardTitle>
          <CardDescription className="flex flex-wrap gap-1">
            <span>
              {formatCurrency(balance.initialAmount + balance.transactions.sum)}
            </span>
          </CardDescription>
        </div>
        <CardActions balance={balance} />
      </CardHeader>
      <CardFooter className="z-10">
        <p className="text-sm">{`${balance.transactions.count} transactions`}</p>
      </CardFooter>
    </Card>
  );
}
