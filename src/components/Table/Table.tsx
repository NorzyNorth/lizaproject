'use client'

import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import s from './Table.module.scss';
import Modal from '../Modal/Modal';
import { getColumns, getTitles } from '@/utils/getters';
import check from '../../../public/assets/check.png';
import cross from '../../../public/assets/cross.png';
import arrowBack from '../../../public/assets/arrow-left.png';
import arrowNext from '../../../public/assets/arrow-right.png';
import Image from 'next/image';
import { formattedDate } from '@/utils/formattedData';

const Table = ({data, name, isMain = false, setSendedRequests}: {data: any, name: 'teachers' | 'disciplines' | 'publishingActivity', isMain?: boolean, setSendedRequests: any}) => {
      const [page, setPage] = useState(1);
      const [isModal, setIsModal] = useState(false);
      const pageSize = isMain && name !== 'teachers' ? 4 : 8;
      const titles = getTitles(name);
      const columns = getColumns(name);
      const [activeRow, setActiveRow] = useState<any>(null);
      const [paginatedRows, setPaginatedRows] = useState<any[]>([]);
      const [selectedDate, setSelectedDate] = useState(null);

      const handleDateChange = (date: any) => {
        setSelectedDate(date);
      };
    
      const handlePageChange = (newPage: number) => {
        setPage(newPage);
      };

      const getName = (name: string) => {
        if (name === 'teachers') {
          return 'Преподаватели';
        } else if (name === 'disciplines') {
          return 'Дисциплины';
        } else if (name === 'publishingActivity') {
          return 'Активность публикаций';
        }
      }

      useEffect(() => {
        if (data?.slice) {
          setPaginatedRows(data.slice((page - 1) * pageSize, page * pageSize));
        }
      }, [data, page, pageSize])

      useEffect(() => {
        setSelectedDate(activeRow?.editionDate || activeRow?.birthday);

      }, [activeRow])

  return (
    <div className={s.container}>
      {isMain && <h2 className={s.title}>{getName(name)}</h2>}
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
              {columns?.map((column: string) => {
                if (column === 'confirmed') {
                  return (
                    <td className={s.center} key={column}>{row[column] ? <Image src={check} alt="check" width={25} height={25} /> : <Image src={cross} alt="cross" width={25} height={25} />}</td>
                  )
                }
                if (column === 'editionDate' || column === 'birthday') {
                  return (
                    <td key={column}>{row[column] ? formattedDate(row[column]) : 'не указано'}</td>
                  )
                }
                return (
                <td key={column}>{`${row[column]}`}</td>
              )})}
            </tr>
          ))}
        </tbody>
      </table>
      {!isMain && <div className={s.buttonPagination}>
        <button className={s.previous} disabled={page === 1} onClick={() => handlePageChange(page - 1)}><Image src={arrowBack} alt='arrow-back' width={35} height={35} /></button>
        <p>{page}</p>
        <button className={s.next} disabled={paginatedRows?.length < pageSize} onClick={() => handlePageChange(page + 1)}><Image src={arrowNext} alt='arrow-next' width={35} height={35} /></button>
      </div>}

      {isModal && <Modal isMain={isMain} activeRow={activeRow} name={name} setIsModal={setIsModal} setActiveRow={setActiveRow} setSendedRequests={setSendedRequests} selectedDate={selectedDate} handleDateChange={handleDateChange} />}
    </div>
  );
};

export default Table;