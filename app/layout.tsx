import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elite Prompt Optimizer',
  description:
    'Transform vague prompts into elite, intentional prompts using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='gradient-bg min-h-screen'>{children}</body>
    </html>
  );
}
