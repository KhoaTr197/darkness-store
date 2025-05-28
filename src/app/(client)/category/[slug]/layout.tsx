export default function CategoryBrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export async function generateMetadata({ params }: { params:  Promise<{ slug: string }> }) {
  const { slug } = await params;

  return {
    title: `${slug} | Darkness Store`,
    description: `Buy ${slug} relevant products from Darkness Store - The best PC components shop`,
  };
} 