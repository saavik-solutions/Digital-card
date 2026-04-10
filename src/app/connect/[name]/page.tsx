import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DigitalBusinessCardClient from '../DigitalBusinessCardClient';
import { cards } from '@/lib/company-locations';

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const nameParam = decodeURIComponent(name).toLowerCase();
  const card = cards[nameParam];

  if (!card) {
    return { title: 'Card Not Found' };
  }

  return {
    title: `${card.name} | ${card.company} Digital Card`,
    description: `Contact ${card.name}, ${card.title} at ${card.company}. Professional digital business card.`,
    openGraph: {
      title: `${card.name} | ${card.company}`,
      description: `${card.title} at ${card.company}`,
      images: [{ url: card.assets.profileImage }],
    },
  };
}

export default function Page({ params }: Props) {
  return <PageContent params={params} />;
}

async function PageContent({ params }: Props) {
  const { name } = await params;
  const nameParam = decodeURIComponent(name).toLowerCase();
  const card = cards[nameParam];

  if (!card) {
    notFound();
  }

  return <DigitalBusinessCardClient data={card} />;
}
