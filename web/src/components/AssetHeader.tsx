import { FormattedAsset } from 'src/utils/formatAsset'

type Props = {
  asset: FormattedAsset
}

export const AssetHeader: React.FC<Props> = ({ asset }) => {
  const { ticker, company } = asset

  return (
    <header className="bg-gray-900/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 py-8 md:flex-row md:gap-0">
        <section className="flex w-full flex-col gap-1 font-bold sm:w-fit">
          <h1 className="text-3xl text-green-500">{ticker}</h1>
          <h2 className="text-sm">{company.fantasyName}</h2>
        </section>

        <section className="flex w-full flex-col gap-4 sm:w-fit sm:flex-row sm:items-center md:gap-12">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">Setor</p>
            <h3>{company.sector.name}</h3>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">Subsetor</p>
            <h3>{company.subsector.name}</h3>
          </div>
        </section>
      </div>
    </header>
  )
}
