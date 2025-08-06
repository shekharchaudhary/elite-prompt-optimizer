'use client';

import { Brain, Search, Sparkles, Crown, ArrowRight } from 'lucide-react';

interface AgentLayersProps {
  isProcessing: boolean;
  currentStep?: 'analyzer' | 'expander' | 'rewriter';
}

export default function AgentLayers({
  isProcessing,
  currentStep,
}: AgentLayersProps) {
  // Determine if all agents are completed
  const isCompleted = !isProcessing && currentStep === 'rewriter';

  const agents = [
    {
      id: 'analyzer',
      name: 'Prompt Analyzer',
      description: 'Detects vagueness & identifies missing context',
      icon: Search,
      color: 'from-red-400 to-orange-400',
      status:
        currentStep === 'analyzer'
          ? 'active'
          : isCompleted ||
            currentStep === 'expander' ||
            currentStep === 'rewriter'
          ? 'completed'
          : 'pending',
    },
    {
      id: 'expander',
      name: 'Intent Expander',
      description: 'Suggests goal, tone & audience using MCP',
      icon: Brain,
      color: 'from-orange-400 to-yellow-400',
      status:
        currentStep === 'expander'
          ? 'active'
          : isCompleted || currentStep === 'rewriter'
          ? 'completed'
          : currentStep === 'analyzer'
          ? 'pending'
          : 'pending',
    },
    {
      id: 'rewriter',
      name: 'Prompt Rewriter',
      description: 'Transforms input into elite prompt',
      icon: Crown,
      color: 'from-yellow-400 to-green-400',
      status:
        currentStep === 'rewriter' && isProcessing
          ? 'active'
          : isCompleted || currentStep === 'rewriter'
          ? 'completed'
          : currentStep === 'analyzer' || currentStep === 'expander'
          ? 'pending'
          : 'pending',
    },
  ];

  return (
    <div className='card'>
      <div className='mb-6'>
        <h3 className='text-xl font-bold text-gray-900 mb-2 flex items-center'>
          <Sparkles className='w-5 h-5 text-purple-500 mr-2' />
          Agent Layers
        </h3>
        <p className='text-gray-600'>Watch the AI agents work their magic</p>

        {/* Status Legend */}
        <div className='flex items-center space-x-4 text-xs text-gray-500 mt-2'>
          <div className='flex items-center space-x-1'>
            <div className='w-3 h-3 bg-blue-500 rounded-full animate-pulse border border-blue-200'></div>
            <span>In Progress</span>
          </div>
          <div className='flex items-center space-x-1'>
            <div className='w-3 h-3 bg-green-500 rounded-full border border-green-200'></div>
            <span>Completed</span>
          </div>
          <div className='flex items-center space-x-1'>
            <div className='w-3 h-3 bg-red-400 rounded-full border border-red-200'></div>
            <span>Pending</span>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {agents.map((agent, index) => (
          <div key={agent.id} className='flex items-center space-x-4'>
            {/* Agent Icon */}
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${
                agent.color
              } ${agent.status === 'active' ? 'animate-pulse' : ''}`}
            >
              <agent.icon className='w-6 h-6 text-white' />
            </div>

            {/* Agent Info */}
            <div className='flex-1'>
              <h4 className='font-semibold text-gray-900'>{agent.name}</h4>
              <p className='text-sm text-gray-600'>{agent.description}</p>
            </div>

            {/* Status Indicator */}
            <div
              className='flex-shrink-0'
              title={`${agent.name}: ${
                agent.status === 'active'
                  ? 'In Progress'
                  : agent.status === 'completed'
                  ? 'Completed'
                  : 'Pending'
              }`}
            >
              {agent.status === 'active' && (
                <div className='w-4 h-4 bg-blue-500 rounded-full animate-pulse border-2 border-blue-200'></div>
              )}
              {agent.status === 'completed' && (
                <div className='w-4 h-4 bg-green-500 rounded-full border-2 border-green-200'></div>
              )}
              {agent.status === 'pending' && (
                <div className='w-4 h-4 bg-red-400 rounded-full border-2 border-red-200'></div>
              )}
            </div>

            {/* Arrow */}
            {index < agents.length - 1 && (
              <div className='flex-shrink-0'>
                <ArrowRight className='w-4 h-4 text-gray-400' />
              </div>
            )}
          </div>
        ))}
      </div>

      {isProcessing && (
        <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
            <span className='text-sm text-blue-700 font-medium'>
              {currentStep === 'analyzer' &&
                '🔍 Analyzing prompt structure and identifying missing elements...'}
              {currentStep === 'expander' &&
                '🧠 Expanding context and suggesting goal, tone, audience...'}
              {currentStep === 'rewriter' &&
                '✨ Rewriting into elite, actionable prompt...'}
              {!currentStep && '⚡ Processing...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
