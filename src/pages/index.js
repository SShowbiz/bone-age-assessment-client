import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import axios from "axios"
import styled from "styled-components"
import { Modal, Button, Form, Spinner } from "react-bootstrap"

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

// axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.baseURL = "https://bone-age-assessment-server.herokuapp.com"

const IndexPage = () => {
  const [boneAge, setBoneAge] = useState(null)
  const [show, setShow] = useState(false)
  const [formColor, setFormColor] = useState("black")
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = e => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.post("/api/v1/predict/", {
          dataUrl: reader.result,
        })
        setBoneAge(data.predicted_bone_age)
        setShow(true)
        setFormColor("green")
      } catch (err) {
        setBoneAge(null)
        setFormColor("red")
      } finally {
        setIsLoading(false)
      }
    }
    e.target.value = ""
  }

  const handleClose = () => setShow(false)
  console.log(isLoading)
  return (
    <Layout>
      <SEO title="Home" />
      <Div>
        <Form style={{ height: "100%" }}>
          <Div className="mb-3">
            <div>
              {/* <Form.Label style={{ "text-align": "center" }}>
                <b>골 연령 판독기</b>
              </Form.Label> */}
              <Form.File
                id="formcheck-api-custom"
                custom
                style={{ "max-height": "50%" }}
              >
                {!isLoading && (
                  <div>
                    <Form.File.Input isValid onChange={handleImageChange} />
                    <Form.File.Label
                      data-browse="선택"
                      style={{ "border-color": formColor }}
                    >
                      X-RAY 이미지를 업로드 해주세요.
                    </Form.File.Label>
                    {formColor !== "black" && (
                      <Form.Control.Feedback
                        type="valid"
                        style={{ color: formColor }}
                      >
                        골연령 판독에 {boneAge ? "성공" : "실패"}했습니다.
                      </Form.Control.Feedback>
                    )}
                  </div>
                )}
                {isLoading && (
                  <Div style={{ height: `calc(1.5em + 0.75rem + 2px)` }}>
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </Div>
                )}
              </Form.File>
            </div>
          </Div>
        </Form>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>골 연령 판독 결과</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            당신의 골 연령은 {Math.round(boneAge * 100) / 100} 세 입니다.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </Div>
    </Layout>
  )
}

export default IndexPage
