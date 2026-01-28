import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { ProductService } from './service/product-service';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
// import { DataView } from "primereact/dataview";
// import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";

interface User {
  id: string;
  username: string;
  ipAddress: string;
  image: string;
  count: string;
}

// import { ProductService } from './service/ProductService';

export const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [ui, setUi] = useState<boolean | null>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_API + "/users",
        );
        if (res.statusText === "OK") {
          const users = res.data;
          console.log(users);
          setUsers(users);
          console.log(users);
        } else {
          alert(res.data.Msg);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    console.log("selected user: ", selectedUser);
    selectedUser && navigate(`/${selectedUser.id}/gallery`);
  }, [selectedUser]);

  const handleListClick = () => {
    setUi(false);
  };

  const handleGalleryClick = () => {
    setUi(true);
  };

  const connectDetailPage = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div className="card">
        <div className="flex align-items-center justify-content-between">
          <div></div>
          <div className="flex pt-2 pb-2 align-right pr-8">
            <Button
              icon="pi pi-list"
              className="p-button-rounded"
              onClick={handleListClick}
            ></Button>
            <Button
              icon="pi pi-microsoft"
              className="p-button-rounded"
              onClick={handleGalleryClick}
            ></Button>
          </div>
        </div>
        {!ui ? (
          <DataTable
            className="table"
            value={users}
            selectionMode="single"
            selection={selectedUser!}
            onSelectionChange={(e) => setSelectedUser(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="id" header="Id"></Column>
            <Column
              // align={"center"}
              field="username"
              header="Username"
            ></Column>
            <Column
              // align={"center"}
              field="ipAddress"
              header="IpAddress"
            ></Column>
          </DataTable>
        ) : (
          <div className="card-mode">
            {users.map((user, index) => {
              return (
                <Card
                  title={user.username}
                  // subTitle={"images: " + user.count}
                  className="user-card"
                  key={index}
                  onClick={() => connectDetailPage(user)}
                >
                  {/* <div className="flex align-items-center justify-content-between">
                    <span className=""></span>
                    <span className="mr-1">{user.count}</span>
                  </div> */}
                  <div className="flex align-items-center justify-content-between">
                    <span className="m-0">{user.ipAddress}</span>
                    <span className="m-0">{"images: " + user.count}</span>
                    <span className="pi pi-chevron-right"></span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

// export const Admin1 = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const res = await axios.get(
//           process.env.REACT_APP_BACKEND_API + "/users",
//         );
//         if (res.statusText === "OK") {
//           const users = res.data;
//           console.log(users);
//           setUsers(users);
//           console.log(users);
//         } else {
//           alert(res.data.Msg);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getUsers();
//   }, []);

//   const itemTemplate = (user: User, index: number) => {
//     return (
//       <div className="col-12 pl-8 pr-8" key={user.id}>
//         <div
//           className={classNames(
//             "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
//             { "border-top-1 surface-border": index !== 0 },
//           )}
//         >
//           <img
//             className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
//             src={`/avatar.png`}
//             alt={user.username}
//           />
//           <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//             <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//               <div className="text-2xl font-bold text-900">{user.username}</div>
//               <div className="text-2xl font-bold text-900">
//                 {user.ipAddress}
//               </div>
//               <div className="flex align-items-center gap-3">
//                 <span className="flex align-items-center gap-2"></span>
//               </div>
//             </div>
//             <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//               <span className="text-xl font-semibold">view</span>
//               <Link to={`/${user.id}/gallery`}>
//                 <Button icon="pi pi-eye" className="p-button-rounded"></Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const listTemplate = (items: User[]) => {
//     if (!items || items.length === 0) return null;

//     let list = items.map((user, index) => {
//       return itemTemplate(user, index);
//     });

//     return <div className="grid grid-nogutter pt-8">{list}</div>;
//   };

//   return (
//     <div className="card">
//       <DataView value={users} listTemplate={listTemplate} />
//     </div>
//   );
// };

export default Admin;
