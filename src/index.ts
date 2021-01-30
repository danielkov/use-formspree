import { FormEvent, useCallback, useState } from "react";

type Config = { reset?: boolean };

const useFormSpree = (url: string, { reset = false }: Config = {}) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    response: null,
  });
  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const body = new FormData(event.currentTarget);
      setState(() => ({ response: null, error: null, loading: true }));
      try {
        const response = await fetch(url, {
          method: "POST",
          body,
          mode: "no-cors",
        });
        const { status } = response;
        const json = await response.json();
        if (status < 300) {
          setState(() => ({ error: null, loading: false, response }));
        } else {
          const error =
            json.errors || json || new Error("Something went wrong");
          setState(() => ({
            error,
            loading: false,
            response: null,
          }));
        }
      } catch (error) {
        setState(() => ({ response: null, loading: false, error }));
      }
      if (reset) {
        event.currentTarget.reset();
      }
    },
    [url]
  );

  const bind = { onSubmit };

  return [state, bind] as const;
};

export default useFormSpree;
