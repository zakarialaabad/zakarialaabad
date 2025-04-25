import React from 'react';

const Notification = () => {
  return (
    
 <div className="font-roboto bg-white">
 <div className="max-w-4xl mx-auto p-4">

 <h1 className="text-3xl font-bold mb-6">
  Notifications
 </h1>
 <div className="flex items-center space-x-4 p-4 hover:border rounded-lg">
  <div className="flex-shrink-0">
   <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
    <img alt="Notification icon" className="h-6" height="24" src="https://storage.googleapis.com/a1aa/image/cSpu1JBCLdbMNNqUPHpqm8eGwyjZ1L9rv7UjcXW3MtI.jpg" width="24"/>
   </div>
  </div>
  <div className="flex-grow">
   <p className="text-gray-700">
    Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can request a new confirmation email or change your email address.
   </p>
   <p className="text-gray-500 mt-1">
    April 7, 2025
   </p>
  </div>
  <div className="flex-shrink-0">
   <i className="fas fa-times text-gray-500">
   </i>
  </div>
 </div>
 </div>
 

</div>
  )
}
export default Notification;