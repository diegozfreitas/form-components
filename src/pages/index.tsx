import { useForm } from "react-hook-form";
import { Select } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";

const data = [
  {
    value: "1",
    label: "Um",
  },
  {
    value: "2",
    label: "Dois",
  },
];

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    //resolver: yupResolver({}),
  });

  return (
    <div>
      <input type="text" name="name" placeholder="Nome..." />
      <Select control={control} options={data} name="select" />
    </div>
  );
};

export default Page;
