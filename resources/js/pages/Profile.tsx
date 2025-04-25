import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'} font-sans`}>
      <div className="max-w-md mx-auto p-4 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-blue-600 text-2xl font-bold">E-DAR</div>
          <i className="fas fa-bars text-xl text-gray-600 cursor-pointer"></i>
        </div>

        {/* Profile Section */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <img
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
              src="https://placehold.co/100x100"
            />
            <i className="fas fa-camera absolute bottom-0 right-0 bg-white rounded-full p-1 text-blue-600 cursor-pointer"></i>
          </div>
          <div className="mt-2">
            <div className="text-lg font-medium">Ayoub Laghzal</div>
            <div className="text-gray-500">Laâyoune</div>
          </div>
        </div>

        {/* Account Management Section */}
        <Section title="Gestion du compte" items={[
          { icon: 'user', text: 'Information personnelles' },
          { icon: 'lock', text: 'Confidentialité' }
        ]} />

        {/* Security Settings Section */}
        <Section title="Sécurité de connexion" items={[
          { icon: 'key', text: 'Changer de mot de passe' },
          { icon: 'history', text: 'Activité de connexion' }
        ]} />

        {/* Application Settings */}
        <div className="mb-6">
          <div className="text-blue-600 font-medium mb-2">Paramètre de l'application</div>
          <ToggleRow label="Notifications push" icon="bell" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
          <ToggleRow label="Mode sombre" icon="moon" checked={darkMode} onChange={toggleDarkMode} />
          <ToggleRow label="Statut en ligne" icon="circle" checked={onlineStatus} onChange={() => setOnlineStatus(!onlineStatus)} />

          <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <i className="fas fa-language text-blue-600 mr-2"></i>
            <div>Langages</div>
          </div>
        </div>

        {/* About Section */}
        <Section title="À propos de l'application" items={[
          { icon: 'share-alt', text: 'Partager le site' },
          { icon: 'qrcode', text: 'Partager le site via code QR' },
          { icon: 'info-circle', text: 'À propos de nous' },
          { icon: 'user-shield', text: 'Confidentialité de nous' },
          { icon: 'file-contract', text: 'Conditions d\'utilisation' },
          { icon: 'question-circle', text: 'FAQ' },
        ]} />

        {/* Logout */}
        <div className="text-center mb-6">
          <button className="bg-red-100 text-red-600 py-2 px-4 rounded-full flex items-center justify-center mx-auto hover:bg-red-200 transition">
            <i className="fas fa-sign-out-alt mr-2"></i> Se déconnecter
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          {['heart', 'bell', 'home', 'comments', 'user'].map((icon, index) => (
            <div className="text-center cursor-pointer" key={index}>
              <i className={`fas fa-${icon} ${icon === 'user' ? 'text-blue-600' : 'text-gray-500'}`}></i>
              <div className={`text-xs ${icon === 'user' ? 'text-blue-600' : 'text-gray-500'}`}>
                {icon === 'heart' ? 'Favoris' :
                 icon === 'bell' ? 'Notification' :
                 icon === 'home' ? 'E-DAR' :
                 icon === 'comments' ? 'Discussions' : 'Mon profil'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Switch Style */}
      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 34px;
          height: 20px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 12px;
          width: 12px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #4A90E2;
        }
        input:checked + .slider:before {
          transform: translateX(14px);
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;

// Toggle Switch component
type ToggleSwitchProps = {
  checked: boolean;
  onChange: () => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => (
  <label className="switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider round"></span>
  </label>
);

// Reusable Section
type SectionItem = { icon: string; text: string };

const Section: React.FC<{ title: string; items: SectionItem[] }> = ({ title, items }) => (
  <div className="mb-6">
    <div className="text-blue-600 font-medium mb-2">{title}</div>
    {items.map((item, idx) => (
      <div key={idx} className="flex items-center mb-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
        <i className={`fas fa-${item.icon} text-blue-600 mr-2`}></i>
        <div>{item.text}</div>
      </div>
    ))}
  </div>
);

// Reusable Toggle Row
type ToggleRowProps = {
  label: string;
  icon: string;
  checked: boolean;
  onChange: () => void;
};

const ToggleRow: React.FC<ToggleRowProps> = ({ label, icon, checked, onChange }) => (
  <div className="flex items-center justify-between mb-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
    <div className="flex items-center">
      <i className={`fas fa-${icon} text-blue-600 mr-2`}></i>
      <div>{label}</div>
    </div>
    <ToggleSwitch checked={checked} onChange={onChange} />
  </div>
);
