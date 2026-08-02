import AddUserDialog from "@/components/AddUserDialog";
import UserList from "@/components/UserList";
import { prisma } from "@/lib/prisma";

async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div className="container mx-auto p-4">
      <h1>Users</h1>
      <UserList users={users} />
      <div className="flex justify-center">
        <AddUserDialog isEdit={false} user={null} />
      </div>
    </div>
  );
}

export default Home;
