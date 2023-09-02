'use client'

import { AssetHeader } from 'src/components/AssetHeader'
import { AssetIntroductionData } from 'src/components/AssetIntroductionData'
import { Fundamentals } from 'src/components/Fundamentals'
import { Spinner } from 'src/components/Spinner'
import { WindScore } from 'src/components/WindScore'
import { useGetAsset } from 'src/queries/useGetAsset'
import { formatAsset } from 'src/utils/formatAsset'

type Props = {
  ticker: string
}

export const Asset: React.FC<Props> = ({ ticker }) => {
  const { data, isLoading } = useGetAsset({ ticker })

  if (isLoading || data === undefined) {
    return (
      <div className="mt-32">
        <Spinner />
      </div>
    )
  }

  if (!data.ok) {
    return <div>Ativo não encontrado.</div>
  }

  const { data: asset } = data
  const formattedAsset = formatAsset(asset)

  return (
    <main>
      <AssetHeader about={formattedAsset.about} />

      <div className="px-2">
        <AssetIntroductionData asset={formattedAsset} />
        <WindScore windScore={formattedAsset.windScore} />
        <Fundamentals asset={formattedAsset} />
      </div>
    </main>
  )
}
