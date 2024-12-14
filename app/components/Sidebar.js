"use client";
import React from 'react'
import styles from "../../styles/Sidebar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation"; // To detect the active path
import DashboardIcon from '@mui/icons-material/Dashboard';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
  const pathname = usePathname(); // Hook to get the current route
  
  return (
    <div className={styles.sidebar}>
        <div className={styles.logo}><img src="/images/logoart.png" alt="logo" onClick={()=>{window.location.href = './'}}/></div>
        <nav>
            <ul>
                <li className={pathname === "/dashboard" ? styles.active : ""}>
                    <Link href="/dashboard">
                    <DashboardIcon fontSize={"medium"}/>
                    </Link>
                </li>
                <li className={pathname === "/dashboard/analytics" ? styles.active : ""}>
                    <Link href="/dashboard/analytics">
                    <SignalCellularAltIcon fontSize={"medium"}/>
                    </Link>
                </li>
                <li className={pathname === "/dashboard/integrate" ? styles.active : ""}>
                    <Link href="/dashboard/integrate">
                    <AddLinkIcon fontSize={"medium"}/>
                    </Link>
                </li>
                <li className={pathname === "/dashboard/settings" ? styles.active : ""}>
                    <Link href="/dashboard/settings">
                    <SettingsIcon fontSize={"medium"}/>
                    </Link>
                </li>
            </ul>
        </nav>

        <Link href="/" className={styles.logout}>
            <LogoutIcon fontSize={"medium"}/>
        </Link>
    </div>
  );
}

export default Sidebar;
