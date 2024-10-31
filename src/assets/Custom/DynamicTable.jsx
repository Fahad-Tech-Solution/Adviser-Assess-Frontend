import React from "react";
import { Table } from "react-bootstrap";

const DynamicTable = ({ headings, data }) => {

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
                    data.map((item, index) => (
                        <tr key={index}>
                            {headings.map((heading, hIndex) => (
                                <td key={hIndex}>{item[heading.attribute]}</td>
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

export default DynamicTable;
