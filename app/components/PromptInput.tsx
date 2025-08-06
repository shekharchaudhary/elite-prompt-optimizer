'use client';

import { useState, useEffect } from 'react';
import { Send, Target, Users, Palette } from 'lucide-react';

interface PromptInputProps {
  onOptimize: (data: {
    prompt: string;
    audience?: string;
    goal?: string;
    tone?: string;
  }) => void;
  isLoading: boolean;
  shouldClear?: boolean;
  onClear?: () => void;
}

export default function PromptInput({
  onOptimize,
  isLoading,
  shouldClear = false,
  onClear,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [audience, setAudience] = useState('');
  const [goal, setGoal] = useState('');
  const [tone, setTone] = useState('');

  // Clear input fields when shouldClear is true
  useEffect(() => {
    if (shouldClear) {
      setPrompt('');
      setAudience('');
      setGoal('');
      setTone('');
      onClear?.(); // Reset the shouldClear flag
    }
  }, [shouldClear, onClear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    onOptimize({
      prompt: prompt.trim(),
      audience: audience.trim() || undefined,
      goal: goal.trim() || undefined,
      tone: tone.trim() || undefined,
    });
  };

  return (
    <div className='card'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          Enter Your Prompt
        </h2>
        <p className='text-gray-600'>
          Transform your vague prompt into an elite, intentional prompt
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Main Prompt Input */}
        <div>
          <label
            htmlFor='prompt'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Your Prompt
          </label>
          <textarea
            id='prompt'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Enter your vague or low-quality prompt here...'
            className='input-field h-32'
            required
          />
        </div>

        {/* Optional Tags */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Audience */}
          <div>
            <label
              htmlFor='audience'
              className='flex items-center text-sm font-medium text-gray-700 mb-2'
            >
              <Users className='w-4 h-4 mr-2' />
              Audience
            </label>
            <input
              id='audience'
              type='text'
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder='e.g., Gen Z, entrepreneurs'
              className='input-field h-10'
            />
          </div>

          {/* Goal */}
          <div>
            <label
              htmlFor='goal'
              className='flex items-center text-sm font-medium text-gray-700 mb-2'
            >
              <Target className='w-4 h-4 mr-2' />
              Goal
            </label>
            <input
              id='goal'
              type='text'
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder='e.g., Instagram caption'
              className='input-field h-10'
            />
          </div>

          {/* Tone */}
          <div>
            <label
              htmlFor='tone'
              className='flex items-center text-sm font-medium text-gray-700 mb-2'
            >
              <Palette className='w-4 h-4 mr-2' />
              Tone
            </label>
            <input
              id='tone'
              type='text'
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder='e.g., professional, casual'
              className='input-field h-10'
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading || !prompt.trim()}
          className='btn-elite w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? (
            <>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
              <span>Optimizing...</span>
            </>
          ) : (
            <>
              <Send className='w-5 h-5' />
              <span>Make it Elite</span>
            </>
          )}
        </button>
      </form>

      {/* Example Prompts */}
      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h3 className='text-sm font-medium text-gray-700 mb-2'>
          Example Prompts:
        </h3>
        <div className='space-y-1 text-xs text-gray-600'>
          <p>• "make this sound better"</p>
          <p>• "caption for my gym photo"</p>
          <p>• "write something about AI"</p>
        </div>
      </div>
    </div>
  );
}
