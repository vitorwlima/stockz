import { FormattedAsset } from 'src/utils/formatAsset'
import { DataCard } from './DataCard'

type Props = {
  asset: FormattedAsset
}

export const AssetIntroductionData: React.FC<Props> = ({ asset }) => {
  const cardsData = [
    {
      title: 'Cotação',
      data: asset.valuation.price,
    },
    {
      title: 'Valorização (12M)',
      data: asset.valuation.changeInLast12Months,
    },
    {
      title: 'P/L',
      data: asset.valuation.priceToProfitRatio,
    },
    {
      title: 'P/VP',
      data: asset.valuation.priceToBookRatio,
    },
    {
      title: 'DY',
      data: asset.valuation.dividendYield,
    },
  ]

  return (
    <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-5 lg:px-0">
      {cardsData.map(({ title, data }, index) => (
        <DataCard
          key={title}
          title={title}
          data={data}
          isLast={index === cardsData.length - 1}
        />
      ))}
    </section>
  )
}
