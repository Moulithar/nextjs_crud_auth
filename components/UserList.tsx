import { deleteUser } from "@/app/actions/userAction";
import { User } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import AddUserDialog from "./AddUserDialog";

function UserList({ users }: { users: User[] }) {
  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between border-b"
        >
          <div className="flex items-center gap-2">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <div className="flex items-center gap-2">
            <AddUserDialog isEdit={true} user={user} />
            <form action={deleteUser}>
              <button
                type="submit"
                name="id"
                value={user.id}
                className="hover:text-red-500 cursor-pointer"
              >
                <Trash2Icon className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
