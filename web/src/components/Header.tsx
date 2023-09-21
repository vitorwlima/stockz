import { UserButton } from '@clerk/nextjs'
import { Logo } from './Logo'
import { SearchAsset } from './SearchAsset'

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-neutral-500 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Logo size="lg" showPro />
        <section className="flex w-full max-w-md flex-1 items-center justify-end gap-4">
          <SearchAsset />
          <UserButton
            userProfileMode="navigation"
            userProfileUrl="/configuracoes/conta"
          />
        </section>
      </div>
    </header>
  )
}
