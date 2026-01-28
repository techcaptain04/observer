
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';

export default function RouterDemo() {
    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/',
        },
        // {
        //     label: 'logout',
        //     icon: 'pi pi-sign-out',
        //     command: () => {
        //         localStorage.clear();
        //         window.location.href = "/";
        //     }
        // },
    ];

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };
    
    const end = (
        <div>
            <div className="flex align-items-center gap-2 pr-8">
                <Button icon="pi pi-sign-out" className="" label='Logout' onClick={handleLogout} />
            </div>
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} end={end} />
        </div>
    )
}
        