type Props = {
  asset: string
  companyName: string
}

export const AssetHeader: React.FC<Props> = ({ asset, companyName }) => {
  return (
    <header className="bg-neutral-800 px-2 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 font-bold">
        <h1 className="text-3xl">{asset.toUpperCase()}</h1>
        <h2 className="text-xs">{companyName}</h2>
      </div>
    </header>
  )
}
