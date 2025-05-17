import { Popover, PopoverButton } from '@headlessui/react'
import Link from 'next/link';
import { ReactNode, useState, useRef, useEffect } from 'react'
import { FaAngleRight } from 'react-icons/fa';

type PopoverMenuProps = {
  labelText?: string;
  children?: ReactNode;
  href?: string;
  className?: string;
}

const PopoverMenu = ({
  labelText,
  children,
  href = "#",
  className = ""
}: PopoverMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={menuRef}
    >
      <div className="w-full overflow-hidden rounded-none">
        <div className="w-full h-full px-4 py-2 flex justify-between items-center outline-hidden hover:bg-primary-400 hover:text-white transition-colors duration-200 cursor-pointer">
          <Link
            className="text-inherit grow"
            href={href}
          >
            {labelText}
          </Link>
          {children && <FaAngleRight className="transition-transform duration-200 group-hover:translate-x-1" />}
        </div>
      </div>
      
      {children && isOpen && (
        <div 
          className="absolute left-full top-0 min-w-[200px] z-9999 bg-white rounded-lg shadow-lg ring-1 ring-black/5"
        >
          <div className="py-2">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default PopoverMenu
