import { Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../store";
import { PropTypes } from "prop-types";
import style from "./ProductForm.module.css";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Form } from "antd";

ProductForm.propTypes = {
  isCreate: PropTypes.bool,
};
function ProductForm(props) {
  const addProduct = useProducts((state) => state.addProduct);
  const { id } = useParams();
  const products = useProducts((state) => state.products);
  const product = products.find((prod) => prod.id === id);
  const navigate = useNavigate();

  const {
    register,

    formState: { errors },
    handleSubmit,
  } = useForm({
    // defaultValues: async () => {
    //   const res = props.isCreate ? {} : await getProductById(prodId);

    //   return {
    //     packCount: res.packsNumber,
    //     typePack: res.packageType,
    //     isArchived: res.isArchived,
    //     description: res.description,
    //   };
    // },
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    console.log(data);
    if (props.isCreate) {
      const newProduct = {
        id: nanoid(),
        quantity: data.packCount || "1",
        brand: data.description || "Без описания",
        imgUrl: "https://via.placeholder.com/50",
        liked: false,
      };
      addProduct(newProduct);
      navigate("/Head");
    }
  };

  return (
    <div>
      {!props.isCreate && (
        <Card
          className={style.card}
          style={{ width: "400px", height: "450px" }}
          cover={
            <img
              alt="example"
              src={product.imgLargeUrl}
              style={{ objectFit: "contain", height: 200 }}
            />
          }
        >
          <p>{product.brand}</p>
          <p>{product.categories}</p>
        </Card>
      )}
      {props.isCreate && (
        <div>
          <div className={style.pic}></div>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "400px", margin: "0 auto" }}
          >
           
            <label>
              Кол-во пачек<span>*</span>
            </label>
            <input
              {...register("packCount", {
                required: "Введите число",
              })}
              type="number"
            />
            {errors?.packCount && (
              <div style={{ color: "red" }}>{errors?.packCount?.message}</div>
            )}

            <label>Описание</label>
            <input
              {...register("description", {
                required: "Введите описание продукта",
              })}
              type="text"
            />
            {errors?.description && (
              <div style={{ color: "red" }}>{errors?.description?.message}</div>
            )}

            <Button onClick={handleSubmit(onSubmit)}>Создать</Button>
          </Form>
        </div>
      )}
      <Button
        className={style.home}
        onClick={() => {
          navigate("/Head");
        }}
      >
        Go home
      </Button>
    </div>
  );
}

export default ProductForm;
