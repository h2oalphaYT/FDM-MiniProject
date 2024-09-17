import React, { useState } from "react";
import { Row, Col, Input, Button, Form, Typography, Select } from "antd";
import axios from "axios";
import { motion } from "framer-motion";

const { Title } = Typography;
const { Option } = Select;

export default function PredictInform() {
  const [formData, setFormData] = useState({
    year: "2020",
    make: "Toyota",
    model: "Corolla",
    trim: "LE",
    body: "Sedan",
    transmission: "Automatic",
    odometer: "50000",
    color: "White",
    interior: "Black",
    seller: "Dealership",
    mmr: "15000",
    saledate: "2023-08-15",
    condition: "Excellent", // Default value for condition
  });

  const [prediction, setPrediction] = useState(null);
  const [isCarMoving, setIsCarMoving] = useState(false);

  // Update formData when input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    setIsCarMoving(true);

    e.preventDefault();
    console.log(formData);
    // Send data to the backend API
    axios
      .post("http://127.0.0.1:5000/predict", [formData]) // Send formData to the backend
      .then((response) => {
        setPrediction(response.data.predictions[0]); // Set prediction from backend response
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    setTimeout(() => {
      setIsCarMoving(false);
    }, 1000);
  };

  const handleSelectChange = (value, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "#acbadb63",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Title
        level={3}
        style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}
      >
        Vehicle Price Prediction
      </Title>

      <Form layout="vertical" onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Year">
                  <Input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Make">
                  <Input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Model">
                  <Input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Trim">
                  <Input
                    type="text"
                    name="trim"
                    value={formData.trim}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Body">
                  <Input
                    type="text"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Transmission">
                  <Input
                    type="text"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Odometer">
                  <Input
                    type="text"
                    name="odometer"
                    value={formData.odometer}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Color">
                  <Select
                    name="color"
                    value={formData.color}
                    onChange={(value) => handleSelectChange(value, "color")}
                  >
                    <Option value="White">White</Option>
                    <Option value="Black">Black</Option>
                    <Option value="Red">Red</Option>
                    <Option value="Blue">Blue</Option>
                    <Option value="Silver">Silver</Option>
                    <Option value="Gray">Gray</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Interior">
                  <Input
                    type="text"
                    name="interior"
                    value={formData.interior}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Seller">
                  <Input
                    type="text"
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="MMR">
                  <Input
                    type="text"
                    name="mmr"
                    value={formData.mmr}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sale Date">
                  <Input
                    type="date"
                    name="saledate"
                    value={formData.saledate}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Condition">
                  <Input
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <motion.img
                src="/car.png"
                alt="Car Image"
                style={{ width: "100%", height: "auto" }}
                animate={isCarMoving ? { x: 200 } : { x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              />
            </Row>
            <Row>
              {prediction && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    backgroundColor: "#f6ffed",
                    border: "1px solid #b7eb8f",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <h2>
                    Predicted Selling Price: ${Number(prediction).toFixed(2)}
                  </h2>
                </motion.div>
              )}
            </Row>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={handleSubmit}
            style={{
              width: "170px",
              fontWeight: "bold",
              letterSpacing: "0.1rem",
            }}
          >
            Predict
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
}
