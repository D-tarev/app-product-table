import TableHead from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { Header } from "antd/es/layout/layout";
import { Divider } from "antd";
import { Button } from "antd";



function Head() {

  const navigate = useNavigate();
  return (
    <>
      <Header
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={() => navigate('/ProductForm')}> Добавить продукт</Button>
      </Header>
      <Divider />
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <TableHead />
        </Col>
      </Row>
    </>
  );
}

export default Head;
