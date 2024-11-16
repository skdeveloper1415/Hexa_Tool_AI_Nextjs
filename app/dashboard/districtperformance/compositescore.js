"use client";

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

export default function CompositeScore(props) {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [metaKey, setMetaKey] = useState(true);
    const product = [
        {
          schooltype: 'East Africa',
          score: 53.4,
          totalschools: 209,
          nochange: 75,
          improving:88,
          decline:43
        },
        {
            schooltype: 'Egypt',
            score: 57.5,
            totalschools: 148,
            nochange: 60,
            improving:77,
            decline:11
          },
          {
            schooltype: 'FWN Africa',
            score: 52.1,
            totalschools: 32,
            nochange: 8,
            improving:5,
            decline:19
          },
          {
            schooltype: 'Kenya',
            score: 47.9,
            totalschools: 26,
            nochange: 7,
            improving:6,
            decline:13
          },
      
      ];
 


    return (
        <div className='customTable custpaginator subheade customTableChanges border-b'>
        <DataTable value={product} selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" metaKeySelection={metaKey} tableStyle={{ minWidth: '50rem' }}>
            <Column field="schooltype" sortable header="School Type"></Column>
            <Column field="score" sortable header="Score"></Column>
            <Column field="totalschools" sortable header="Total Schools"></Column>
            <Column field="nochange" sortable header="No Change"></Column>
            <Column field="improving" sortable header="Improving"></Column>
            <Column field="decline" sortable header="Decline"></Column>
        </DataTable>
        </div>
    );
}
             




