import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Users } from "@/models";
import { getServerSession } from "next-auth";

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  const user = await Users.findOne(
    {
      email: session.user.email,
    },
    { password: 0 }
  );
  return user;
};
