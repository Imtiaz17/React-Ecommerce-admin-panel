import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CInputFile,
  CSelect,
} from "@coreui/react";
import api from "../../axios";
const fields = ["name", "slug", "category", "createdAt", "updatedAt"];
const Brand = () => {
  const [brand, setBrand] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  useEffect(() => {
    getBrands();
    getCategories();
  }, []);
  const getCategories = () => {
    api.get("/categories").then((response) => {
      setCategories(response.data.categoryList);
    });
  };
  const getBrands = () => {
    api.get("/brands").then((response) => {
      setBrand(response.data.brands);
    });
  };
  const brandSubmit = (evt) => {
    evt.preventDefault();
    const data = { name, category };
    api
      .post("/brand/add", data)
      .then((res) => {
        setModal(!modal);
        getBrands();
      })
      .catch((err) => {});
  };

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CButton color="primary" className="mb-3" onClick={toggle}>
            Add Brand
          </CButton>
          <CModal show={modal} onClose={toggle}>
            <CModalHeader closeButton>Add a brand</CModalHeader>
            <CModalBody>
              <CForm
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
                onSubmit={brandSubmit}
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Brand Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="Name"
                      placeholder="Brand Name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="DEFAULT" hidden disabled>
                        Please select
                      </option>
                      {categories.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col md="3" htmlFor="file-input">
                    File input
                  </CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="file-input" />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" color="primary" onClick={brandSubmit}>
                Submit
              </CButton>
              <CButton color="secondary" onClick={toggle}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
          <CCard>
            <CCardHeader>Brand List</CCardHeader>
            <CCardBody>
              <CDataTable
                items={brand}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  category: (item) => (
                    <td>
                      {item.category.map((value, index) => {
                        return value.name;
                      })}
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Brand;
