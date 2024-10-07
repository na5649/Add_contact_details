import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContacts from "./components/AddAndUpdateContacts";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { onClose, onOpen, isOpen } = useDisclouse();



  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

   const filterContacts = (e) => {
     const value = e.target.value;

     const contactsRef = collection(db, "contacts");

     onSnapshot(contactsRef, (snapshot) => {
       const contactLists = snapshot.docs.map((doc) => {
         return {
           id: doc.id,
           ...doc.data(),
         };
       });
       const filteredContacts = contactLists.filter((contact) =>
         contact.name.toLowerCase().includes(value.toLowerCase())
       );

       setContacts(filteredContacts);
       return filteredContacts;
     });
   };

  return (
    <>
      <div className="mx-auto  max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              type="text"
              onChange={filterContacts}
              className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-9"
            />
          </div>

          <FaPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact/>
          ) : (
            contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
          )}
          
        </div>
      </div>
      <AddAndUpdateContacts isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
