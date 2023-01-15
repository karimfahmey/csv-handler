import React, { useState } from "react";
import Papa from "papaparse";
import "./UploadFile.css";
import Table from "react-bootstrap/Table";

const UploadFile = () => {
  //State to store the values
  const [name, setName] = useState([]);
  const [brand, setBrand] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
      
        let nameList = [];
        results.data.forEach(item => {
          let indexOf = nameList.findIndex(x => Object.keys(x)[0] === item.Name);
          if (indexOf !== -1) {
            nameList[indexOf][item.Name] = nameList[indexOf][item.Name] + 1;
          } else {
            let innerObj = {};
            innerObj[item.Name] = (innerObj[item.Name] || 0) + 1;
            nameList.push(innerObj);
          }
        });
        console.log(nameList, 'brandCountbrandCountbrandCount');

        let brandList = [];
        results.data.forEach(item => {
          let indexOf = brandList.findIndex(x => Object.keys(x)[0] === item.Brand);
          if (indexOf !== -1) {
            brandList[indexOf][item.Brand] = brandList[indexOf][item.Brand] + 1;
          } else {
            let innerObj = {};
            innerObj[item.Brand] = (innerObj[item.Brand] || 0) + 1;
            brandList.push(innerObj);
          }
        });
        
        
        setName(nameList);
        setBrand(brandList);
      },
    });
  };
  
  return (
    <section className="section-wrapper">
      <div className="container">
        <div className="row">
          <div className="form-wrapper">
            <label htmlFor="csvInput"> Enter CSV File </label>
            <input
              onChange={changeHandler}
              id="csvInput"
              accept=".csv"
              name="file"
              type="File"
            />
          </div>
          <div className="content-wrapper mt-3">
            {name != '' &&
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Item Count</th>
                  </tr>
                </thead>
                <tbody>
                    {name.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{Object.keys(item) && Object.keys(item)[0]}</td>
                          <td>{Object.values(item) && Object.values(item)[0]}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            }            
          </div>
          <div className="content-wrapper mt-3">
            {brand != '' && 
              <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Item Count</th>
                </tr>
              </thead>
              <tbody>
                  {brand.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{Object.keys(item) && Object.keys(item)[0]}</td>
                        <td>{Object.values(item) && Object.values(item)[0]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

UploadFile.propTypes = {};

export default UploadFile;
