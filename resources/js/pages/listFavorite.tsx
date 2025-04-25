import React from 'react';

const RecentlyViewed = () => {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <i className="fas fa-arrow-left text-xl"></i>
          <a
            className="text-lg text-black underline font-bold p-2 px-4 rounded hover:bg-gray-100 hover:rounded-lg"
            href="#"
          >
            Edit
          </a>
        </div>

        <h1 className="text-3xl font-semibold mt-4">Recently viewed</h1>
        <h1 className="text-xl font-semibold mt-2">Today</h1>

        <div className="mt-4">
          <div className="relative w-72 h-72">
            {/* Heart icon */}
            <div className="absolute top-2 right-2">
              <i className="far fa-heart text-white text-xl z-10 cursor-pointer"></i>
            </div>
            <img
              alt="View of a beach with boats and a patio with a table and chairs"
              className="rounded-lg w-full h-full object-cover"
              src="https://storage.googleapis.com/a1aa/image/8K3QGPVgLa0zbqkfNOW3ofUCi-tyEfQOawr7xqfOXHw.jpg"
            />
          </div>

          <p className="mt-2 text-l font-semibold">Bungalow in Plage de Bouznika</p>
          <p className="text-sm text-gray-500">
            3 beds • <i className="fas fa-star text-yellow-500"></i> 4.9
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Yesterday</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg">
            <div className="relative w-72 h-72">
              <img
                alt="Modern living room with a large window and a view of the city"
                className="rounded-lg w-full h-full object-cover"
                height="300"
                src="https://storage.googleapis.com/a1aa/image/60aK5lYEKY7YXykXfYFAD4tSnEw_eH7UGMI8JF_FgWU.jpg"
                width="400"
              />
              <div className="absolute top-2 right-2">
                <i className="far fa-heart text-white text-xl z-10 cursor-pointer"></i>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-l font-semibold">Rental unit in Casablanca</h2>
              <p className="text-gray-600">
                1 bed ·<i className="fas fa-star text-yellow-500"></i>
                4.77
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="relative w-72 h-72">
              <img
                alt="Cozy room with orange walls and a blue sofa"
                className="rounded-lg w-full h-full object-cover"
                height="300"
                src="https://storage.googleapis.com/a1aa/image/mudW7X84mcbeKKE-D-ht6B6oIuqInT_GACv1hllmJ5U.jpg"
                width="400"
              />
              <div className="absolute top-2 right-2">
                <i className="far fa-heart text-white text-xl z-10 cursor-pointer"></i>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-l font-semibold">Room in Rio de Janeiro</h2>
              <p className="text-gray-600">
                2 beds ·<i className="fas fa-star text-yellow-500"></i>
                4.9
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="relative w-72 h-72">
              <img
                alt="Dining area with a view of the ocean"
                className="rounded-lg w-full h-full object-cover"
                height="300"
                src="https://storage.googleapis.com/a1aa/image/n8oLVBzEHtB2k5vA-b7obM4DtOi-3xD6zvvAvndeYec.jpg"
                width="400"
              />
              <div className="absolute top-2 right-2">
                <i className="far fa-heart text-white text-xl z-10 cursor-pointer"></i>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-l font-semibold">Room in Florianópolis</h2>
              <p className="text-gray-600">
                1 bed ·<i className="fas fa-star text-yellow-500"></i>
                4.99
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;