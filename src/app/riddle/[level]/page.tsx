import RiddleDisplay from '@/components/features/RiddleDisplay';

interface RiddlePageProps {
  params: Promise<{
    level: string;
  }>;
}

export default async function RiddlePage({ params }: RiddlePageProps) {
  const { level: levelParam } = await params;
  const level = parseInt(levelParam, 10);

  return <RiddleDisplay level={level} />;
}
