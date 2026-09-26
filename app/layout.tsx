import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ピアノ教室アプリ',
  description: '教材サブスク＆学習進捗管理システム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
