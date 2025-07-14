import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { CreateEditCategoryButton } from '@/components/modal/create-edit-category/button';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { CategoryCards } from '../_components/category-cards';
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

        <CreateEditCategoryButton />
      </Header>

      <Separator />

      <div className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-3">
        <CategoryCards />
      </div>
    </Container>
  );
}
