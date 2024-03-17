import s from './Modal.module.scss';
import { Row } from "../Table/Table";
import close from '../../../public/close.png';
import Image from 'next/image';
import { useState } from 'react';

interface ModalProps {
  activeRow: Row | null;
  data: any;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  titles: string[];
  columns: string[];
  setActiveRow: React.Dispatch<React.SetStateAction<Row | null>>
}

const Modal: React.FC<ModalProps> = ({activeRow, data, setIsModal, titles, columns, setActiveRow}) => {
  const [inputs, setInputs] = useState(titles.map((title, index) => {
    return {
      id: index,
      title: title,
      value: activeRow ? activeRow[columns[index]] : '',
    }
  }))

  const getNewRow = (values: string[]) => {
    const newRow = {};
    if (values) {
      values.map((value, index) => {
        newRow[columns[index]] = value;
      })
    }

    return newRow;
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(getNewRow(inputs.map(input => input.value)));

    const newRow = getNewRow(inputs.map(input => input.value));
    
    if (activeRow?.id) {
      const res = postAdd(newRow); // Тут если добавить новый элемент в таблицу
    } else {
      const res = putSet(newRow) // Тут если изменить имеющийся элемент из таблицы
    }

    setIsModal(false);
    setActiveRow(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(inputs => {
      const newInputs = inputs.map(input => {
        if (input.title === name) {
          return { ...input, value: value };
        }

        return input;
      });

      return newInputs;
    });
  }

  return (
    <>
      <div className={s.overlay} onClick={() => {
        setIsModal(false); 
        setActiveRow(null);
        }}></div>
      <div className={s.modal}>
          <h2 className={s.title}>{data?.name}</h2>
          <form className={s.form} onSubmit={handleSubmit}>
            {inputs?.map((input, index) => (
              <div key={input.id}>
                <label>
                  {input.title}
                </label>
                <input value={input.value} onChange={handleChange} name={input.title} placeholder={input.title} className={s.input} type="text" />
              </div>
            ))}
            
            <div className={s.buttons}>
              <button className={s.buttonDelete} onClick={() => {
                setIsModal(false); 
                setActiveRow(null);
              }}>{activeRow?.id ? 'Удалить': 'Отменить'}</button>
              <button className={s.buttonAdd}>{activeRow?.id ? 'Сохранить изменения' : 'Добавить'}</button>
            </div>
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
