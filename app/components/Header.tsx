import { Brain, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className='bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-elite-500 rounded-lg'>
              <Brain className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-primary-600 to-elite-600 bg-clip-text text-transparent'>
                Elite Prompt Optimizer
              </h1>
              <p className='text-sm text-gray-600'>
                Transform vague prompts into elite, intentional prompts
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-2 text-sm text-gray-500'>
            <Sparkles className='w-4 h-4' />
            <span>Powered by AI & MCP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
