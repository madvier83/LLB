import React from "react";


export default function Input({ name, value, type, change }) {
    return <div class="mb-4"> <input type={type} name={name} value={value} onChange={change} className="form-control" required  ></input></div>
}