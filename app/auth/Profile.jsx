import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SignOut } from "./sign-in/page";
import Image from "next/image";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  //   const getProfile = async () => {
  //   };
  //   getProfile();
  console.log(session);
  

  return (
    <div className="bg-red-400">
      <div>
        {session ? (
          <div>
            <p>
              Welcome, {session?.user?.name}! <br />
              You are logged in.
            </p>
            <Image src={session?.user?.image} alt="" width={100} height={100} className="object-cover rounded-full" />
            <SignOut />
          </div>
        ) : (
          <div>
            <p>You are not logged in.</p>
          </div>
        )}
      </div>
    </div>
  );
}
