import { redirect } from 'next/navigation';
import { ELang } from '@/models/settings';

export default function RootPage() {
    redirect(`/${ELang.UK}`);
}
