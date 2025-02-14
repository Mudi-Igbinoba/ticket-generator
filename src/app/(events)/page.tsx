'use client';
import { useEffect, useState } from 'react';
import StageOne from '@/components/ui/StageOne';
import StageTwo from '@/components/ui/StageTwo';
import StageThree from '@/components/ui/StageThree';
import Loader from '@/components/ui/loader';

export default function EventsPage() {
  const [stage, setStage] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStage = localStorage.getItem('currentStage');
      if (savedStage) {
        setStage(Number(savedStage));
      } else {
        setStage(1);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && stage !== null) {
      localStorage.setItem('currentStage', stage.toString());
    }

    const timer = setTimeout(() => {
      setProgress(((stage ?? 1) / 3) * 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [stage]);

  if (stage === null) {
    return <Loader />;
  }

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
