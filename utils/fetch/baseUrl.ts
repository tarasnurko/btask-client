const baseUrl =
  process.env.NEXT_PUBLIC_MODE === "dev"
    ? "http://127.0.0.1:8080/api"
    : "https://btask-server.vercel.app/api";

export { baseUrl };
