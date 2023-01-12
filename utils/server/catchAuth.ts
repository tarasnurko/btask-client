import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { AxiosError } from "axios";

export const catchAuth = async <T = unknown>(
  context: GetServerSidePropsContext,
  callback?: (jwt: string) => Promise<T>
): Promise<GetServerSidePropsResult<T>> => {
  try {
    const jwt = context.req.cookies?.jwt;

    if (!jwt) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    if (!callback) {
      return {
        props: {} as T,
      };
    }

    return {
      props: await callback(jwt),
    };
  } catch (err: unknown) {
    if (
      err instanceof AxiosError &&
      err.response &&
      err.response.data.statusCode === 401
    ) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    return {
      notFound: true,
    };
  }
};
