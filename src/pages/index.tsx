import { useForm } from "react-hook-form";
import { Input, InputNumber, Select, Radio } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationsSchema } from "./validationForm";
import { useEffect } from "react";

const dataSelect = [
  {
    value: "1",
    label: "Um",
  },
  {
    value: "2",
    label: "Dois",
  },
];

const dataGenders = [
  { label: "Masculino", value: "male" },
  { label: "Feminino", value: "female" },
  { label: "Outro", value: "other" },
];

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ValidationsSchema),
  });

  useEffect(()=>{
    reset({
      name: 'diego',
      select: '1',
      age: '51',
      gender: ['other'],
    })
  },[])

  const handleOnSubmit = async (form) => {
    console.log("eee", form);
  };

  return (
    <div>
      <Input
        control={control}
        name="name"
        placeholder="Nome..."
        error={errors?.name && errors?.name?.message}
      />
      <Select
        control={control}
        options={dataSelect}
        name="select"
        error={errors?.select && errors?.select?.message}
      />
      <InputNumber
        control={control}
        name="age"
        placeholder="Idade..."
        error={errors?.age && errors?.age?.message}
      />
      <Radio
        name="gender"
        label="Gênero"
        options={dataGenders}
        control={control}
        error={errors?.gender && errors?.gender?.message}
      />

      <button onClick={handleSubmit(handleOnSubmit)}>Enviar</button>
    </div>
  );
};

export default Page;
