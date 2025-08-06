'use client';

import { useState } from 'react';
import PromptInput from './components/PromptInput';
import PromptOutput from './components/PromptOutput';
import ComparisonView from './components/ComparisonView';
import AgentLayers from './components/AgentLayers';
import Header from './components/Header';

export default function Home() {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [elitePrompt, setElitePrompt] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    'analyzer' | 'expander' | 'rewriter'
  >();
  const [shouldClearInput, setShouldClearInput] = useState(false);

  const handlePromptOptimization = async (promptData: {
    prompt: string;
    audience?: string;
    goal?: string;
    tone?: string;
  }) => {
    setIsLoading(true);
    setOriginalPrompt(promptData.prompt);
    setCurrentStep('analyzer');

    try {
      // Simulate agent steps for visual feedback
      setTimeout(() => setCurrentStep('expander'), 1000);
      setTimeout(() => setCurrentStep('rewriter'), 2000);

      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promptData),
      });

      if (!response.ok) {
        throw new Error('Failed to optimize prompt');
      }

      const data = await response.json();
      setElitePrompt(data.optimizedPrompt);
      setExplanation(data.explanation);
      setShowComparison(true);
      setShouldClearInput(true); // Signal to clear input
    } catch (error) {
      console.error('Error optimizing prompt:', error);
      alert('Failed to optimize prompt. Please try again.');
    } finally {
      setIsLoading(false);
      // Keep the currentStep as 'rewriter' to show all agents as completed (green)
      // Only clear the input, don't reset the agent status
    }
  };

  return (
    <div className='min-h-screen gradient-bg'>
      <Header />

      <main className='container mx-auto px-4 py-8 max-w-6xl'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Input Section */}
          <div className='space-y-6'>
            <PromptInput
              onOptimize={handlePromptOptimization}
              isLoading={isLoading}
              shouldClear={shouldClearInput}
              onClear={() => setShouldClearInput(false)}
            />
          </div>

          {/* Agent Layers */}
          <div className='space-y-6'>
            <AgentLayers isProcessing={isLoading} currentStep={currentStep} />
          </div>

          {/* Output Section */}
          <div className='space-y-6'>
            <PromptOutput
              elitePrompt={elitePrompt}
              explanation={explanation}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Comparison View */}
        {showComparison && (
          <div className='mt-12'>
            <ComparisonView
              originalPrompt={originalPrompt}
              elitePrompt={elitePrompt}
              explanation={explanation}
            />
          </div>
        )}
      </main>
    </div>
  );
}
