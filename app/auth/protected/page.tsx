// app/protected/page.tsx
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const ProtectedPage = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);

  return <div>Protected Content</div>;
};

export default ProtectedPage;
