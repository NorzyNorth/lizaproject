'use client'

import React, { useState } from 'react';
import cn from 'classnames';

import s from './Table.module.scss';
import Modal from '../Modal/Modal';

export interface Row {
  teacherCode: string;
  name: string;
  position: string;
  email: string;
  phone: string;
}

const Table = ({data, name, isMain = false}: {data: any, name: 'teachers' | 'disciplines' | 'activity', isMain?: boolean}) => {
    const [rows, setRows] = useState<Row[]>([
        { teacherCode: '1', name: 'ФИО 1', position: 'Value 2', email: 'Value 3', phone: 'Value 4' },
        // { id: '2', col1: 'ФИО 1', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '3', col1: 'ФИО 1', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '4', col1: 'ФИО 2', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '5', col1: 'ФИО 1', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '6', col1: 'Value 1', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '7', col1: 'Value 1', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '8', col1: 'Value 3', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '9', col1: 'Value 1', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '10', col1: 'Value 1', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '11', col1: 'Value 1', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
        // { id: '12', col1: 'Value 4', col2: 'Value 2', col3: 'Value 3', col4: 'Value 4', col5: 'Value 5' },
      ]);
      const [page, setPage] = useState(1);
      const [isModal, setIsModal] = useState(false);
      const pageSize = isMain && name !== 'teachers' ? 4 : 8;
      const titles = isMain ? ['ФИО', 'Должность', 'E-mail', 'Телефон'].slice(0,3) : ['ФИО', 'Должность', 'E-mail', 'Телефон'];
      const [columns, setColumns] = useState(isMain ? Object.keys((rows[0])).slice(1).slice(0,3) : Object.keys((rows[0])).slice(1));
      const [activeRow, setActiveRow] = useState<Row | null>(null);

      console.log(data, columns);
    
      const handlePageChange = (newPage: number) => {
        setPage(newPage);
      };
    
      const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div className={s.container}>
      {isMain && <h2 className={s.title}>{name}</h2>}
     {!isMain && <div className={s.header}>
         <button className={s.buttonAdd} onClick={() => setIsModal(true)}>Добавить</button>
     </div>}
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            {titles.map((title) => <th key={title}>{title}</th>)}
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {paginatedRows.map((row: any) => (
            <tr id={row.teacherCode} className={cn(s.tr, s.row)} key={row.teacherCode} onClick={() =>{setIsModal(true); setActiveRow(row)}}>
              {columns.map((column: string) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!isMain && <div className={s.buttonPagination}>
        <button className={s.previous} disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
        <p>{page}</p>
        <button className={s.next} disabled={paginatedRows.length < pageSize} onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>}

      {isModal && <Modal isMain={isMain} activeRow={activeRow} name={name} setIsModal={setIsModal} titles={titles} columns={columns} setActiveRow={setActiveRow} />}
    </div>
  );
};

export default Table;