import React from 'react'

const Navbar = ({ toggleSidenav }: { toggleSidenav: () => void }) => {
  return (
    <div className='flex justify-between items-center p-5 bg-black/20 backdrop-blur-sm border-b border-red-500/20 sticky top-0 z-20'>
      {/* Mobile Menu (visible on small screens) */}
      <button className='lg:hidden' onClick={toggleSidenav}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='25'
          fill='white'
          className='bi bi-list'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
          />
        </svg>
      </button>

      {/* Logo/Title (hidden on small screens) */}
      <div className='hidden lg:block font-serif text-xl'>
        //* Welcome to the world of systems 💡
      </div>

      {/* Profile Button */}
      <button className='hover:opacity-80 transition-opacity'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='25'
          fill='red'
          className='bi bi-person-bounding-box'
          viewBox='0 0 16 16'
        >
          <path d='M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5' />
          <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
        </svg>
      </button>
    </div>
  )
}

export default Navbar