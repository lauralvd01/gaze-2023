import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Profile({ user }) {
  return (
    <div>
      <div>Hello {user.name}</div>
      <button onClick={() => console.log(user)}>user</button>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
