import Image from "next/image"

const MinimalHeader = () => {
  return (
    <header className='fixed top-0 w-full bg-foreground text-white shadow z-10'>
      <div className='max-w-7xl h-header mx-auto py-1 px-2 sm:px-6 lg:px-8'>
        <div className="relative flex h-full items-center justify-between">
          <Image
            src="/logo.svg"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>
      </div>
    </header>
  )
}

export default MinimalHeader