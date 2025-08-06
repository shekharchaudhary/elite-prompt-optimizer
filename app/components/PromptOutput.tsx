'use client';

import { Copy, Check, Crown, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface PromptOutputProps {
  elitePrompt: string;
  explanation: string;
  isLoading: boolean;
}

export default function PromptOutput({
  elitePrompt,
  explanation,
  isLoading,
}: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (elitePrompt) {
      await navigator.clipboard.writeText(elitePrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className='card'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Elite Prompt
          </h2>
          <p className='text-gray-600'>
            Your optimized prompt will appear here
          </p>
        </div>

        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4 pb-4' />
            <p className='text-gray-600 pb-4'>
              Analyzing and optimizing your prompt...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!elitePrompt) {
    return (
      <div className='card'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Elite Prompt
          </h2>
          <p className='text-gray-600'>
            Your optimized prompt will appear here
          </p>
        </div>

        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <Crown className='w-12 h-12 text-gray-300 mx-auto mb-4' />
            <p className='text-gray-500'>
              Enter a prompt and click "Make it Elite" to see the magic happen
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Elite Prompt Output */}
      <div className='card'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2 flex items-center'>
            <Crown className='w-6 h-6 text-elite-500 mr-2' />
            Elite Prompt
          </h2>
          <p className='text-gray-600'>Your optimized, intentional prompt</p>
        </div>

        <div className='relative'>
          <textarea
            value={elitePrompt}
            readOnly
            className='input-field h-64 bg-gradient-to-br from-elite-50 to-primary-50 border-elite-200 pr-12 pb-4'
          />
          <button
            onClick={copyToClipboard}
            className='absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm'
            title='Copy to clipboard'
          >
            {copied ? (
              <Check className='w-5 h-5 text-green-500' />
            ) : (
              <Copy className='w-5 h-5' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
