import { Table } from "antd";
import { useProducts } from "../../store";
import { useEffect } from "react";
import {
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useNavigate} from "react-router-dom";
import style from "./Table.module.css";
import { Button } from "antd";

function TableHead() {
  const navigate = useNavigate();
  const { products, toggleLike, filterLiked, toggleFilterLiked } =
    useProducts();

  const filteredProducts = filterLiked
    ? products.filter((product) => product.liked)
    : products;

  const columns = [
    {
      title: "Count",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (url) => (
        <img
          src={url}
          alt="Product"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          {record.liked ? (
            <HeartFilled
              className={style.like}
              onClick={(e) => handleLike(e, record.id)}
            />
          ) : (
            <HeartOutlined
              className={style.like}
              onClick={(e) => handleLike(e, record.id)}
            />
          )}
          <DeleteOutlined
            className={style.delete}
            onClick={(e) => handleDelete(e, record.id)}
          />
        </div>
      ),
    },
  ];

  const fetchProducts = useProducts((state) => state.fetchProducts);
  const deleteProduct = useProducts((state) => state.deleteProduct);


  const handleLike = (e, id) => {
    e.stopPropagation();
    toggleLike(id);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteProduct(id);
  };

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  return (
    <div>
      <Button onClick={toggleFilterLiked} style={{ marginBottom: 20 }}>
        {filterLiked ? "Показать все" : "Показать избранное"}
      </Button>

      <Table
        rowKey="id"
        rowHoverable={false}
        dataSource={filteredProducts}
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            navigate(`/ProductForm/${record.id}`);
          },
        })}
      />
    </div>
  );
}

export default TableHead;
