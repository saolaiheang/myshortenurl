
import { useState, useEffect } from "react";
import { FaLink, FaUserCircle, FaPencilAlt, FaHeadset } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [role, setRole] = useState(null); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = localStorage.getItem('role'); // Example: 'admin' or 'user'
      setRole(userRole);
    };
    fetchUserRole();
  }, []);


  const Menus = [
    { title: "Shortens Links", icon: <FaLink size={35} />, gap: false, path: "/shortenurls" },
    { title: "Profile Acc", icon: <FaUserCircle size={35} />, gap: true, path: "/profile" },
    { title: "Custom Aliases", icon: <FaPencilAlt size={35} />, gap: true, path: "/customalaises" },
  ];

 
  const adminMenus = [
    { title: "Admin Report", icon: <FaHeadset size={35} />, gap: true, path: "/adminreport" },
    { title: "Dash Boards", icon: <MdDashboard size={35} />, gap: true, path: "/dashboard" },
  ];

  return (
    <div className="flex">
      <div className={`${open ? "w-72 px-10 h-auto" : "w-20 p-2 h-auto"} bg-slate-200 h-screen pt-8 relative duration-300`}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQ34x-FzmkmTADmbNeHmQ74N097sBj5p7iw&s"
          className={`absolute cursor-pointer -right-3 top-12 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle Sidebar"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="https://media.licdn.com/dms/image/v2/C560BAQE55kHfjFuzlg/company-logo_200_200/company-logo_200_200/0/1631377740362?e=2147483647&v=beta&t=lwTHSGTyiLNCxcgBP36R49o1XEATmojFUK8g27vK0BY"
            className={`rounded-full w-12 sm:w-14 ${open && "rotate-[360deg]"}`}
            alt="BiKay Logo"
          />
          <h1 className={`text-black origin-left font-medium text-[25px] duration-200 ${!open && "scale-0"}`}>PBSL</h1>
        </div>
        <ul className="pt-6">
          
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-4 cursor-pointer text-black text-base items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"} 
                ${location.pathname === Menu.path ? "bg-violet-200 text-black" : ""} 
                `}
              onClick={() => navigate(Menu.path)} // Navigate to the specified path
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
            </li>
          ))}

         
          {role === 'admin' && adminMenus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-4 cursor-pointer text-black text-base items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"} 
                ${location.pathname === Menu.path ? "bg-violet-200 text-black" : ""} 
               `}
              onClick={() => navigate(Menu.path)} // Navigate to the specified path
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
