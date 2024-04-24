'use client'

import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import s from './Table.module.scss';
import Modal from '../Modal/Modal';
import { getColumns, getTitles } from '@/utils/getters';

export interface Row {
  teacherCode: string;
  name: string;
  position: string;
  email: string;
  phone: string;
}

const Table = ({data, name, isMain = false}: {data: any, name: 'teachers' | 'disciplines' | 'publishingActivity', isMain?: boolean}) => {
      const [page, setPage] = useState(1);
      const [isModal, setIsModal] = useState(false);
      const pageSize = isMain && name !== 'teachers' ? 4 : 8;
      const titles = getTitles(name);
      const columns = getColumns(name);
      const [activeRow, setActiveRow] = useState<Row | null>(null);
      const [paginatedRows, setPaginatedRows] = useState<Row[]>([]);
    
      const handlePageChange = (newPage: number) => {
        setPage(newPage);
      };

      useEffect(() => {
        if (data?.slice) {
          setPaginatedRows(data.slice((page - 1) * pageSize, page * pageSize));
        }
      }, [data, page, pageSize])

  return (
    <div className={s.container}>
      {isMain && <h2 className={s.title}>{name}</h2>}
     {!isMain && <div className={s.header}>
         <button className={s.buttonAdd} onClick={() => setIsModal(true)}>Добавить</button>
     </div>}
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            {titles?.map((title) => <th key={title}>{title}</th>)}
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {paginatedRows?.map((row: any) => (
            <tr id={row.teacherCode} className={cn(s.tr, s.row)} key={row.teacherCode} onClick={() =>{setIsModal(true); setActiveRow(row)}}>
              {columns?.map((column: string) => (
                <td key={column}>{`${row[column]}`}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!isMain && <div className={s.buttonPagination}>
        <button className={s.previous} disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
        <p>{page}</p>
        <button className={s.next} disabled={paginatedRows?.length < pageSize} onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>}

      {isModal && <Modal isMain={isMain} activeRow={activeRow} name={name} setIsModal={setIsModal} setActiveRow={setActiveRow} />}
    </div>
  );
};

export default Table;