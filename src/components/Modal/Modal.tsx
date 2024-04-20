import s from './Modal.module.scss';
import { Row } from "../Table/Table";
import close from '../../../public/close.png';
import Image from 'next/image';
import { useState } from 'react';
import { generateRandomTeacherData } from '@/utils/mockData';
import { getColumns, getTitles } from '@/utils/getters';

interface ModalProps {
  activeRow: any;
  name: 'teachers' | 'disciplines' | 'activity';
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveRow: React.Dispatch<React.SetStateAction<Row | null>>;
  isMain: boolean;
}

const Modal: React.FC<ModalProps> = ({activeRow, name, setIsModal, setActiveRow, isMain = false}) => {
  const titles: any = getTitles(name, true);
  const columns: any = getColumns(name, true);
  const [inputs, setInputs] = useState(titles?.map((title: string, index: number) => {
    return {
      id: index,
      title: title,
      value: activeRow ? activeRow[columns[index]] : '',
    }
  }))

  const getNewRow = (inputs: any[]) => {
    const newRow: any = {};
    
    if (inputs) {
      inputs.map((input, index) => {
        // if (input.title === 'teachersCode') {
        //   newRow['teacherCode'] = Math.random().toString(36).substring(7);
        // } else 
        if (columns[index] === 'birthday' || columns[index] === 'editionDate') {
          newRow[columns[index]] = new Date(input.value);
        } else if (columns[index] === 'jobDescription' || columns[index] === 'confirmed') {
          newRow[columns[index]] = !!input.value;
        } else {
          newRow[columns[index]] = input.value;
        }
      })
    }

    return newRow;
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRow = getNewRow(inputs.map((input: any) => input));
    
    if (!activeRow?.teacherCode) {

      // Добавить новый элемент в таблицу
      fetch(`/api/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      }).then((response) => console.log(response.json()))
    } else {

      // Изменить имеющийся элемент
      fetch(`/api/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      })
    }

    setIsModal(false);
    setActiveRow(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs: any) => {
      const newInputs = inputs.map((input: any) => {
        if (input.title === name) {
          return { ...input, value: value };
        }

        return input;
      });

      return newInputs;
    });
  }

  console.log(inputs)

  return (
    <>
      <div className={s.overlay} onClick={() => {
        setIsModal(false); 
        setActiveRow(null);
        }}></div>
      <div className={s.modal}>
          {activeRow?.teacherCode && <h2 className={s.title}>{inputs[1].value} {inputs[2].value} {inputs[3].value}</h2>}
          <form className={s.form} onSubmit={handleSubmit}>
            {/* input.title !== 'teacherCode' &&  */}
            {inputs?.map((input: any, index: string) => ( 
              <div key={input.id}>
                <label>
                  {input.title}
                </label>
                <input disabled={isMain} value={input.value} onChange={handleChange} name={input.title} placeholder={input.title} className={s.input} type="text" />
              </div>
            ))}
            
            {!isMain && <div className={s.buttons}>
              <button className={s.buttonDelete} onClick={() => {
                setIsModal(false); 
                setActiveRow(null);
              }}>{activeRow?.teacherCode ? 'Удалить': 'Отменить'}</button>
              <button className={s.buttonAdd}>{activeRow?.teacherCode ? 'Сохранить изменения' : 'Добавить'}</button>
            </div>}
          </form>
          <Image className={s.close} src={close} alt='close' onClick={() => {
            setIsModal(false); 
            setActiveRow(null);
          }} />
      </div>
    </>
  );
}

export default Modal;
