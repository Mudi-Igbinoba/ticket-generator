'use client';
import { useEffect, useState } from 'react';
import StageOne from '@/components/ui/StageOne';
import StageTwo from '@/components/ui/StageTwo';
import StageThree from '@/components/ui/StageThree';

export default function EventsPage() {
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const num = (stage / 3) * 100;
      setProgress(num);
    }, 500);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <>
      {stage === 1 && (
        <StageOne progress={progress} stage={stage} setStage={setStage} />
      )}
      {stage === 2 && (
        <StageTwo progress={progress} stage={stage} setStage={setStage} />
      )}
      {stage === 3 && (
        <StageThree progress={progress} stage={stage} setStage={setStage} />
      )}
    </>
  );
}
