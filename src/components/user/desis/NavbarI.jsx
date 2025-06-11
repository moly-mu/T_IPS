
import { Add, DirectNotification, SidebarLeft } from 'iconsax-react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"; 

function NavbarI({ isOpen, sidebarChange }) {
    return (
        <div>
            <div className='flex p-4 md:p-6 justify-between items-center'>
                {/* perfil*/}
                <div className='flex items-center justify-between gap-2'>
                    <img
                        src="/src/assets/img_user/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                        alt='User'
                        width={40}
                        height={40}
                        className='rounded-full'/>
                    <div>
                        <p className='text-sm font-semibold text-gray-800'>Nombre usuario</p>
                        <p className='text-xs font-medium text-gray-500'>Usuario</p>
                    </div>
                </div>

                <button onClick={() => sidebarChange(!isOpen)} className='all-center text-gray-500 h-8 w-8 md:hidden'>
                    <SidebarLeft size={16} />
                </button>

                <div className='text-gray-500 hidden md:flex gap-2'>
                    <button className='all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg'>
                        <DirectNotification size={16} />
                    </button>

                    <Link to="/">
                    <button className='h-8 gap-1 bg-[#00102D] hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center'>
                        <Add size={16} />
                        <span className='hidden md:inline'>Cerrar sesión</span>
                    </button>
                    </Link>
                </div>
            </div>

            <hr className='bg-gray-400 mx-2' />
        </div>
    )
}

// validación de props
NavbarI.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    sidebarChange: PropTypes.func.isRequired,
};

export default NavbarI;
