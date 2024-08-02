import { redirect } from "next/navigation";
import { ELang } from "@/models/Settings";

export default function RootPage() {
    redirect(`/${ELang.UK}`);
}
