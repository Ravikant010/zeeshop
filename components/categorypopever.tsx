import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { category } from "@/lib/category";
import Link from "next/link";
type Props = { text: string }
export default async function CategoryPopover({ text }: Props) {
    return (
        <HoverCard >
            <HoverCardTrigger className="ml-4">{text}</HoverCardTrigger>
            <HoverCardContent className="w-[50vw]  h-full z-40 relative">
                <div className="grid grid-cols-10 text-wrap list-none text-sm gap-x-4  gap-y-8 place-content-center items-start font-normal ">
                {
                    category && category.map(e => <Link className="hover:border-b-[1px] border-red-500"  href={`/category/${e}`} key={e}>{e}</Link>)
                }
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}