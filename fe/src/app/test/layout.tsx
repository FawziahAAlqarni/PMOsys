import {Providers} from './providers';

export default function TestLayout({children}: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
