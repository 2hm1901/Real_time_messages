import { LockClosedIcon, LockOpenIcon, ShieldCheckIcon, UserIcon, EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import {Menu, Transition, MenuItems, MenuButton} from "@headlessui/react";
import axios from "axios";
import { Fragment } from "react";

export default function UserOptionsDropdown({conversation}){
    const changeUserRole = () => {
        if (!conversation.is_user){
            return;
        }

        axios
            .post(route("user.changeRole", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    const onBlockUser = () => {
        if (!conversation.is_user){
            return;
        }

        axios
            .post(route("user.blockUnblock", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                    </MenuButton>
                </div>
                <Transition
                    as={Fragment}
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems class="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                        <div className="px-1 py-1">
                            <MenuItems>
                                {({ active }) => (
                                    <button
                                        onClick={onBlockUser}
                                        className={`${
                                            active
                                                ? "bg-black/30 text-white"
                                                : "text-gray-100"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                    {conversation.blocked_at && (
                                        <>
                                            <LockOpenIcon className="w-4 h-4 mr-2" />
                                            Unblocked User
                                        </>
                                    )}
                                    {!conversation.blocked_at && (
                                        <>
                                            <LockClosedIcon className="w-4 h-4 mr-2" />  
                                            Block User
                                        </>
                                    )}
                                    </button>
                                )}
                            </MenuItems>
                        </div>
                        <div className="px-1 py-1">
                            <MenuItems>
                                {({ active }) => (
                                    <button
                                        onClick={changeUserRole}
                                        className={`${
                                            active
                                                ? "bg-black/30 text-white"
                                                : "text-gray-100"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                    {conversation.is_admin && (
                                        <>
                                            <UserIcon className="w-4 h-4 mr-2" />
                                            Make Regular User
                                        </>
                                    )}
                                    {!conversation.is_admin && (
                                        <>
                                            <ShieldCheckIcon className="w-4 h-4 mr-2" />  
                                            Make Admin
                                        </>
                                    )}
                                    </button>
                                )}
                            </MenuItems>
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    );
}