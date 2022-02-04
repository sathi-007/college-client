import React from 'react';
import XLSX from 'xlsx';
import { useState } from "react";

export default function UpdateDetails(){

    const [file,setFile] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(file);
        readFile(file)
    }

    function onFileChange(e) {
        e.stopPropagation();
        e.preventDefault();
        var mFile = e.target.files[0];
        console.log(mFile);
        setFile(mFile);
      }

   function readFile(fileObj) {
        var name = fileObj.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
          // evt = on_file_select event
          /* Parse data */
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          /* Update state */
          console.log("Data>>>" + data);// shows that excel data is read
          console.log(convertToJson(data)); // shows data in json format
        };
        reader.readAsBinaryString(fileObj);
    }


    function convertToJson(csv) {
        var lines = csv.split("\n");
    
        var result = [];
    
        var headers = lines[0].split(",");
    
        for (var i = 1; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(",");
    
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
    
          result.push(obj);
        }
    
        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
    }


    return (
        <form onSubmit={handleSubmit}>
          <label>Enter your name:
          <input
            id="upload"
            type="file" 
            name="username" 
            onChange={onFileChange.bind(this)}
          />
          </label>
            <input type="submit" />
        </form>
      )
};