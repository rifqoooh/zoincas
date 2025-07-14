'use client';

import type { CategoriesDataType } from '@/validators/api/categories/response';

import { useTheme } from 'next-themes';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utilities';
import { CardActions } from './card-actions';

interface CategoryCardProps {
  category: CategoriesDataType;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { theme } = useTheme();

  return (
    <Card className="relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            theme === 'light'
              ? 'radial-gradient(circle 500px at 50% 200px, #f0f0f0, transparent)'
              : 'radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)',
        }}
      />
      <CardHeader className="z-10 flex flex-row items-start justify-between">
        <div className="grid gap-2">
          <CardTitle className="truncate text-lg tracking-wide">
            {category.name}
          </CardTitle>
          <CardDescription className="flex flex-wrap gap-1">
            <span>{formatCurrency(category.transactions.sum)}</span>
          </CardDescription>
        </div>
        <CardActions category={category} />
      </CardHeader>
      <CardFooter className="z-10">
        <p className="text-sm">{`${category.transactions.count} transactions`}</p>
      </CardFooter>
    </Card>
  );
}
