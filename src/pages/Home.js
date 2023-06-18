import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use-storage';
import { useSelector, useDispatch } from 'react-redux';
import { getHome,createChannel,selectChannel,getUsers,getContacts,manageUsers } from '../store/ChatStore';
import { createUser } from '../store/SigninStore';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_BASEURL, {
      // Socket.IO client options
      transports: ['websocket'],
    });
const Home = () => {
  
  const [selectedContact, setSelectedContact] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLogin, setIsLogin] = useLocalStorage('isLogin', false);
  const [role,setRole] = useLocalStorage('role','');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [userName,setUserName]= useState('');
  const [password,setPassword]=useState('');
  const { ChatStore } = useSelector((state) => state);
  const { SigninStore }=useSelector((state) => state);
  const [selectedContact2, setSelectedContact2] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();

  const handleContactClick = (channelId) => {
    dispatch(selectChannel(channelId));
    setMessages(ChatStore.firstChannel.chat);
    socket.emit('join', { channelId, un: ChatStore.user });
    setSelectedContact(true);
  };
  // const handleContactChange = (event) => {
  //   setSelectedContact(event.target.value);
  // };

  const handleUserChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedUsers(selectedOptions);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

   
    socket.emit('send message', {
      channelId: ChatStore.firstChannel._id,
      username: ChatStore.user,
      message: newMessage,
    });
    setNewMessage('');
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleOpenModal2 = () => {
    setShowModal2(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setChannelName('');
  };
  const handleManageUsers = (e)=>{
    console.log(selectedContact2)
    console.log(selectedUsers)
    e.preventDefault()
    dispatch(manageUsers({
      channelname:selectedContact2,
      users:selectedUsers
    }))
    dispatch(getHome());
    dispatch(getUsers());
    dispatch(getContacts());

  }
  const handleCreateChannel = () => {
    dispatch(createChannel({ channelName }));
    dispatch(getContacts());
    setChannelName('');
    setShowModal(false);
  };
  const handleCreateUser = (e)=>{
    e.preventDefault();
    const Data = {
      username:userName,
      password
    };
    dispatch(createUser(Data))
    dispatch(getUsers());
    setUserName('');
    setPassword('')
  }

  useEffect(() => {
    if (!isLogin) {
      window.location = '/';
    }
    
  }, []);

  useEffect(() => {
    socket.on('connection', () => {
      console.log("Connected !");
      
      });
  }, []);
  useEffect(() => {
    const handleNewMessage = (data) => {
      if (ChatStore.firstChannel && ChatStore.firstChannel._id === data.channelId) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };
  
    socket.on('new message', handleNewMessage);
  
    return () => {
      socket.off('new message', handleNewMessage);
    };
  });
  

  useEffect(() => {
    dispatch(getHome());
    dispatch(getUsers());
    dispatch(getContacts());
    if (ChatStore.firstChannel) {
      setMessages(ChatStore.firstChannel.chat);
    }
  }, []);
  console.log("chat ",ChatStore);
  return (
    <div className="flex h-screen">
      {/* Left section: Contact list */}
      <div className="w-1/4 bg-gray-200 p-4 relative sx: w-[20%]">
        <div className='flex text-center w-full'>
        <h2 className="text-lg font-bold mb-4 text-center self-start">Contacts</h2>
          {
              role && role === 'admin' &&(
        <svg aria-hidden="true" fill="none" className={'mr-3 self-start' } stroke="currentColor" onClick={()=>setShowModal3(true)} stroke-width="1.5" viewBox="0 0 24 24" width={30} height={30} xmlns="http://www.w3.org/2000/svg">
  <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
              )}
        </div>
        
        <ul className='flex flex-col'>
          {ChatStore && ChatStore.Channels && ChatStore.Channels.length > 0 ? (
            ChatStore.Channels.map((channel, index) => (
              <li
                key={index}
                className={`inline-flex mb-1 items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px rounded-md hover:bg-blue-700 hover:cursor-pointer`}
                onClick={(e) => {

                  e.preventDefault()
                  handleContactClick(channel.channelId)
                }}
              >
                {channel.channelName}
              </li>
            ))
          ) : (
            <p>No Contacts Available!</p>
          )}
        </ul>
{/*         
          {
            SigninStore && SigninStore.user && SigninStore.user.role === "admin" &&( */}
            {
              role && role === 'admin' &&(
<div className='flex flex-col'>
<button
          className="mt-4 w-[200px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded absolute bottom-14 left-4 right-4"
          onClick={handleOpenModal}
        >
          Add Channel
        </button>
        <button
          className="mt-4 bg-blue-500 w-[200px] sx:w-[60px]  hover:bg-blue-700 text-white font-bold py-1 px-2 rounded absolute bottom-4 left-4 right-4"
          onClick={handleOpenModal2}
        >
          Add User
        </button>
        </div>
              )
            }
              
            {/* )
          } */}
        
        
        
      </div>

      {/* Right section: Chat */}
      <div className="flex-1 bg-white p-4">
        <div className="flex flex-col h-full">
          <div className="flex flex-col flex-1 overflow-y-auto w-full">
            {ChatStore && ChatStore.firstChannel && messages && messages.length > 0 ? (
                messages.map((message) => (

                    <div
                        key={message.id}
                        className={`my-2 ${
                            message.senderUsername === ChatStore.user ? 'flex-row-reverse  text-right self-end mr-2' : 'flex-row text-left self-start ml-2'
                        }`}
                    >
                      <div className={`flex items-center ${message.senderUsername === ChatStore.user ? 'flex-row-reverse' :''}`}>
                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {message.senderUsername[0]}
          </span>
                        </div>
                        <div className={`flex ${message.senderUsername === ChatStore.user ? 'flex-row-reverse' :''}`}>
                        <div
                            className={`bg-[#03fc8c] rounded-[10px] p-2 ml-2  ${
                                message.senderUsername === ChatStore.user ? 'bg-[#03d6a7] text-white' : 'bg-[#03fc8c] text-gray-900'
                            }`}
                        >
                          {message.message}
                        </div>
                          <div className={` m-auto mx-2 ${
                              message.senderUsername === ChatStore.user ? 'mr-2' : 'ml-2'
                          }`}>
                            {new Date(message.date).toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                            }) }
                          </div>
                        </div>
                      </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No messages!</p>
            )}
          </div>
          <form className="mt-4" onSubmit={handleSendMessage}>
            <div className='flex'>
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full"
              type="text"
              placeholder="Write a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-auto ml-2"
              type="submit"
            >
              Send
            </button>
            </div>
            
          </form>
        </div>
      </div>

      {/* Channel creation modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4">
            <h2 className="text-lg font-bold mb-4">Create Channel</h2>
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
              type="text"
              placeholder="Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={handleCreateChannel}
              >
                Create
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 ">
          <div className="bg-white p-4">
            <h2 className="text-lg font-bold mb-4">Create User</h2>
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
              type="text"
              placeholder="User Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={handleCreateUser}
              >
                Create
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                onClick={()=>setShowModal2(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {
        showModal3 && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-[40%]">
        <h2 className="text-lg font-bold mb-4">Manage</h2>
        <form onSubmit={handleManageUsers}>
          <div className="mb-4">
            <label htmlFor="contact" className="block font-medium text-gray-700 mb-1">
              Select a contact:
            </label>
            <select
              id="contact"
              className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              value={selectedContact2}
              onChange={(event)=>{
                console.log("ssddsd",event.target.value)
                setSelectedContact2(event.target.value)
              }}
            >
              <option  value=''>Select a contact</option>
              {
              ChatStore && ChatStore.contacts && ChatStore.contacts.length>0 ? (
                ChatStore.contacts.map((contact,index)=>(
                  <option key={index} value={contact.name}>{contact.name}</option>
                ))
              ): <p>No Contacts To display !</p>
            }
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="users" className="block font-medium text-gray-700">
              Select Users:
            </label>
            <select
              id="users"
              className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              multiple
              value={selectedUsers}
              onChange={handleUserChange}
            >
              {
                ChatStore && ChatStore.users && ChatStore.users.length>0 ? (
                  ChatStore.users.map((user,index)=>(
                    <option key={index}value={user.username}>{user.username}</option>
                  ))
                ): <p>No Users To display !</p>
              }
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={()=>setShowModal3(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
        )
      }
    </div>
  );
};

export default Home;
