import { cn } from "@/lib/utils";

import Link from "next/link";
import React from "react";

// prettier-ignore
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      className={cn(" items-center justify-center", className)}
      href="/"
    >
      <svg viewBox="0 0 402.22 278.92">
  <g>
    <g>
      <path className="fill-[#523029]" d="M153.75,271.6v3.31c0,.44-.04.79-.13,1.05-.09.26-.25.5-.48.71-.23.21-.53.42-.89.61-1.05.57-2.05.98-3.02,1.24-.97.26-2.02.39-3.16.39-1.33,0-2.54-.21-3.63-.61-1.09-.41-2.02-1-2.8-1.78s-1.36-1.72-1.77-2.83c-.41-1.11-.62-2.35-.62-3.72s.2-2.58.6-3.69c.4-1.12.99-2.06,1.77-2.84s1.73-1.37,2.84-1.79,2.38-.62,3.8-.62c1.16,0,2.19.16,3.09.47s1.62.7,2.18,1.17c.56.47.98.97,1.26,1.5.28.53.42.99.42,1.4,0,.44-.16.82-.49,1.13-.33.31-.72.47-1.17.47-.25,0-.49-.06-.73-.18-.23-.12-.43-.28-.58-.5-.43-.68-.8-1.19-1.1-1.53s-.7-.64-1.21-.87c-.51-.24-1.15-.35-1.94-.35s-1.53.14-2.17.42c-.64.28-1.18.68-1.63,1.21-.45.53-.8,1.18-1.04,1.95s-.36,1.62-.36,2.56c0,2.03.47,3.59,1.4,4.68.93,1.09,2.23,1.64,3.9,1.64.81,0,1.57-.11,2.28-.32s1.43-.51,2.16-.91v-2.81h-2.71c-.65,0-1.15-.1-1.48-.29-.33-.2-.5-.53-.5-1,0-.38.14-.7.42-.96.28-.25.66-.38,1.14-.38h3.98c.49,0,.9.04,1.24.13.34.09.61.28.82.58.21.3.31.75.31,1.34Z"/>
      <path className="fill-[#523029]" d="M168.92,272.38c0,.96-.15,1.84-.45,2.65-.3.81-.73,1.51-1.3,2.09-.57.58-1.24,1.03-2.03,1.34s-1.67.47-2.65.47-1.85-.16-2.63-.47c-.78-.31-1.45-.76-2.02-1.35-.57-.59-1-1.28-1.3-2.08-.29-.8-.44-1.68-.44-2.65s.15-1.87.45-2.68c.3-.81.73-1.5,1.29-2.08.56-.57,1.23-1.02,2.03-1.33.79-.31,1.67-.47,2.63-.47s1.86.16,2.65.47c.79.31,1.47.76,2.04,1.34.57.58,1,1.27,1.29,2.08.29.8.44,1.69.44,2.65ZM165.69,272.38c0-1.31-.29-2.34-.87-3.07-.58-.73-1.35-1.1-2.33-1.1-.63,0-1.18.16-1.66.49s-.85.81-1.11,1.44c-.26.64-.39,1.38-.39,2.23s.13,1.58.38,2.21c.26.63.62,1.11,1.1,1.45.48.33,1.04.5,1.68.5.98,0,1.75-.37,2.33-1.1.58-.74.87-1.75.87-3.05Z"/>
      <path className="fill-[#523029]" d="M171.46,276.96v-13.96c0-.64.14-1.13.43-1.46.29-.33.67-.5,1.16-.5s.88.16,1.18.49c.3.33.45.82.45,1.47v13.96c0,.65-.15,1.14-.45,1.47s-.69.49-1.17.49-.85-.17-1.15-.51c-.29-.34-.44-.82-.44-1.45Z"/>
      <path className="fill-[#523029]" d="M186.83,277.08v-.32c-.43.5-.86.9-1.28,1.21-.42.31-.88.55-1.37.71-.49.16-1.03.24-1.61.24-.77,0-1.48-.16-2.14-.49-.66-.33-1.23-.79-1.7-1.4s-.84-1.32-1.09-2.14c-.25-.82-.37-1.7-.37-2.65,0-2.01.49-3.58,1.47-4.71.98-1.12,2.28-1.69,3.88-1.69.93,0,1.71.16,2.35.48.64.32,1.26.81,1.86,1.47v-4.75c0-.66.13-1.16.4-1.5.26-.34.64-.51,1.13-.51s.86.16,1.13.47c.26.31.4.77.4,1.37v14.2c0,.61-.14,1.07-.42,1.38-.28.31-.65.46-1.1.46s-.8-.16-1.09-.48c-.29-.32-.43-.77-.43-1.36ZM180.49,272.35c0,.87.14,1.62.41,2.23s.64,1.08,1.11,1.39c.47.31.99.47,1.54.47s1.08-.15,1.55-.44c.47-.29.84-.75,1.12-1.36.28-.61.42-1.37.42-2.28,0-.86-.14-1.59-.42-2.21-.28-.62-.66-1.09-1.13-1.42-.48-.33-1-.49-1.56-.49s-1.12.17-1.58.5-.82.81-1.08,1.44c-.26.62-.38,1.35-.38,2.18Z"/>
      <path className="fill-[#523029]" d="M214.1,273.17c0,.55-.14,1.15-.41,1.79-.27.64-.7,1.27-1.28,1.89-.58.62-1.33,1.12-2.23,1.5-.9.39-1.96.58-3.16.58-.91,0-1.74-.09-2.49-.26s-1.43-.44-2.03-.81-1.17-.85-1.68-1.45c-.46-.54-.85-1.15-1.17-1.82-.32-.67-.56-1.39-.73-2.15s-.24-1.57-.24-2.43c0-1.39.2-2.64.61-3.74.4-1.1.98-2.04,1.74-2.83s1.64-1.38,2.65-1.79c1.01-.41,2.1-.61,3.24-.61,1.4,0,2.65.28,3.74.84,1.09.56,1.93,1.25,2.51,2.07.58.82.87,1.6.87,2.33,0,.4-.14.75-.42,1.06-.28.31-.62.46-1.03.46-.45,0-.78-.11-1.01-.32-.22-.21-.47-.58-.75-1.1-.46-.86-.99-1.5-1.61-1.92-.62-.42-1.38-.64-2.28-.64-1.44,0-2.58.55-3.44,1.64-.85,1.09-1.28,2.65-1.28,4.66,0,1.34.19,2.46.57,3.36s.91,1.56,1.6,2,1.5.66,2.43.66c1.01,0,1.86-.25,2.55-.75.7-.5,1.22-1.23,1.57-2.2.15-.46.33-.83.55-1.11s.57-.43,1.06-.43c.42,0,.77.15,1.07.44s.45.65.45,1.08Z"/>
      <path className="fill-[#523029]" d="M229.08,272.38c0,.96-.15,1.84-.45,2.65-.3.81-.73,1.51-1.3,2.09-.57.58-1.24,1.03-2.03,1.34s-1.67.47-2.65.47-1.85-.16-2.63-.47c-.78-.31-1.45-.76-2.02-1.35-.57-.59-1-1.28-1.3-2.08-.29-.8-.44-1.68-.44-2.65s.15-1.87.45-2.68c.3-.81.73-1.5,1.29-2.08.56-.57,1.23-1.02,2.03-1.33.79-.31,1.67-.47,2.63-.47s1.86.16,2.65.47c.79.31,1.47.76,2.04,1.34.57.58,1,1.27,1.29,2.08.29.8.44,1.69.44,2.65ZM225.84,272.38c0-1.31-.29-2.34-.87-3.07-.58-.73-1.35-1.1-2.33-1.1-.63,0-1.18.16-1.66.49s-.85.81-1.11,1.44c-.26.64-.39,1.38-.39,2.23s.13,1.58.38,2.21c.26.63.62,1.11,1.1,1.45.48.33,1.04.5,1.68.5.98,0,1.75-.37,2.33-1.1.58-.74.87-1.75.87-3.05Z"/>
      <path className="fill-[#523029]" d="M239.75,277.11c-.78.61-1.53,1.06-2.26,1.36-.73.3-1.54.45-2.45.45-.83,0-1.55-.16-2.18-.49-.62-.33-1.11-.77-1.44-1.33-.34-.56-.51-1.16-.51-1.82,0-.88.28-1.63.84-2.25.56-.62,1.32-1.04,2.3-1.25.2-.05.71-.15,1.52-.32s1.5-.32,2.08-.45c.58-.14,1.2-.3,1.88-.5-.04-.85-.21-1.47-.51-1.87-.3-.4-.93-.6-1.88-.6-.82,0-1.43.11-1.85.34-.41.23-.77.57-1.06,1.03-.29.46-.5.76-.62.9s-.38.22-.78.22c-.36,0-.67-.12-.94-.35-.26-.23-.4-.53-.4-.89,0-.57.2-1.12.6-1.65.4-.54,1.03-.98,1.88-1.32s1.91-.52,3.17-.52c1.42,0,2.53.17,3.34.5.81.33,1.38.86,1.72,1.59.33.72.5,1.68.5,2.88,0,.75,0,1.4,0,1.92s0,1.11-.02,1.76c0,.61.1,1.24.3,1.89.2.66.3,1.08.3,1.27,0,.33-.16.63-.47.9s-.66.41-1.06.41c-.33,0-.66-.16-.98-.47-.32-.31-.66-.76-1.03-1.35ZM239.54,272.45c-.47.17-1.16.36-2.06.55s-1.52.33-1.87.42c-.35.09-.68.27-.99.53-.31.26-.47.63-.47,1.1s.19.9.55,1.25c.37.34.85.51,1.45.51.64,0,1.22-.14,1.76-.42.54-.28.93-.64,1.19-1.08.29-.49.44-1.29.44-2.41v-.46Z"/>
      <path className="fill-[#523029]" d="M256.33,274.71c0,.89-.22,1.65-.65,2.28-.43.63-1.07,1.11-1.92,1.44-.85.33-1.87.49-3.08.49s-2.15-.18-2.97-.53c-.83-.35-1.44-.8-1.83-1.33-.39-.53-.59-1.06-.59-1.6,0-.35.13-.66.38-.91.25-.25.57-.38.96-.38.34,0,.6.08.78.25.18.17.35.4.52.7.33.57.73,1,1.19,1.29.46.28,1.09.42,1.88.42.64,0,1.17-.14,1.59-.43.41-.29.62-.62.62-.98,0-.57-.21-.98-.64-1.24-.43-.26-1.13-.51-2.12-.74-1.11-.28-2.01-.56-2.71-.87s-1.25-.7-1.67-1.2-.62-1.1-.62-1.83c0-.64.19-1.25.58-1.83.38-.57.95-1.03,1.7-1.37s1.66-.51,2.72-.51c.83,0,1.58.09,2.25.26.66.17,1.22.41,1.66.7s.78.61,1.01.97c.23.35.35.7.35,1.04,0,.37-.12.67-.37.91-.25.24-.6.35-1.06.35-.33,0-.61-.09-.84-.28-.23-.19-.5-.47-.8-.85-.24-.31-.53-.57-.86-.75-.33-.19-.78-.28-1.34-.28s-1.07.12-1.45.37c-.39.25-.58.56-.58.93,0,.34.14.62.42.83.28.22.66.4,1.14.54.48.14,1.14.31,1.98.52,1,.24,1.81.54,2.45.87s1.11.74,1.44,1.2.49.98.49,1.57Z"/>
      <path className="fill-[#523029]" d="M259.23,266.11h.35v-1.93c0-.52.01-.93.04-1.22.03-.29.1-.55.23-.76.13-.22.31-.4.54-.54s.5-.21.79-.21c.41,0,.78.15,1.11.46.22.2.36.45.42.75s.09.71.09,1.26v2.19h1.18c.46,0,.8.11,1.04.32.24.22.36.49.36.83,0,.43-.17.74-.51.91-.34.17-.83.26-1.47.26h-.6v5.92c0,.5.02.89.05,1.16.04.27.13.49.28.66s.4.25.75.25c.19,0,.44-.03.77-.1.32-.07.57-.1.75-.1.26,0,.49.1.7.31.21.21.31.47.31.77,0,.52-.28.92-.85,1.19-.57.28-1.38.41-2.44.41-1.01,0-1.77-.17-2.29-.51-.52-.34-.86-.81-1.02-1.4-.16-.6-.24-1.4-.24-2.39v-6.18h-.42c-.46,0-.82-.11-1.06-.33-.24-.22-.37-.5-.37-.84s.13-.62.38-.83c.26-.22.63-.32,1.11-.32Z"/>
    </g>
    <path className="fill-[#da715d]" d="M169.52,127.42c-2.9,2.26-5.71,3.95-8.42,5.08-2.71,1.13-5.75,1.69-9.12,1.69-3.08,0-5.78-.61-8.11-1.82s-4.12-2.86-5.38-4.94c-1.26-2.08-1.89-4.34-1.89-6.77,0-3.28,1.04-6.08,3.12-8.39,2.08-2.31,4.94-3.87,8.57-4.66.76-.18,2.65-.57,5.67-1.19,3.02-.62,5.6-1.18,7.76-1.69,2.15-.51,4.49-1.14,7.01-1.87-.15-3.16-.78-5.49-1.91-6.97-1.13-1.48-3.46-2.22-7.01-2.22-3.05,0-5.34.42-6.88,1.27-1.54.85-2.86,2.12-3.96,3.82-1.1,1.7-1.87,2.82-2.33,3.36-.45.54-1.43.81-2.92.81-1.35,0-2.51-.43-3.49-1.3-.98-.86-1.47-1.97-1.47-3.32,0-2.11.75-4.16,2.24-6.15,1.49-1.99,3.82-3.63,6.99-4.92,3.16-1.29,7.1-1.93,11.82-1.93,5.27,0,9.42.62,12.44,1.87,3.02,1.25,5.15,3.22,6.39,5.91,1.24,2.7,1.87,6.27,1.87,10.72,0,2.81,0,5.2-.02,7.16-.01,1.96-.04,4.15-.07,6.55,0,2.26.37,4.61,1.12,7.05.75,2.45,1.12,4.02,1.12,4.72,0,1.23-.58,2.35-1.74,3.36-1.16,1.01-2.47,1.52-3.93,1.52-1.23,0-2.45-.58-3.65-1.74-1.2-1.16-2.48-2.83-3.82-5.03ZM168.73,110.06c-1.76.64-4.31,1.33-7.67,2.04-3.35.72-5.68,1.25-6.96,1.58-1.29.34-2.52,1-3.69,1.98-1.17.98-1.76,2.35-1.76,4.11s.69,3.36,2.07,4.64c1.38,1.27,3.18,1.91,5.4,1.91,2.37,0,4.56-.52,6.57-1.56,2.01-1.04,3.48-2.38,4.42-4.02,1.08-1.82,1.63-4.8,1.63-8.96v-1.71Z"/>
    <path className="fill-[#da715d]" d="M204.59,116.87v10.02c0,2.43-.57,4.26-1.71,5.47s-2.59,1.82-4.35,1.82-3.15-.62-4.26-1.85c-1.11-1.23-1.67-3.05-1.67-5.45v-33.4c0-5.39,1.95-8.09,5.84-8.09,1.99,0,3.43.63,4.31,1.89.88,1.26,1.36,3.12,1.45,5.58,1.44-2.46,2.91-4.32,4.42-5.58,1.51-1.26,3.52-1.89,6.04-1.89s4.97.63,7.34,1.89c2.37,1.26,3.56,2.93,3.56,5.01,0,1.47-.51,2.67-1.52,3.63-1.01.95-2.1,1.43-3.27,1.43-.44,0-1.5-.27-3.19-.81-1.68-.54-3.17-.81-4.46-.81-1.76,0-3.19.46-4.31,1.38-1.11.92-1.98,2.29-2.59,4.11-.62,1.82-1.04,3.98-1.27,6.48-.23,2.5-.35,5.56-.35,9.16Z"/>
    <path className="fill-[#da715d]" d="M242.99,92.04v1.45c2.11-2.78,4.42-4.83,6.92-6.13,2.5-1.3,5.38-1.96,8.63-1.96s5.99.69,8.48,2.07c2.49,1.38,4.35,3.33,5.58,5.84.79,1.47,1.3,3.05,1.54,4.75.23,1.7.35,3.87.35,6.5v22.32c0,2.4-.55,4.22-1.65,5.45s-2.53,1.85-4.28,1.85-3.24-.63-4.35-1.89c-1.11-1.26-1.67-3.06-1.67-5.4v-19.99c0-3.95-.55-6.98-1.65-9.07-1.1-2.09-3.29-3.14-6.57-3.14-2.14,0-4.09.64-5.84,1.91-1.76,1.27-3.05,3.03-3.87,5.25-.59,1.79-.88,5.13-.88,10.02v15.03c0,2.43-.56,4.26-1.69,5.47-1.13,1.22-2.59,1.82-4.37,1.82s-3.15-.63-4.26-1.89c-1.11-1.26-1.67-3.06-1.67-5.4v-34.67c0-2.29.5-3.99,1.49-5.12,1-1.13,2.36-1.69,4.09-1.69,1.05,0,2.01.25,2.86.75.85.5,1.53,1.25,2.04,2.24.51,1,.77,2.21.77,3.65Z"/>
    <path className="fill-[#da715d]" d="M209.1,217.42h-23.47c.03,2.72.58,5.13,1.65,7.21,1.07,2.08,2.49,3.65,4.26,4.7,1.77,1.05,3.73,1.58,5.87,1.58,1.44,0,2.75-.17,3.93-.51,1.19-.34,2.34-.86,3.45-1.58,1.11-.72,2.14-1.49,3.08-2.31.94-.82,2.15-1.93,3.65-3.34.62-.53,1.49-.79,2.64-.79,1.23,0,2.23.34,2.99,1.01.76.67,1.14,1.63,1.14,2.86,0,1.08-.42,2.35-1.27,3.8s-2.13,2.84-3.84,4.17c-1.71,1.33-3.87,2.44-6.46,3.32s-5.57,1.32-8.94,1.32c-7.71,0-13.7-2.2-17.97-6.59-4.28-4.39-6.42-10.36-6.42-17.88,0-3.54.53-6.83,1.58-9.87,1.05-3.03,2.59-5.63,4.61-7.8,2.02-2.17,4.51-3.83,7.47-4.99,2.96-1.16,6.24-1.74,9.84-1.74,4.69,0,8.71.99,12.06,2.97,3.35,1.98,5.87,4.53,7.54,7.67,1.67,3.14,2.5,6.33,2.5,9.58,0,3.02-.86,4.97-2.59,5.87-1.73.89-4.16,1.34-7.29,1.34ZM185.63,210.6h21.75c-.29-4.1-1.4-7.17-3.32-9.21-1.92-2.04-4.45-3.05-7.58-3.05s-5.44,1.03-7.36,3.1c-1.92,2.07-3.08,5.12-3.49,9.16Z"/>
    <path className="fill-[#da715d]" d="M229.75,191.14h1.32v-7.21c0-1.93.05-3.45.15-4.55.1-1.1.39-2.04.86-2.83.47-.82,1.14-1.49,2.02-2,.88-.51,1.86-.77,2.94-.77,1.52,0,2.9.57,4.13,1.71.82.76,1.34,1.69,1.56,2.79s.33,2.66.33,4.68v8.17h4.39c1.7,0,2.99.4,3.89,1.21.89.81,1.34,1.84,1.34,3.1,0,1.61-.64,2.74-1.91,3.38-1.27.64-3.1.97-5.47.97h-2.24v22.06c0,1.87.07,3.32.2,4.33s.48,1.83,1.05,2.46c.57.63,1.5.95,2.79.95.7,0,1.65-.12,2.86-.37,1.2-.25,2.14-.37,2.81-.37.97,0,1.84.39,2.61,1.16.78.78,1.16,1.74,1.16,2.88,0,1.93-1.06,3.41-3.16,4.44-2.11,1.03-5.14,1.54-9.1,1.54-3.75,0-6.59-.63-8.53-1.89-1.93-1.26-3.2-3-3.8-5.23-.6-2.23-.9-5.2-.9-8.92v-23.03h-1.58c-1.73,0-3.05-.41-3.95-1.23-.91-.82-1.36-1.86-1.36-3.12s.48-2.29,1.43-3.1c.95-.81,2.34-1.21,4.15-1.21Z"/>
    <path className="fill-[#da715d]" d="M291.27,232.09c-2.9,2.26-5.71,3.95-8.42,5.08-2.71,1.13-5.75,1.69-9.12,1.69-3.08,0-5.78-.61-8.11-1.82s-4.12-2.86-5.38-4.94c-1.26-2.08-1.89-4.34-1.89-6.77,0-3.28,1.04-6.08,3.12-8.39,2.08-2.31,4.94-3.87,8.57-4.66.76-.18,2.65-.57,5.67-1.19,3.02-.62,5.6-1.18,7.76-1.69,2.15-.51,4.49-1.14,7.01-1.87-.15-3.16-.78-5.49-1.91-6.97-1.13-1.48-3.46-2.22-7.01-2.22-3.05,0-5.34.42-6.88,1.27-1.54.85-2.86,2.12-3.95,3.82-1.1,1.7-1.88,2.82-2.33,3.36-.45.54-1.43.81-2.92.81-1.35,0-2.51-.43-3.49-1.3-.98-.86-1.47-1.97-1.47-3.32,0-2.11.75-4.16,2.24-6.15,1.49-1.99,3.82-3.63,6.99-4.92,3.16-1.29,7.1-1.93,11.82-1.93,5.27,0,9.42.62,12.44,1.87,3.02,1.25,5.15,3.22,6.39,5.91,1.24,2.7,1.87,6.27,1.87,10.72,0,2.81,0,5.2-.02,7.16-.01,1.96-.04,4.15-.07,6.55,0,2.26.37,4.61,1.12,7.05.75,2.45,1.12,4.02,1.12,4.72,0,1.23-.58,2.35-1.74,3.36-1.16,1.01-2.47,1.52-3.93,1.52-1.23,0-2.45-.58-3.65-1.74-1.2-1.16-2.48-2.83-3.82-5.03ZM290.48,214.74c-1.76.64-4.31,1.33-7.67,2.04-3.35.72-5.68,1.25-6.96,1.58-1.29.34-2.52,1-3.69,1.98-1.17.98-1.76,2.35-1.76,4.11s.69,3.36,2.07,4.64c1.38,1.27,3.18,1.91,5.41,1.91,2.37,0,4.56-.52,6.57-1.56,2.01-1.04,3.48-2.38,4.42-4.02,1.08-1.82,1.63-4.8,1.63-8.96v-1.71Z"/>
    <path className="fill-[#da715d]" d="M314.43,231.57v-52.03c0-2.4.53-4.22,1.6-5.45,1.07-1.23,2.51-1.85,4.33-1.85s3.28.61,4.39,1.82c1.11,1.22,1.67,3.04,1.67,5.47v52.03c0,2.43-.56,4.26-1.69,5.47-1.13,1.22-2.59,1.82-4.37,1.82s-3.19-.63-4.28-1.89c-1.1-1.26-1.65-3.06-1.65-5.4Z"/>
    <path className="fill-[#da715d]" d="M377.45,223.17c0,3.31-.81,6.15-2.42,8.5-1.61,2.36-3.99,4.15-7.14,5.36-3.15,1.22-6.98,1.82-11.49,1.82s-8-.66-11.07-1.98c-3.08-1.32-5.35-2.97-6.81-4.94-1.47-1.98-2.2-3.96-2.2-5.95,0-1.32.47-2.45,1.41-3.38s2.12-1.41,3.56-1.41c1.26,0,2.23.31,2.9.92.67.62,1.32,1.48,1.93,2.59,1.23,2.14,2.7,3.73,4.42,4.79s4.05,1.58,7.01,1.58c2.4,0,4.37-.53,5.91-1.6,1.54-1.07,2.31-2.29,2.31-3.67,0-2.11-.8-3.65-2.39-4.61-1.6-.97-4.23-1.89-7.89-2.77-4.13-1.03-7.49-2.1-10.09-3.23-2.59-1.13-4.67-2.61-6.22-4.46-1.55-1.85-2.33-4.12-2.33-6.81,0-2.4.72-4.67,2.15-6.81,1.44-2.14,3.55-3.84,6.35-5.12,2.8-1.27,6.17-1.91,10.13-1.91,3.11,0,5.9.32,8.37.97,2.48.64,4.54,1.51,6.2,2.59,1.66,1.08,2.92,2.29,3.78,3.6.86,1.32,1.3,2.61,1.3,3.87,0,1.38-.46,2.5-1.38,3.38-.92.88-2.23,1.32-3.93,1.32-1.23,0-2.28-.35-3.14-1.05-.86-.7-1.85-1.76-2.97-3.16-.91-1.17-1.98-2.11-3.21-2.81s-2.9-1.05-5.01-1.05-3.97.46-5.41,1.38c-1.44.92-2.15,2.07-2.15,3.45,0,1.26.53,2.29,1.58,3.1,1.06.81,2.48,1.47,4.26,2,1.79.53,4.25,1.17,7.38,1.93,3.72.91,6.76,1.99,9.12,3.25,2.36,1.26,4.14,2.75,5.36,4.46,1.21,1.71,1.82,3.67,1.82,5.87Z"/>
    <path className="fill-[#b0b1b1] stroke-[#231f20]" d="M44.44,73.26c-.66.48-1.32.96-1.97,1.44,5.51,12.19,11.33,24.3,17.38,36.17.58,1.12,1.32,2.09,2.47,2.65h.02s.06-.04.12-.06c.14-2.01-.58-3.77-1.44-5.53-5.65-11.51-11.15-23.08-16.58-34.67Z"/>
    <path className="fill-[#231f20]" d="M25.65,38.73l6.04,12.75c.18-1.54.08-3.05-.32-4.51-.94-3.55-3.51-6.26-5.73-8.24ZM27.57,79.44c-.32,1.64-.64,3.29-.96,4.93.72-.3,1.42-.62,2.09-.94.22-.1.46-.22.68-.34.28-1.6.56-3.19.82-4.81,0-.06.02-.2.02-.2-.88.5-1.76.94-2.65,1.36Z"/>
    <path className="fill-[#da715d]" d="M1.91,85.15c.82.9,1.92,1.62,3.35,2.21,6.68,2.73,14.86-.1,21.35-2.99.32-1.64.64-3.29.96-4.93-3.51,1.72-7.16,3.07-10.95,3.99-3.23.76-6.6,1.52-9.81.24-.9-.36-1.54-.76-1.94-1.22-.68-.74-1-1.92-.84-3.13.16-1.18.72-2.41,1.68-3.65,1.64-2.15,3.55-3.91,5.37-4.99,1.14-.66,2.33-1.22,3.61-1.82,1.18-.54,2.39-1.1,3.57-1.78,3.05-1.7,6.52-3.77,9.24-6.78,2.41-2.67,3.85-5.77,4.21-8.84l-6.04-12.75s-.14-.14-.22-.2c-3.43-3.01-7.22-5.61-11.31-7.7-.4-.2-.82-.38-1.26-.56-.56-.24-1.08-.46-1.46-.72-.46-.3-.9-.7-1.32-1.08l-.56-.48c-1.44-1.22-2.49-2.53-3.19-3.91-1-2.03-1.26-4.49-.68-6.68.66-2.49,2.33-4.67,4.75-6.12.54-.34,1.1-.64,1.66-.9.04-.02.1-.04.14-.06.68-.34,1.38-.62,2.07-.86.74-.26,1.5-.46,2.27-.62.76-.16,1.56-.28,2.33-.34.26-.04.52,0,.76.02.36.04.7.06,1.06.04h.92c1.16-.06,2.07-.1,3.05.2,1.16.36,2.19.98,3.01,1.8,1.76,1.78,2.49,4.61,1.84,7.02-.28,1.02-.8,2.01-1.34,3.09-.4.8-.84,1.64-1.2,2.53-.8,2.03-1.08,4.13-.82,6.02.3,2.27,1.4,4.35,3.03,5.71,1.66,1.38,3.67,1.95,5.63,2.35.36.08.7.14,1.06.2.74.14,1.48.26,2.21.36.68.1,1.38.2,2.05.26.92.1,1.84.18,2.75.22h.52c.32.02.66.02.8.08,2.29,1,3.25,1.9,3.69,3.43.54,1.95-.74,4.13-1.56,5.25-.56.78-1.2,1.52-1.84,2.25-.98,1.14-2.01,2.33-2.85,3.73-1.46,2.43-2.39,6.1-.62,9.12l3.43-2.05c-.88-1.48-.22-3.61.6-5.01.68-1.1,1.56-2.11,2.47-3.19.68-.8,1.4-1.62,2.03-2.49,2.13-2.95,2.91-6.02,2.15-8.68-.96-3.45-3.55-4.99-5.94-6-.86-.38-1.66-.4-2.29-.4h-.4c-.84-.06-1.7-.12-2.53-.22-.58-.06-1.16-.12-1.72-.22-.74-.08-1.46-.2-2.17-.36-.36-.04-.7-.1-1.06-.18-1.44-.3-2.89-.68-3.87-1.52-.88-.72-1.48-1.88-1.64-3.15-.16-1.24.04-2.63.6-4.05.28-.74.66-1.46,1.02-2.17.62-1.2,1.26-2.43,1.64-3.85,1.04-3.81-.08-8.08-2.85-10.89-1.28-1.28-2.89-2.25-4.69-2.79-1.6-.5-2.99-.46-4.35-.4h-.86c-.2.02-.42.02-.64,0-.46-.04-.94-.08-1.44-.04-.94.08-1.9.24-2.83.42l-.24.06c-1.78.4-3.51,1-5.15,1.78-.68.34-1.34.7-1.99,1.1-.16.1-.32.2-.46.3-3.05,2.01-5.19,4.89-6.06,8.22-.82,3.13-.46,6.58.96,9.48.92,1.88,2.33,3.61,4.19,5.19l.5.44c.52.44,1.1.96,1.72,1.38.7.48,1.48.8,2.15,1.08.34.14.68.3.98.46,3.79,1.92,7.3,4.33,10.47,7.12,1.84,1.64,4.05,3.83,4.75,6.48.98,3.59-.92,7.32-2.99,9.64-2.31,2.55-5.47,4.43-8.24,5.98-1.04.58-2.13,1.1-3.29,1.64-1.3.6-2.65,1.24-3.95,1.99-2.89,1.68-5.15,4.19-6.52,5.98-1.38,1.82-2.21,3.67-2.45,5.55-.32,2.37.36,4.75,1.84,6.36Z"/>
    <path className="fill-[#b0b1b1] stroke-[#231f20]" d="M62.34,113.51s.12.08.16.14c-.02-.08-.02-.14-.04-.2-.06,0-.1.04-.12.06Z"/>
    <path className="fill-[#b0b1b1] stroke-[#231f20]" d="M14.28,9.46c-.7.24-1.4.52-2.07.86,4.51,9.48,8.98,18.95,13.45,28.41l6.04,12.75c.32.68.64,1.36.96,2.01.56,1.2,1.14,2.37,1.7,3.55.7,1.5,1.42,2.99,2.13,4.49l1.97,4.23c.18.38.3.7.34.82.02.06.02.08.02.1.08.3.32.56.44.84.54,1.24,1.1,2.47,1.66,3.69.64-.46,1.28-.92,1.9-1.38-.78-1.68-1.58-3.35-2.35-5.03-.36-.74-.9-1.9-1.58-3.29l-1.97-4.21c-.62-1.3-1.24-2.61-1.86-3.91l-1.68-3.53c-6.38-13.47-12.73-26.93-19.09-40.4Z"/>
    <path className="fill-[#b0b1b1] stroke-[#231f20]" d="M7.88,8.16c.14-.1.3-.2.46-.3.66-.4,1.32-.76,1.99-1.1,1.64-.78,3.37-1.38,5.15-1.78.04-2.03-1.3-3.95-3.33-4.49-2.35-.66-4.91.86-5.55,3.27-.46,1.66.08,3.31,1.28,4.39Z"/>
    <path className="fill-[#b0b1b1] stroke-[#231f20]" d="M36.68,33.56c.72.16,1.44.28,2.17.36,1.24-6.16,2.45-12.31,3.71-18.45.02-.08.04-.14.04-.18,1.72-.14,3.37-1.3,3.91-2.99.8-2.41-.4-4.77-2.79-5.63-2.39-.82-4.85.36-5.69,2.71-.74,2.13.28,4.41,2.31,5.43-.02.06-.06.16-.08.26-1.14,6.18-2.35,12.35-3.59,18.49Z"/>
    <path className="fill-[#b0b1b1] stroke-[#231f20]" d="M19.19,128.02c1.99-1.95,2.09-4.53,2.57-6.92,2.55-12.63,5.41-25.28,7.62-38,.28-1.6.56-3.19.82-4.81,0-.06.02-.14.02-.2.04-.12.06-.22.06-.34.02-.04.02-.06.04-.08.1-.48.2-1.08.34-1.8l.84-4.17c.96-4.89,1.9-9.77,2.85-14.66.24-1.22.48-2.43.7-3.65,1.02-5.19,2.03-10.37,3.05-15.54-.74-.1-1.48-.22-2.21-.36-.42,2.01-.84,4.01-1.26,6-.28,1.5-.72,3.73-1.26,6.36-.22,1.14-.46,2.35-.72,3.63-.84,4.37-1.84,9.34-2.71,13.82l-.82,4.17c-.52,2.65-1.04,5.31-1.56,7.96-.32,1.64-.64,3.29-.96,4.93-.92,4.69-1.84,9.38-2.73,14.08-1.62,8.46-3.53,17.5-5.05,25.75-.24,1.3-.04,2.51.36,3.81Z"/>
    <path className="fill-[#da715d]" d="M144.29,175.52c3.1-2.93,5.68-5.3,5.68-7.51,0-2.76-1.27-4.75-4.58-4.75-2.37,0-5.13,1.48-8.23,4.41-1.36,1.31-2.93,3.05-4.71,5.17-.42.98-1.06,1.82-1.95,2.46-4.58,5.98-7.85,10.73-14.8,22.94-14.46,26.21-16.84,46.52-16.84,49.79,0,4.03,4.41,6.23,6.96,6.23,3.31,0,3.31-2.93,3.31-4.96,0-9.16,1.99-24.73,15.73-48.73,7.34-12.81,14.84-20.7,19.42-25.11v.04Z"/>
    <path className="fill-[#da715d]" d="M126.84,144.73l-16.76.47c.1-.43.19-.82.19-.82l17.36-64.28c3.49-13.02,7.51-20.86,10.26-25.1,1.27-1.82,1.99-2.94,1.99-4.21,0-2.75-1.82-7.32-5.12-7.32-2.15,0-3.64,2.75-6.96,7.87-2.92,4.76-7.49,11.91-15,21.6-15.03,19.6-37.37,45.96-44.5,45.96-1.1,0-2.37-.89-2.37-2.75,0-4.76,4.59-13.54,9.88-23.06,7.51-13.54,16.68-30.03,16.68-41.37,0-4.52-3.23-13.8-8.52-14.47-3.61-.45-8.16,4.81-10.79,6.89-2.85,2.25-5.29,4.95-7.92,7.46-3.45,3.33-7.25,6.2-11.08,9.04-3.92,2.89-7.44,6.32-11.36,9.19-.62.45-1.24.91-1.89,1.36-1.12.79-2.25,1.63-3.4,2.42-2.32,1.6-4.76,3.13-7.3,4.47,0,.05-.02.19-.02.19-.26,1.63-.53,3.21-.81,4.81,4.74-2.27,8.88-5.34,13.09-8.4l1.96-1.44c7.44-5.45,15.97-10.34,23.7-15.36,3.56-2.32,6.29-4.56,10.15-6.42.89-.43,1.51-.64,2.33-.9.65.89,1.05,2.03,1.05,3.33,0,8.61-7.68,22.35-14.64,34.6-6.77,12.08-12.85,23.61-12.85,30.96,0,8.61,6.24,10.81,9.93,10.81,13.9,0,32.95-24.55,52.54-47.64-.7.82-.69,3.83-.9,4.92-.4,2.04-.81,4.08-1.24,6.12-1.06,4.99-2.19,9.96-3.39,14.91l-8.76,37.33q-2.75.33-3.34.43c-21.57,3.61-43.02,13.25-58.1,29.41-5.79,6.21-10.64,13.59-12.37,21.91-1.23,5.9-.81,12.21,1.62,17.72s6.97,10.16,12.59,12.32c7.09,2.72,15.29,1.3,21.91-2.4s11.87-9.46,16.34-15.59c12.95-17.74,20.62-38.84,27.33-59.56.13-.4.55-1.57.86-2.45,8.88.37,19.08.09,27.93.81,8.24.67,16.33,1.4,24.41,3.23,5.03,1.14,10.56,4.1,13.05,9.07,2.27,3.94,2.16,8.87.89,13.23-1.84,6.3-5.91,11.78-10.73,16.23-6.97,6.43-15.92,11.04-25.4,11.47-2.46.11-5.37.16-6.75,2.19-1.4,2.06-.17,5.09,1.96,6.38,2.13,1.29,4.8,1.26,7.27.97,13.21-1.58,25.02-9.61,33.58-19.8,7.17-8.53,12.91-20.24,9-31.5-.94-2.7-2.44-5.21-4.6-7.38-5.23-5.23-12.19-7.45-19.38-8-17.79-1.35-33.56.15-33.56.15ZM100.97,149.97c-3.95,10.78-7.69,21.64-12.17,32.21-3.92,9.25-7.91,18.69-14.06,26.72s-16.89,17.02-27.48,13.65c-3.29-1.05-6.02-3.42-8.17-6.12-11.28-14.16-4.15-30.85,7.27-42.22,7.37-7.34,16.15-12.78,25.44-17.35,9.3-4.57,19.41-6.74,29.46-8.95.1-.02.43-.03.5-.11,0,0-.79,2.15-.79,2.15Z"/>
    <g>
      <path className="fill-[#d7624f]" d="M363.07,54.68c.03,2-.1,4.01-.3,6-.01.15-.03.3-.09.43-.4.84,1.54,6.8.71,7.21-1.57.77-5.33,3.9-6.85,4.77-1.81,1.03-2.16,2.74-3.13,4.46-1.11,1.97-2.46,3.79-3.6,5.74-2.22,3.79-3.65,7.98-5.5,11.96-2.39,5.13-5.48,9.91-7.62,15.15-1.2,2.93-2.29,6.06-2.31,9.25-.02,3.6.85,7.15.74,10.76-.05,1.72-.36,3.5-1.33,4.92-1.9,2.76-6.02,4.41-9.21,5.1-3.34.72-7.44.5-10.06-1.9s-3.78-5.8-4.8-9.11c-3-9.75-6.57-21.76-3.9-31.96,2.16-8.26,10.98-11.83,14.86-19.01.44-.81.83-1.71.76-2.63-.13-1.77-1.55-3.39-1.99-5.14-.52-2.07-.56-4.23-.45-6.35.14-2.81-.02-5.82.95-8.51,1.32-3.67,4.47-6.18,7.68-8.16.17-.1,4.83-.28,4.79-.44,0-.01-.04-.04-.06-.06.02-.06.03-.13.06-.17.39-.49,1.84-1.52,2.4-1.96,2.46-1.89,6.03-4.39,8.89-5.53.57-.22.56.05.78.54,1.42,3.2,2.34,7.97,2.48,11.47.05,1.23-.04,2.48,0,3.71.08.01.14-.01.22-.05.96-.4,2.28-1.37,3.28-1.91,2.82-1.5,5.92-2.79,8.99-3.68.57-.16,2.48-.74,2.94-.6.23.07.35,1.05.39,1.31.1.72.17,1.44.21,2.16.05.75.08,1.49.08,2.23Z"/>
      <path className="fill-[#f58b78]" d="M402.17,63.09c-.05,1.26-.16,2.53-.31,3.79-.16,1.3-.36,2.59-.59,3.87-.24,1.28-.51,2.56-.8,3.83-.29,1.23-.61,2.45-.94,3.67-.23.79-.46,1.58-.69,2.36-.4,1.29-.8,2.58-1.24,3.86-.91,2.63-1.96,5.23-3.11,7.76-1.12,2.42-2.31,4.81-3.59,7.15-1.29,2.37-2.66,4.69-4.12,6.96-4.42,6.85-9.74,13.55-15.76,19.06-.25.23-.51.46-.76.69-5.79,5.3-12.27,9.97-19.36,13.35-6.88,3.28-14.33,5.14-21.97,4.76-.2-.01-.39-.02-.6-.04-.25-.02-.51-.04-.76-.06-7.58-.65-14.62-4.19-20.06-9.44-4.87-4.7-8.36-10.66-10.69-16.98-2.36-6.44-3.58-13.3-3.9-20.14-.02-.38-.04-.75-.05-1.12-.56-17.43,3.04-35.23,10.58-50.92,3.76-7.8,8.57-15.04,14.79-21.1,1.11-1.08,2.48-2.62,4-3.1.32-.1.43.01.66.25.33.33.65.67.96,1.03,5.54,6.25,7.21,15,8.3,23.02.05.31.09.63.13.94.01.04.01.08.01.11.02.11.04.25.11.34-.03.04-.04.11-.06.17.02.02.06.05.06.06.04.16-.01.47,0,.67.82,9.6.8,19.29-.73,28.82-.9,1.02-1.85,2-2.74,3.03-6.03,6.94-11.07,15.39-13.89,24.2-3.33,10.4-4.45,22.39.88,32.32.58,1.08,1.57,2.69,2.41,3.55.13.13.73.59.62.15-.08-.32-.64-1.09-.83-1.46-8.54-16.34-1.62-35.17,8.54-48.93.2-.28.41-.56.62-.84.11-.14.22-.28.33-.42.1-.14.2-.27.31-.4.13-.18.27-.35.4-.51l.25-.31c.21-.27.44-.54.66-.81.22-.27.45-.54.67-.8.02-.03.05-.05.07-.08.17-.21.36-.41.53-.62.03-.03.06-.06.09-.1.23-.26.46-.53.7-.79.23-.26.47-.52.71-.78.23-.25.47-.51.71-.77.02-.02.05-.04.06-.06.22-.22.42-.45.64-.66.01-.02.02-.03.04-.04.24-.25.49-.51.74-.76.24-.25.5-.49.75-.75.25-.24.5-.49.76-.73.26-.25.51-.49.77-.73.26-.25.52-.48.78-.73.26-.23.52-.47.79-.71.11-.09.21-.18.31-.27.3-.26.59-.52.89-.78.13-.11.27-.23.41-.35.27-.23.54-.46.81-.68.28-.23.55-.46.83-.68.13-.11.27-.22.4-.32.27-.22.53-.43.79-.63.16-.13.32-.25.48-.38.28-.22.57-.43.85-.65.28-.21.57-.43.85-.64.09-.06.18-.12.27-.19.1-.07.2-.15.3-.22.23-.17.47-.34.71-.51.15-.11.3-.22.45-.33.29-.2.59-.41.88-.61s.58-.4.88-.6c.06-.04.12-.08.18-.12.23-.16.47-.32.7-.47.21-.13.41-.27.61-.4.39-.25.79-.5,1.18-.75.02-.01.05-.03.07-.04.27-.17.55-.35.84-.52.11-.07.22-.14.33-.21.19-.11.38-.23.57-.34.31-.18.61-.36.92-.54.3-.18.6-.36.91-.53s.61-.35.92-.52c.15-.08.31-.17.46-.25.15-.09.31-.17.47-.25.11-.07.23-.13.35-.19.19-.11.38-.21.57-.31.31-.16.62-.32.93-.49.31-.16.62-.31.94-.47.06-.03.12-.06.19-.09.24-.13.49-.25.74-.37.31-.15.63-.3.94-.45.18-.09.35-.16.52-.25.09-.04.17-.08.26-.12.08-.03.16-.06.24-.09.07-.02.13-.04.2-.07.1-.03.2-.06.29-.11.02-.01.06-.03.1-.05.02-.02.04-.03.05-.05.02-.02.03-.04.03-.07l.02-.02.03-.05v-.02h.11s.06-.02.09-.02c.59-.12,1.84-.8,2.49-1.06,1.21-.48,2.42-.94,3.64-1.36,1.26-.44,2.51-.84,3.79-1.21,1.28-.38,2.57-.72,3.87-1.01,1.31-.3,2.62-.55,3.94-.76,1.32-.2,2.65-.36,3.97-.46,1.32-.1,2.65-.14,3.97-.12,1.44.02,2.87.15,4.3.32,1.36.15,2.71.43,4.02.83.66.2,1.31.44,1.94.71l.04.02c.21.08.42.17.63.26l.06.03s.03.01.04.02l.09.05s-.02-.01-.02-.02c.36.17.72.32,1.07.5.26.14.53.27.77.44.17.12.38.25.46.46.09.24.09.55.12.81.14,1.18.11,2.35.06,3.54Z"/>
    </g>
  </g>
</svg>
    </Link>
  );
}
