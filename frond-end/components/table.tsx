import React from 'react';

interface TableProps {
  data: string[][];
  label: string;
}

const SimpleTable: React.FC<TableProps> = ({ data, label }) => {
  return (
    <table border={1} style={{ width: '100%', textAlign: 'center' }}>
      <thead>
        <tr>
          <th>{label}</th>
          <th>Password</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;
