
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { getBrands } from "@/fetch/fetchAPIS";
import { Brands } from "@/lib/brands";
import Link from "next/link";
type Props = { text: string }
export default  function BrandsPopover({ text }: Props) {
        return (
            <HoverCard >
                <HoverCardTrigger className="ml-4">{text}</HoverCardTrigger>
                <HoverCardContent className="w-[50vw] min-h-96 h-full z-40 relative">
                    <div className="grid grid-cols-10 text-wrap list-none text-sm gap-2  gap-y-4 place-content-center items-start font-normal ">
                        {
                            Brands && Brands.map((e: string) => <Link className="hover:border-b-[1px] border-red-500" href={`/brand/${e.replace(/\s/g, "-")}`} key={e}>{e}</Link>)
                        }
                    </div>
                </HoverCardContent>
            </HoverCard>
        )
}