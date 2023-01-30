import { getAuth, GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { useState } from "react";

const useGithubSession = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();
  const provider = new GithubAuthProvider();

  const github = async () => {
    setError("");
    setIsPending(true);

    await signInWithRedirect(auth, provider)
      .then(() => {
        setIsPending(false);
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: useGithubSession.tsx ~ line 19 ~ awaitsignInWithRedirect ~ err.message ",
          err.message
        );
        setError(err.message);
        setIsPending(false);
      });
  };

  return { github, isPending, error };
};

export default useGithubSession;
