import React from 'react';

const Property = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white m-0 p-0 shadow-md rounded-lg overflow-hidden">
        {/* Image Slider */}
        <div className="relative">
          <div className="max-w-6xl mx-auto p-4">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-3">
                <img 
                  src="https://storage.googleapis.com/a1aa/image/ES8gv1RDCuoReXaPPydzMXFBYV_Ek0snqJ662zic69o.jpg" 
                  alt="Spacious living room" 
                  className="w-full h-full object-cover rounded-lg" 
                  width="600" 
                  height="400" 
                />
              </div>
              <div className="col-span-3 grid grid-cols-2 gap-4">
                <div>
                  <img 
                    src="https://storage.googleapis.com/a1aa/image/h6uy7hF8_l6Zk9_S2yjWwDFgvyRdmSHqwY_a7QLMJhc.jpg" 
                    alt="Dining area" 
                    className="w-full h-full object-cover rounded-lg" 
                    width="300" 
                    height="200" 
                  />
                </div>
                <div>
                  <img 
                    src="https://storage.googleapis.com/a1aa/image/oCerP0AeQtOH_16JkbSKxUfLeZP-vJ0txFqfwDXXKs0.jpg" 
                    alt="Dining area" 
                    className="w-full h-full object-cover rounded-lg" 
                    width="300" 
                    height="200" 
                  />
                </div>
                <div>
                  <img 
                    src="https://storage.googleapis.com/a1aa/image/tUsWeDKJoB3A8_qXtBCszu9QnJEE73IbFxNdkYeCb9E.jpg" 
                    alt="Kitchen area" 
                    className="w-full h-full object-cover rounded-lg" 
                    width="300" 
                    height="200" 
                  />
                </div>
                <div className="relative">
                  <img 
                    src="https://storage.googleapis.com/a1aa/image/XVWzLAFkM4Z5-t7FEy8lIx7TV_9XPyXbEYMWwi2xG4o.jpg" 
                    alt="Workspace" 
                    className="w-full h-full object-cover rounded-lg" 
                    width="300" 
                    height="200" 
                  />
                  <button className="absolute bottom-4 right-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center cursor-pointer">
                    <i className="fas fa-images mr-2"></i> Show all photos
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-2 ">
              <i className="far fa-heart text-white"></i>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex justify-center space-x-4 py-4">
          <div className="text-center">
            <i className="fas fa-users text-blue-500 text-2xl"></i>
            <p className="text-gray-600">Type locataire</p>
            <p className="text-gray-800 font-semibold">Famille</p>
          </div>
          <div className="text-center">
            <i className="fas fa-bed text-blue-500 text-2xl"></i>
            <p className="text-gray-600">Chambres</p>
            <p className="text-gray-800 font-semibold">03 Chambres</p>
          </div>
          <div className="text-center">
            <i className="fas fa-money-bill-wave text-blue-500 text-2xl"></i>
            <p className="text-gray-600">Prix</p>
            <p className="text-gray-800 font-semibold">1200 MAD/mois</p>
          </div>
        </div>

        {/* Owner Details */}
        <div className="flex items-center p-4 bg-gray-100">
          <img 
            src="https://storage.googleapis.com/a1aa/image/3iTmxBXMSTKf7Pezg5hqcbNoc9ti4t7Y4-OwI0khYH8.jpg" 
            alt="Owner" 
            className="rounded-full" 
            width="50" 
            height="50" 
          />
          <div className="ml-4">
            <p className="text-gray-800 font-semibold">Fouad BOURICH</p>
            <p className="text-gray-600">Laâyoune, 70010</p>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-600"></i>
              <p className="ml-2 text-gray-600">Quartier Al Wifaq</p>
              <div className="flex items-center ml-2">
                <i className="fas fa-star text-yellow-500"></i>
                <p className="ml-1 text-gray-600">4.5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between px-4 py-2 text-gray-600">
          <div className="flex items-center">
            <i className="fas fa-clock"></i>
            <p className="ml-2">Il y a un jour</p>
          </div>
          <div className="flex items-center">
            <i className="fas fa-eye"></i>
            <p className="ml-2">125 visiteurs</p>
          </div>
        </div>

        <div className="px-4 py-2 text-gray-600">
          <i className="fas fa-map-marker-alt"></i>
          <p className="ml-2 inline">Quartier Al Wifaq Block A N°70, Laâyoune.</p>
        </div>

        {/* Description */}
        <div className="px-4 py-2">
          <h3 className="text-gray-800 font-semibold">Description du logement :</h3>
          <p className="text-gray-600">
            Ce charmant logement, idéal pour une famille, est situé dans le quartier résidentiel et tranquille d'Al Wifaq à Laâyoune.
          </p>
        </div>

        {/* Features */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Caractéristiques du logement :</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Type de logement: Appartement</li>
              <li>Salle de bain: Moderne et fonctionnelle</li>
              <li>Proximité: À proximité des écoles, des commerces, des transports en commun et des espaces verts.</li>
              <li>Sécurité: Quartier calme et sécurisé, adapté aux familles.</li>
            </ul>
          </div>

          {/* Map */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Localisation du logement :</h2>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28401.235345494333!2d-13.2226574!3d27.1514313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc3772dcaec0b78d%3A0x98d525f7a8f2ca2f!2z2YXZhNi52Kgg2YXZiNmE2KfZiiDYsdi02YrYrw!5e0!3m2!1sar!2s!4v1744101236793!5m2!1sar!2s"  
              className="w-full h-48 object-cover" 
              width="600" 
              height="300" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Report Error */}
          <div className="p-4">
            <a href="#" className="text-blue-600 text-sm flex items-center space-x-2">
              <i className="fas fa-exclamation-circle"></i>
              <span>
                Vous pensez qu'il y a une erreur ?<br />
                Cliquez pour signaler
              </span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-around py-4 bg-gray-100 mb-20">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
              <i className="fas fa-comment-dots mr-2"></i> Réserver
            </button>
            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full flex items-center">
              <i className="fas fa-phone-alt mr-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;