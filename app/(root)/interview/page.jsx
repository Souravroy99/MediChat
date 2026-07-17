import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
 
  return (
    <>
      <h3>Talk to the Medical Chatbot</h3>
      <Agent 
        userName={user.name} 
        userId={user.id} 
        type="generate" />
    </>
  );
};

export default Page;
