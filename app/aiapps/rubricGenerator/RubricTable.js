import React from 'react';

const RubricTable = ({ rubricData }) => {
  // Function to convert the rubric data into HTML table format
  const generateRubricTable = (data) => {
    // Split the result into rows based on newline characters
    let rows = data.split('\n').filter(row => row.trim() !== '');

    // Create table header (thead)
    const headersTitle = rows[0].split('|').filter(cell => cell.trim() !== '').slice(0,1).map(header => (
      <th key={header.trim()}>{header.trim().replace(/\*/g, '')}</th>
    ));

    const headers = rows[0].split('|').filter(cell => cell.trim() !== '').slice(0,25).map(header => (
      <th key={header.trim()}>{header.trim().replace(/\*/g, '')}</th>
    ));
    rows=rows.filter((ele, index)=>index!=1)
    // Create table body (tbody)
    const bodyRows = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split('|').filter(cell => cell.trim() !== '');
      const cells = row.map((cell, index) => (
        <td style={{wordWrap:' break-word'}} key={index}>{cell.trim()}</td>
      ));
      bodyRows.push(<tr key={i}>{cells}</tr>);
    }

    // Return the complete table structure
    return (
      <>
      {/* <div>{headersTitle}</div> */}
      <br/>
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {bodyRows}
        </tbody>
      </table>
      </>
    );
  };

  return (
    <div id="rubricTableContainer">
      {generateRubricTable(rubricData)}
    </div>
  );
};

export default RubricTable;
