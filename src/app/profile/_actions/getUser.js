import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Users, Jobs } from "@/models";
import { getServerSession } from "next-auth";

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  const user = await Users.findOne(
    {
      email: session.user.email,
    },
    { password: 0 }
  ).populate({ path: "applications", model: Jobs });
  return user;
};
