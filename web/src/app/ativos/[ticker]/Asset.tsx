'use client'

import { AssetHeader } from 'src/components/AssetHeader'
import { AssetIntroductionData } from 'src/components/AssetIntroductionData'
import { useGetAsset } from 'src/queries/useGetAsset'
import { formatAsset } from 'src/utils/formatAsset'

type Props = {
  ticker: string
}

export const Asset: React.FC<Props> = ({ ticker }) => {
  const { data, isLoading } = useGetAsset({ ticker })

  if (isLoading || data === undefined) {
    return <div>Carregando...</div>
  }

  if (!data.ok) {
    return <div>Ativo não encontrado.</div>
  }

  const { data: asset } = data
  const formattedAsset = formatAsset(asset)

  return (
    <main>
      <AssetHeader ticker={ticker} companyName={asset.about.name} />

      <div className="px-2">
        <AssetIntroductionData asset={formattedAsset} />
      </div>
    </main>
  )
}
