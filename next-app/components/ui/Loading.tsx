import Spinner from "./Spinner";

interface LoadingProps {
  text?: string;
}

export default function Loading({
  text = "Loading...",
}: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <Spinner />
      <p className="text-gray-500">{text}</p>
    </div>
  );
}