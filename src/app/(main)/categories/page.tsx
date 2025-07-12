import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { Header } from '../_components/header';
import { HeaderDescription } from '../_components/header/header-description';
import { HeaderTitle } from '../_components/header/header-title';

export const metadata: Metadata = createMetadata({
  title: 'Categories',
  description:
    'Zoincas is a personal financial management app powered with AI.',
});

export default function CategoriesPage() {
  return (
    <Container>
      <Header>
        <div>
          <HeaderTitle>Categories</HeaderTitle>
          <HeaderDescription>
            Managing your categories for tracking your transactions
          </HeaderDescription>
        </div>
      </Header>

      <Separator />

      <div className="grid gap-4 py-6">
        <div>Content</div>
      </div>
    </Container>
  );
}
