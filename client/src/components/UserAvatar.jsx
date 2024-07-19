import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";
import { logout } from "../slices/authSlice"; // Import the logout action
import ChangePasswordDialog from "./ChangePasswordDialogue"; // Import the ChangePasswordDialog component
import pp from "../assets/img3.gif";

const UserAvatar = () => {
  const [openProfile, setOpenProfile] = useState(false); // State for Profile box
  const [openPassword, setOpenPassword] = useState(false); // State for Change Password dialog
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = `${user.firstName} ${user.lastName}`;
  const initials = getInitials(userName);

  const logoutHandler = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/log-in"); // Redirect to login page
  };

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-blue-600">
              <span className="text-white font-semibold">{initials}</span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
              <div className="p-4">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenProfile(true)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUser className="mr-2" aria-hidden="true" />
                      Profile
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)} // Open Change Password dialog
                      className={`${
                        active ? "bg-gray-100" : ""
                      } text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUserLock className="mr-2" aria-hidden="true" />
                      Change Password
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className="mr-2" aria-hidden="true" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Profile Box */}
{openProfile && (
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="px-6 py-4">
          <div className="text-2xl font-bold mb-4 text-center">Profile Details</div>
          <div className="flex flex-col items-center mb-4">
            <img src={pp} alt="Profile Picture" className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-lg font-bold">{userName}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">First Name:</label>
              <p className="text-gray-600">{user.firstName}</p>
            </div>
            <div>
              <label className="block text-gray-700">Last Name:</label>
              <p className="text-gray-600">{user.lastName}</p>
            </div>
            <div>
              <label className="block text-gray-700">Role:</label>
              <p className="text-gray-600">{user.role}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => setOpenProfile(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Change Password Dialog */}
      <ChangePasswordDialog isOpen={openPassword} setIsOpen={setOpenPassword} user={user} />
    </>
  );
};

export default UserAvatar;
