import { useForm } from "react-hook-form";
import { Input, Select } from "../components";
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

  const handleOnSubmit = async (form) => {
    console.log("eee", form);
  };

  return (
    <div>
      <Input control={control} name="name" placeholder="Nome..." isFirst />
      <Select control={control} options={data} name="select" />

      <button onClick={handleSubmit(handleOnSubmit)}>Enviar</button>
    </div>
  );
};

export default Page;
