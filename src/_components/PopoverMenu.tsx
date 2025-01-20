import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link';
import { ReactNode, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa';

type PopoverMenuProps = {
  labelText?: string;
  children?: ReactNode;
}

const PopoverMenu = ({
  labelText,
  children
}: PopoverMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleEnter = () => {
    setIsOpen(true)
  }

  const handleLeave = () => {
    setIsOpen(false)
  }

  return (
    <Popover
      className="relative flex-grow"
    >
      {({open}) => (
        <div
          onMouseEnter={() => handleEnter()}
          onMouseLeave={() => handleLeave()}
        >
          <PopoverButton
            className="w-full h-full"
          >
            <Link
              className="w-full h-full px-4 py-2 flex justify-between items-center outline-none hover:bg-primary-400 hover:text-white"
              href="/auth/login"
            >
              {labelText}
              <FaAngleRight />
            </Link>
          </PopoverButton>
          <PopoverPanel
            className="min-w-fit max-w-[var(--button-width)] bg-white rounded-lg shadow ring-2 ring-black/5"
            anchor={{
              to: "right start",
              gap: "2px"
            }}
            static={isOpen}
            unmount={false}
          >
            {children}
          </PopoverPanel>
        </div>
      )}
    </Popover>
  )
}

export default PopoverMenu