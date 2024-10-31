import React from "react";
import CInput from "./CInput"; // Import your CInput component
import { Table } from "react-bootstrap";

const DynamicTableFields = ({ headings, data, onChange }) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    {headings.map((heading, index) => (
                        <th key={index}>{heading.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {headings.map((heading, colIndex) => (
                                <td key={colIndex}>
                                    <CInput
                                        name={`${heading.attribute}-${rowIndex}`} // Unique name for each input
                                        type={heading.inputType} // Input type from headings
                                        value={item[heading.attribute]} // Current value
                                        onChange={(e) => onChange(e, rowIndex, heading.attribute)} // Handle change
                                        placeholder={`Enter ${heading.label.toLowerCase()}`}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={headings.length} className="text-center">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default DynamicTableFields;
