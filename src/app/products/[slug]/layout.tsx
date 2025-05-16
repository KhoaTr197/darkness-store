export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug} - Darkness Store`,
    description: `Buy ${params.slug} from Darkness Store - The best PC components shop`,
  };
} 