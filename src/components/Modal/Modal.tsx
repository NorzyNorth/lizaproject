import s from './Modal.module.scss';
import close from '../../../public/close.png';
import Image from 'next/image';
import { useState } from 'react';
import { getColumns, getTitles } from '@/utils/getters';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ModalProps {
  activeRow: any;
  name: 'teachers' | 'disciplines' | 'publishingActivity' | 'teachingLoad';
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveRow: React.Dispatch<React.SetStateAction<any | null>>;
  isMain: boolean;
  setSendedRequests: any;
  handleDateChange: any;
  selectedDate: any;
}

const Modal: React.FC<ModalProps> = ({activeRow, name, setIsModal, setActiveRow, isMain = false, setSendedRequests, handleDateChange, selectedDate}) => {
  const titles: any = getTitles(name, true);
  const columns: any = getColumns(name, true);
  const [inputs, setInputs] = useState(titles?.map((title: string, index: number) => {
    return {
      id: index,
      title: title,
      value: activeRow ? activeRow[columns[index]] : '',
    }
  }))
  const isCode = activeRow?.teacherCode || activeRow?.disciplineCode || activeRow?.editionCode || activeRow?.id;

  const getNewRow = (inputs: any[]) => {
    const newRow: any = {};
    
    if (inputs) {
      console.log(inputs);
      inputs.map((input, index) => {
        console.log(columns, columns[index], newRow[columns[index]])
          if (columns[index] === 'birthday' || columns[index] === 'editionDate') {
            newRow[columns[index]] = new Date(selectedDate);
          } else if (columns[index] === 'jobDescription') {
            newRow[columns[index]] = !!input.value;
          } else if (columns[index] === 'confirmed') {
            console.log('123')
            newRow[columns[index]] = false;
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
    
    if (!isCode) {

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
    setSendedRequests((value: number) => value + 1)
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

  const getInput = (input: any) => {
    if (input.title === 'дата издания' || input.title === 'дата рождения') {
      return <div><DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Выберите дату"
            className={s.input}
            disabled={isMain}
          /></div>;
    } else if (input.title !== 'подтверждение') {
      return <input disabled={isMain} value={input.value} onChange={handleChange} name={input.title} placeholder={input.title} className={s.input} type="text" />
    }
  }

  return (
    <>
      <div className={s.overlay} onClick={() => {
        setIsModal(false); 
        setActiveRow(null);
        }}></div>
      <div className={s.modal}>
          {activeRow?.teacherCode && <h2 className={s.title}>{inputs[1].value} {inputs[2].value} {inputs[3].value}</h2>}
          <form className={s.form} onSubmit={handleSubmit}>
            {inputs?.map((input: any, index: string) => ( 
              <div key={input.id}>
                <label className={s.inputTitle}>
                  {input.title !== 'подтверждение' && input.title}
                </label>
                {getInput(input)}
              </div>
            ))}
            
            {!isMain && <div className={s.buttons}>
              <button className={s.buttonDelete} onClick={() => {
                // const newRow = getNewRow(inputs.map((input: any) => input));

                const getId = () => {
                  if (activeRow?.teacherCode) {
                    return {teacherCode: activeRow?.teacherCode};
                  } else if (activeRow?.disciplineCode) {
                    return {teacherCode: activeRow?.disciplineCode};
                  } else if (activeRow?.editionCode) {
                    return {teacherCode: activeRow?.editionCode};
                  } else {
                    return {id: activeRow?.id};
                  }
                }

                fetch(`/api/${name}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(getId()),
                }).then((response) => console.log(response.json()))
                setIsModal(false); 
                setActiveRow(null);
                setSendedRequests((value: number) => value + 1)
              }}>{activeRow ? 'Удалить': 'Отменить'}</button>
              <button className={s.buttonAdd}>{isCode ? 'Сохранить изменения' : 'Добавить'}</button>
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
