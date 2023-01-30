import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useState } from "react";

const useGoogleSession = () => {
  const [isPending2, setIsPending2] = useState(false);
  const [error2, setError] = useState("");

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const google = async () => {
    setError("");
    setIsPending2(true);

    await signInWithRedirect(auth, provider)
      .then(() => {
        setIsPending2(false);
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: useGithubSession.tsx ~ line 19 ~ awaitsignInWithRedirect ~ err.message",
          err.message
        );
        setError(err.message);
        setIsPending2(false);
      });
  };

  return { google, isPending2, error2 };
};

export default useGoogleSession;
