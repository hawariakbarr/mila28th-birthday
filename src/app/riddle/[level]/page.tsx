import RiddleDisplay from '@/components/features/RiddleDisplay';

interface RiddlePageProps {
  params: {
    level: string;
  };
}

export default function RiddlePage({ params }: RiddlePageProps) {
  const level = parseInt(params.level, 10);

  return <RiddleDisplay level={level} />;
}
