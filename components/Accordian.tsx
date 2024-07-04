import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
type Props = {
    triggerText:string
    contentText: string[]
}

export default function CAccordion({triggerText, contentText}: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>{triggerText}</AccordionTrigger>
      <AccordionContent>
        {contentText.map(e=><li>{e}</li>)}
      </AccordionContent>
    </AccordionItem>
    </Accordion>
  )
}