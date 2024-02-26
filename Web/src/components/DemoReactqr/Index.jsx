import { useQuery } from "@tanstack/react-query";

const fetchtAPI = async () => {
  const data = await fetch("http://localhost:3000/products");
  return data.json();
};

const Index = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchtAPI,
  });
  if (isPending) return "Loading...";
  if (error) return `Error fetching data: ${error.message}`;

  return (
    <div>
      {data?.data.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Index;
