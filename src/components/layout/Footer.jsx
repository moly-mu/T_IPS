const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo + descripción */}
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex flex-col items-center md:items-start">
              <h1 className="text-2xl font-semibold whitespace-nowrap text-[#00102D] dark:text-white">
                TELECONSULTAS <span className="font-medium">IPS</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs text-center md:text-left">
                Atención médica de excelencia mediante tecnología avanzada. Tu salud es nuestra prioridad absoluta.
              </p>
            </a>
          </div>

          {/* Columnas: Especialidades, Contacto, Legal */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* Especialidades */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Especialidades
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {['Medicina General', 'Cardiología', 'Pediatría', 'Dermatología', 'Psicología'].map((item, index) => (
                  <li key={index} className="mb-2">
                    <a href="#" className="hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Contacto
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">+57 (1) 234-5678</li>
                <li className="mb-2">info@teleconsultasips.com</li>
                <li className="mb-2">Bogotá, Colombia</li>
                <li>Disponible 24/7</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a href="#" className="hover:underline">Política de privacidad</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Términos y condiciones</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        {/* Créditos y redes */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 TELECONSULTAS IPS — TODOS LOS DERECHOS RESERVADOS
          </span>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-2 sm:mt-0">
            CERTIFICADO MINISTERIO DE SALUD
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 8 19" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
