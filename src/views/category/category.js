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
import CIcon from '@coreui/icons-react'
const fields = ["name", "slug", "parent","Action"];
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [parentId, setparentId] = useState([]);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    api.get("/categories").then((response) => {
      setCategories(response.data.categoryList);
    });
  };
  const categorySubmit = (evt) => {
    evt.preventDefault();
    const data = { name, parentId };
    api
      .post("/category/add", data)
      .then((res) => {
        setModal(!modal);
        getCategories();
      })
      .catch((err) => {});
  };
  const edit=(item)=> {
    setModal(!modal);
    console.log(item)
  }

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CButton color="primary" className="mb-3" onClick={toggle}>
            Add Category
          </CButton>
          <CModal show={modal} onClose={toggle}>
            <CModalHeader closeButton>Add a Category</CModalHeader>
            <CModalBody>
              <CForm
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
                onSubmit={categorySubmit}
              >
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">Category Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput
                      id="text-input"
                      name="Name"
                      placeholder="Category Name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="select">Parent Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      custom
                      name="parentId"
                      id="parentId"
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setparentId(e.target.value)}
                    >
                      <option value="DEFAULT" hidden disabled>
                        Select parent category
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
              <CButton type="submit" color="primary" onClick={categorySubmit}>
                Submit
              </CButton>
              <CButton color="secondary" onClick={toggle}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
          <CCard>
            <CCardHeader>Category List</CCardHeader>
            <CCardBody>
              <CDataTable
                items={categories}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  'parent': (item) =>
                    item.parent ? (
                      <td>
                        {item.parent.map((value, index) => {
                          return value.name;
                        })}
                      </td>
                    ) : (
                      <td>N/A</td>
                    ),
                    'Action': (item) =>(
                    <td> <CIcon name="cil-pencil" customClasses="action-icon"/> 
                    <CIcon name="cil-trash" customClasses="action-icon"/> </td>
                    ) 
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Category;
