'use client';

import { ArrowRight, TrendingUp, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ComparisonViewProps {
  originalPrompt: string;
  elitePrompt: string;
  explanation: string;
}

export default function ComparisonView({
  originalPrompt,
  elitePrompt,
  explanation,
}: ComparisonViewProps) {
  const [copied, setCopied] = useState(false);

  const copyToChatGPT = async () => {
    if (elitePrompt) {
      try {
        await navigator.clipboard.writeText(elitePrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        // Open ChatGPT in a new tab
        window.open('https://chat.openai.com/', '_blank');
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };
  return (
    <div className='card'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2 flex items-center'>
          <TrendingUp className='w-6 h-6 text-green-500 mr-2' />
          Before vs After
        </h2>
        <p className='text-gray-600'>See how your prompt was transformed</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Before */}
        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-red-400 rounded-full'></div>
            <h3 className='text-lg font-semibold text-gray-900'>
              Original Prompt
            </h3>
          </div>

          <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-gray-700 italic'>"{originalPrompt}"</p>
          </div>

          <div className='text-sm text-gray-600'>
            <p className='font-medium mb-1'>Issues identified:</p>
            <ul className='space-y-1 text-gray-500'>
              <li>• Vague and unspecific</li>
              <li>• Missing clear intent</li>
              <li>• No target audience defined</li>
              <li>• Unclear desired outcome</li>
            </ul>
          </div>
        </div>

        {/* Arrow */}
        <div className='hidden lg:flex items-center justify-center'>
          <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-400 to-green-400 rounded-full'>
            <ArrowRight className='w-6 h-6 text-white' />
          </div>
        </div>

        {/* After */}
        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-green-400 rounded-full'></div>
            <h3 className='text-lg font-semibold text-gray-900'>
              Elite Prompt
            </h3>
          </div>

          <div className='p-4 bg-green-50 border border-green-200 rounded-lg relative'>
            <p className='text-gray-700 font-medium pr-12'>"{elitePrompt}"</p>
            <button
              onClick={copyToChatGPT}
              className='absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm'
              title='Copy to ChatGPT'
            >
              {copied ? (
                <Check className='w-4 h-4 text-green-500' />
              ) : (
                <Copy className='w-4 h-4' />
              )}
            </button>
          </div>

          <div className='text-sm text-gray-600'>
            <p className='font-medium mb-1'>Improvements made:</p>
            <ul className='space-y-1 text-gray-500'>
              <li>• Clear and specific intent</li>
              <li>• Defined target audience</li>
              <li>• Specified tone and style</li>
              <li>• Actionable and purposeful</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h4 className='font-semibold text-blue-900 mb-3'>
            Transformation Details:
          </h4>
          <div className='text-blue-800 text-sm leading-relaxed list-none'>
            {explanation.split('. ').map(
              (sentence, index) =>
                sentence.trim() && (
                  <div key={index} className='flex items-start mb-2'>
                    <span className='text-blue-600 mr-2 mt-1'>•</span>
                    <span>{sentence.trim()}</span>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
