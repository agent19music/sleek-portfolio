import type { Metadata } from 'next'
import { LornaGallery } from './_components/LornaGallery'

export const metadata: Metadata = {
  title: 'Lorna — Component Gallery',
  description:
    'A small studio of polished UI mockups. Toggle between desktop and mobile previews of each design.',
}

export default function LornaPage() {
  return <LornaGallery />
}
