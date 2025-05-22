import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p> &copy; 2025 Minha Empresa. Todos os direitos reservados.</p>
        <div className="flex justify-center mt-4">
          <a href="https://www.instagram.com" className="text-white mx-2 hover:text-gray-400">Instagram</a>
          <a href="https://www.facebook.com" className="text-white mx-2 hover:text-gray-400">Facebook</a>
          <a href="https://www.twitter.com" className="text-white mx-2 hover:text-gray-400">Twitter</a>
        </div>
    </footer>
  );
};

export default Footer;
