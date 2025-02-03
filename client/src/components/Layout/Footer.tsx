const Footer = () => {
    const currentYear = new Date().getFullYear()
  
    return (
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              © {currentYear} Notes App. All rights reserved.
            </div>
  
            {/* Links */}
            <nav className="flex space-x-4 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-600 text-sm"
                onClick={(e) => {
                  e.preventDefault()
                  // Add your privacy policy logic here
                }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-600 text-sm"
                onClick={(e) => {
                  e.preventDefault()
                  // Add your terms of service logic here
                }}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-600 text-sm"
                onClick={(e) => {
                  e.preventDefault()
                  // Add your contact logic here
                }}
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </footer>
    )
  }