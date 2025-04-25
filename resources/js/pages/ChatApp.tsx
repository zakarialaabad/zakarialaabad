import React from 'react';

const ChatApp = () => {
  return (
    <div className="w-full p-9" style={{ overflowX: 'hidden', margin: 0, padding: 0 }}>
      {/* Main Container */}
      <div className="main-container w-full">
        {/* Sidebar with Online Users */}
        <div className="sidebar bg-white overflow-y-auto border-l border-r">
          <div className="p-4">
            <div className="relative mb-4">
              <input 
                className="w-full p-2 pl-10 rounded-full bg-gray-100" 
                placeholder="Search or start a new chat" 
                type="text" 
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            <div className="space-y-4">
              {/* Chat List Items */}
              {[
                {
                  name: "GAPD DesPro",
                  lastMessage: "Tosin Okeowo: 😭😭😭",
                  time: "17:36",
                  unread: 5,
                  avatar: "https://storage.googleapis.com/a1aa/image/QI5VNspLh_HVFijTz_100dvlXPXoJksg4cBfNp2XPK0.jpg"
                },
                {
                  name: "Generator Man",
                  lastMessage: "Boss, d gen don spoil o!!!",
                  time: "17:36",
                  unread: 3,
                  avatar: "https://storage.googleapis.com/a1aa/image/sP6aBKd4ZF7y2UVfABj8oUkhBENj9QAZFbIIbYj-lbI.jpg"
                },
                {
                  name: "Love of your life",
                  lastMessage: "Don't worry, breakfast is...",
                  time: "17:36",
                  avatar: "https://storage.googleapis.com/a1aa/image/E14Lnk5R1eE8l218fTUqLXEUhDkTZ5jtsj0qaNouoPI.jpg"
                },
                {
                  name: "Ejinne Seun",
                  lastMessage: "Baba sell the car jare...",
                  time: "typing",
                  avatar: "https://storage.googleapis.com/a1aa/image/zukL0knZidXLLkjv3LZWtnj73SIiojVf05JU00sOqZs.jpg"
                },
                {
                  name: "Bolu Shakur",
                  lastMessage: "Friday turn still dey?",
                  time: "17:36",
                  avatar: "https://storage.googleapis.com/a1aa/image/ckKIcY4QLwuGIuHGCYLxo8oUaGzODEQ41eYExg8nPVo.jpg"
                },
                {
                  name: "Jane Neighbour",
                  lastMessage: "You get salt?",
                  time: "17:36",
                  avatar: "https://storage.googleapis.com/a1aa/image/wApTD2Yhh-s4Yg21zNbxeLnQUMk6fvl_i0b3dBiiuGk.jpg"
                },
                {
                  name: "Tuski Morgan",
                  lastMessage: "Done bro",
                  time: "17:36",
                  unread: 1,
                  avatar: "https://storage.googleapis.com/a1aa/image/Ma5kHkIfmf9Oau3_VgrBRMzVOKIDulrG0Jl-OGImr50.jpg"
                },
                {
                  name: "Denrele Shui",
                  time: "17:36",
                  avatar: "https://storage.googleapis.com/a1aa/image/PbVGut5GNGpHisXTj7n2LpPQwx3UmjJxCxi2DP2NZbI.jpg"
                }
              ].map((chat, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-4 relative">
                    <div className="relative">
                      <img 
                        alt={`Profile picture of ${chat.name}`} 
                        className="w-12 h-12 rounded-full" 
                        src={chat.avatar}
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                    </div>
                    <div>
                      <div className="font-bold">{chat.name}</div>
                      {chat.lastMessage && (
                        <div className="text-gray-400">{chat.lastMessage}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs ${chat.time === 'typing' ? 'italic' : 'text-gray-500'}`}>
                      {chat.time}
                    </div>
                    {chat.unread && (
                      <div className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1 ml-auto">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="chat-area flex flex-col bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-white text-black border-b h-14">
            <div className="flex items-center relative">
              <div className="relative">
                <img 
                  alt="Profile picture" 
                  className="w-10 h-10 rounded-full" 
                  src="https://storage.googleapis.com/a1aa/image/IyeJprzmjNDFcQ8bblJ-zmktjy0rxpTsKevBKGLEOpc.jpg" 
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
              </div>
              <div className="ml-4 text-black">
                <p className="text-lg font-semibold">Ejinne Seun</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-800">
              <i className="fas fa-search text-gray-800"></i>
              <i className="fas fa-ellipsis-v text-gray-800"></i>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="messages-container bg-gray-50">
            <div className="p-4 space-y-4">
              {/* Message from Me */}
              <div className="flex justify-end mb-2">
                <div className="flex items-end">
                  <span className="text-xs text-gray-400 mr-2">12:41</span>
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs md:max-w-md">
                    <p>How far that motor wey you talk say you wan dash your babe that day, your don sell am abi hin still dey house ? Be like say i don get buyer</p>
                  </div>
                </div>
              </div>
              
              {/* Message from Ejinne Seun */}
              <div className="flex justify-start mb-2">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Ejinne Seun</span>
                  <div className="bg-gray-100 text-black p-3 rounded-lg max-w-xs mb-1">
                    <p>Naaaa bro Hin still dey house jare , I no sure say i wan sell am tho</p>
                  </div>
                  <div className="bg-gray-100 text-black p-3 rounded-lg max-w-xs">
                    <p>Baba sell that car wey you win from that our competition that year na, you suppose don buy maseratti by now na</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 ml-2 self-end">13:00</span>
              </div>
              
              {/* Typing Indicator */}
              <div className="flex justify-start mb-2">
                <div className="flex items-center space-x-1 bg-gray-100 px-3 py-2 rounded-full">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  <span className="text-xs text-gray-500 ml-2">typing...</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t flex items-center bg-white h-14">
            <i className="far fa-smile text-gray-500 text-xl mr-4 cursor-pointer"></i>
            <i className="fas fa-paperclip text-gray-500 text-xl mr-4 cursor-pointer"></i>
            <input 
              className="flex-grow bg-gray-100 text-black placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none" 
              placeholder="Type a message or send a voice note" 
              type="text" 
            />
            <i className="fas fa-microphone text-gray-500 text-xl ml-4 cursor-pointer"></i>
          </div>
        </div>
      </div>

      <style >{`
        .main-container {
          height: calc(100vh - 56px - 56px);
          display: flex;
        }
        .messages-container {
          height: calc(100% - 56px);
          overflow-y: auto;
        }
        .sidebar {
          width: 25%;
          min-width: 250px;
        }
        .chat-area {
          flex: 1;
        }
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            display: none;
          }
          .chat-area {
            display: none;
          }
          .main-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatApp;