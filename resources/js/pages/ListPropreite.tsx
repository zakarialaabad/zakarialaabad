import React from 'react';

import { Link } from '@inertiajs/react';


const PropertyListing: React.FC = () => {
  return (
    <main className="p-4 pb-20">
              <section className="mb-8">
    <div className="bg-white rounded-full shadow-md p-2 flex items-center justify-center space-x-4 max-w-xl mx-auto">
     <div className="flex items-center space-x-1">
      <i className="fas fa-map-marker-alt text-blue-500">
      </i>
      <div>
       <div className="text-gray-500 text-xs">
        Où?
       </div>
       <div className="text-gray-800 text-sm">
        Laayoune, Quartier ALWIFAK
       </div>
      </div>
     </div>
     <div className="border-l border-gray-300 h-4">
     </div>
     <div className="flex items-center space-x-1">
      <i className="fas fa-home text-blue-500">
      </i>
      <div>
       <div className="text-gray-500 text-xs">
        Type logement
       </div>
       <div className="text-gray-800 text-sm">
        Appartement
       </div>
      </div>
     </div>
     <div className="border-l border-gray-300 h-4">
     </div>
     <div className="flex items-center space-x-1">
      <i className="fas fa-users text-blue-500">
      </i>
      <div>
       <div className="text-gray-500 text-xs">
        Type locataire
       </div>
       <div className="text-gray-800 text-sm">
        Famille
       </div>
      </div>
     </div>
     <div className="border-l border-gray-300 h-4">
     </div>
     <Link href='/filter'>
     <div className="flex items-center space-x-1">
      <i className="fas fa-sliders-h text-blue-500">
      </i>
     </div>
     </Link>
    </div>
   </section>
    

    <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
            <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                <div className="relative">
                <Link href='/property'>
      <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>
      </Link>
                  <div className="absolute top-2 right-2">
                    <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
                </div>
                  <div className="absolute top-2 left-2 flex space-x-2">
                        <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
                            <i className="fas fa-users"></i> Famille
                        </span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            <i className="fas fa-bed"></i> 03 Chambres
                        </span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            <i className="fas fa-money-bill-wave"></i> 1200MAD
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex items-center mb-2">
                        <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
                        <div>
                            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
                            <p className="text-gray-500">Laâyoune, 70010</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-gray-500">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="ml-1">Quartier Al Wifaq</span>
                        </div>
                        <div className="flex items-center text-yellow-500">
                            <i className="fas fa-star"></i>
                            <span className="ml-1">4.5</span>
                        </div>
                    </div>
                </div>
            </article>
        <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
              <Link href='/property'>
      <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>
      </Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
                    <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
       <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
              <Link href='/property'>
              <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>
      </Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
        <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
                  <Link href='/property'>
                    <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
          </Link>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
         <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
                <Link href='/property'>
                <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>
        </Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
                  <Link href='/property'>
                    <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
          </Link>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
           <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
                <Link href='/property'>
                <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>
        </Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
                <Link href='/property'>
          <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
</Link>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
        <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
    <Link href='/property'>

        <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>
</Link> 
     <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
        <Link href='/property'>  
                <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>

</Link>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
     <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
    <Link href='/property'>
        <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>

</Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
                <Link href='/property '>
          <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
</Link>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
           <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
    <Link href='/property'>
    <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>


</Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
                <Link href='/property'>
          <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>

</Link>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
          <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
    <Link href='/property'>
        <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>


</Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
           <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
    <Link href='/property'>
        <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>
</Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
           <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
    <Link href='/property'>
        <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>

</Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
    <article className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.01]">
                
    <div className="relative">
    <Link href='/property'>
        <img alt="Property Image" className="w-full h-48 object-cover" src="https://storage.googleapis.com/a1aa/image/md8B8lN8Jmr_vqgaVogjdL5f49PCLi_m2_0V8A5HU2I.jpg"/>

</Link>
      <div className="absolute top-2 right-2">
        <i className="far fa-heart  text-white text-xl z-10 cursor-pointer"></i>
    </div>
      <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-users"></i> Famille
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-bed"></i> 03 Chambres
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-money-bill-wave"></i> 1200MAD
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img alt="Profile Image" className="w-10 h-10 rounded-full mr-2" src="https://storage.googleapis.com/a1aa/image/p8mZPk6wmI_dqDY_Zu0s4KzdWx1eg6LYznM3uIMOSR8.jpg"/>
          <div>
            <h3 className="text-lg font-semibold">Fouad BOURICH</h3>
            <p className="text-gray-500">Laâyoune, 70010</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
            <span className="ml-1">Quartier Al Wifaq</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="ml-1">4.5</span>
          </div>
        </div>
      </div>
            </article>
        </div>
    </section>
</main>

  );
};

export default PropertyListing;