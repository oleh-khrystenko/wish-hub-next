import { redirect } from "next/navigation";
import { ELang } from "@/models/Lang";

export default function RootPage() {
    redirect(`/${ELang.UK}`);
}
